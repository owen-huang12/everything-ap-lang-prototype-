import { Hono } from "hono";
import { cors } from "hono/cors";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { Resend } from "resend";
import { db } from "./db";
import {
  topic,
  passage,
  questions,
  choice,
  users,
  password_reset_tokens,
  evidence,
} from "./schema";
import { sql, eq, inArray, and, gt } from "drizzle-orm";

const app = new Hono().basePath("/api");
app.use(
  "*",
  cors({
    origin: (origin) => {
      if (!origin) return null;
      const allowed = [
        "http://localhost:5173",
        ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []),
      ];
      if (allowed.includes(origin)) return origin;
      if (/^https:\/\/everything-ap-lang-prototype[^.]*\.vercel\.app$/.test(origin)) return origin;
      return null;
    },
    credentials: true,
  }),
);

if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET environment variable must be set");
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const resend = new Resend(process.env.RESEND_API_KEY!);

const signToken = (userId: number) =>
  new SignJWT({ sub: String(userId) })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(JWT_SECRET);

const setAuthCookie = async (c: any, userId: number) => {
  const token = await signToken(userId);
  setCookie(c, "token", token, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
};

// ── Auth routes ────────────────────────────────────────────────

app.post("/auth/signup", async (c) => {
  const { username, email, password } = await c.req.json();
  if (!username || !email || !password)
    return c.json({ error: "All fields required" }, 400);

  const existing = await db.select().from(users).where(eq(users.email, email));
  if (existing.length) return c.json({ error: "Email already in use" }, 409);

  const password_hash = await bcrypt.hash(password, 12);
  const [user] = await db
    .insert(users)
    .values({ username, email, password_hash })
    .returning({
      user_id: users.user_id,
      username: users.username,
      email: users.email,
    });

  await setAuthCookie(c, user.user_id);
  return c.json({ user });
});

app.post("/auth/signin", async (c) => {
  const { email, password } = await c.req.json();
  if (!email || !password)
    return c.json({ error: "Email and password required" }, 400);

  const [user] = await db.select().from(users).where(eq(users.email, email));
  if (!user) return c.json({ error: "Invalid email or password" }, 401);

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return c.json({ error: "Invalid email or password" }, 401);

  await setAuthCookie(c, user.user_id);
  return c.json({
    user: { user_id: user.user_id, username: user.username, email: user.email },
  });
});

app.get("/auth/me", async (c) => {
  const token = getCookie(c, "token");
  if (!token) return c.json({ user: null });
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const [user] = await db
      .select({
        user_id: users.user_id,
        username: users.username,
        email: users.email,
      })
      .from(users)
      .where(eq(users.user_id, Number(payload.sub)));
    if (!user) return c.json({ user: null });
    await setAuthCookie(c, user.user_id);
    return c.json({ user });
  } catch {
    return c.json({ user: null });
  }
});

app.post("/auth/signout", (c) => {
  deleteCookie(c, "token", { path: "/" });
  return c.json({ ok: true });
});

app.post("/auth/forgot-password", async (c) => {
  const { email } = await c.req.json();
  if (!email) return c.json({ error: "Email required" }, 400);

  const [user] = await db.select().from(users).where(eq(users.email, email));
  if (!user) return c.json({ ok: true });

  const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour
  const [{ token }] = await db
    .insert(password_reset_tokens)
    .values({ user_id: user.user_id, expires_at: expiresAt })
    .returning({ token: password_reset_tokens.token });

  const resetUrl = `http://localhost:5173/?reset=${token}`;
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: user.email,
    subject: "Reset your everything ap lang password",
    html: `<p>Click the link below to reset your password. It expires in 1 hour.</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
  });

  if (error) {
    console.error("Resend error:", error);
    return c.json({ error: "Failed to send email", detail: error }, 500);
  }

  console.log("Email sent:", data);
  return c.json({ ok: true });
});

app.post("/auth/reset-password", async (c) => {
  const { token, password } = await c.req.json();
  if (!token || !password)
    return c.json({ error: "Token and password required" }, 400);

  const [row] = await db
    .select()
    .from(password_reset_tokens)
    .where(
      and(
        eq(password_reset_tokens.token, token),
        eq(password_reset_tokens.used, false),
        gt(password_reset_tokens.expires_at, new Date()),
      ),
    );

  if (!row) return c.json({ error: "Invalid or expired token" }, 400);

  const password_hash = await bcrypt.hash(password, 12);
  await db
    .update(users)
    .set({ password_hash })
    .where(eq(users.user_id, row.user_id));
  await db
    .update(password_reset_tokens)
    .set({ used: true })
    .where(eq(password_reset_tokens.token, token));

  return c.json({ ok: true });
});

// ── Evidence routes ────────────────────────────────────────────

const getAuthUser = async (c: any): Promise<number | null> => {
  const token = getCookie(c, "token");
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return Number(payload.sub);
  } catch {
    return null;
  }
};

app.get("/evidence", async (c) => {
  const userId = await getAuthUser(c);
  if (!userId) return c.json({ error: "Unauthorized" }, 401);
  const rows = await db
    .select()
    .from(evidence)
    .where(eq(evidence.user_id, userId));
  return c.json(rows);
});

app.post("/evidence", async (c) => {
  const userId = await getAuthUser(c);
  if (!userId) return c.json({ error: "Unauthorized" }, 401);
  const body = await c.req.json();
  const { title, type, topics, reflection, journal_entry, metadata } = body;
  if (!title || !type || !topics || !reflection || !journal_entry)
    return c.json({ error: "Missing required fields" }, 400);
  const [row] = await db
    .insert(evidence)
    .values({
      user_id: userId,
      title,
      type,
      topics,
      reflection,
      journal_entry,
      metadata: metadata ?? {},
    })
    .returning();
  return c.json(row);
});

app.patch("/evidence/:id", async (c) => {
  const userId = await getAuthUser(c);
  if (!userId) return c.json({ error: "Unauthorized" }, 401);
  const id = Number(c.req.param("id"));
  const body = await c.req.json();
  const [row] = await db
    .update(evidence)
    .set(body)
    .where(and(eq(evidence.evidence_id, id), eq(evidence.user_id, userId)))
    .returning();
  if (!row) return c.json({ error: "Not found" }, 404);
  return c.json(row);
});

app.delete("/evidence/:id", async (c) => {
  const userId = await getAuthUser(c);
  if (!userId) return c.json({ error: "Unauthorized" }, 401);
  const id = Number(c.req.param("id"));
  await db
    .delete(evidence)
    .where(and(eq(evidence.evidence_id, id), eq(evidence.user_id, userId)));
  return c.json({ ok: true });
});

// ── Existing routes ────────────────────────────────────────────

app.get("/generate-package", async (c) => {
  const rows = await db
    .select()
    .from(passage)
    .orderBy(sql`RANDOM()`)
    .limit(1);
  const randomRow = rows[0];

  const question_array = await db
    .select()
    .from(questions)
    .where(eq(questions.passage_id, randomRow.passage_id));

  const questionIds = question_array.map((q) => q.question_id);
  const choice_array = questionIds.length
    ? await db
        .select()
        .from(choice)
        .where(inArray(choice.question_id, questionIds))
    : [];

  return c.json({
    passage: randomRow,
    questions: question_array,
    choices: choice_array,
  });
});

export default app;
