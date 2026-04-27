import {
  pgTable,
  serial,
  integer,
  varchar,
  text,
  boolean,
  timestamp,
  uuid,
  jsonb,
} from "drizzle-orm/pg-core";

export const topic = pgTable("topic", {
  topic_id: serial("topic_id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const passage = pgTable("passage", {
  passage_id: serial("passage_id").primaryKey(),
  topic_id: integer("topic_id")
    .notNull()
    .references(() => topic.topic_id),
  title: varchar("title", { length: 255 }).notNull(),
  body: text("body").notNull(),
  source: varchar("source", { length: 255 }),
});

export const questions = pgTable("question", {
  question_id: serial("question_id").primaryKey(),
  topic_id: integer("topic_id")
    .notNull()
    .references(() => topic.topic_id),
  passage_id: integer("passage_id").references(() => passage.passage_id),
  prompt: text("prompt").notNull(),
  order_in_set: integer("order_in_set"),
  difficulty: varchar("difficulty", { length: 50 }),
});

export const choice = pgTable("choice", {
  choice_id: serial("choice_id").primaryKey(),
  question_id: integer("question_id")
    .notNull()
    .references(() => questions.question_id),
  text: text("text").notNull(),
  is_correct: boolean("is_correct").notNull().default(false),
});

export const users = pgTable("user", {
  user_id: serial("user_id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password_hash: varchar("password_hash", { length: 255 }).notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const user_attempts = pgTable("user_attempt", {
  attempt_id: serial("attempt_id").primaryKey(),
  user_id: integer("user_id")
    .notNull()
    .references(() => users.user_id),
  question_id: integer("question_id")
    .notNull()
    .references(() => questions.question_id),
  chosen_choice_id: integer("chosen_choice_id").references(
    () => choice.choice_id,
  ),
  correct: boolean("correct").notNull(),
  attempted_at: timestamp("attempted_at").notNull().defaultNow(),
});

export const user_stat = pgTable("user_stat", {
  user_id: integer("user_id")
    .notNull()
    .references(() => users.user_id),
  topic_id: integer("topic_id")
    .notNull()
    .references(() => topic.topic_id),
  total_attempts: integer("total_attempts").notNull().default(0),
  total_correct: integer("total_correct").notNull().default(0),
});

export const evidence = pgTable("evidence", {
  evidence_id: serial("evidence_id").primaryKey(),
  user_id: integer("user_id")
    .notNull()
    .references(() => users.user_id),
  title: varchar("title", { length: 255 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  topics: text("topics").notNull(),
  reflection: text("reflection").notNull(),
  journal_entry: text("journal_entry").notNull(),
  metadata: jsonb("metadata").$type<Record<string, string>>().default({}),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const password_reset_tokens = pgTable("password_reset_token", {
  token: uuid("token").primaryKey().defaultRandom(),
  user_id: integer("user_id")
    .notNull()
    .references(() => users.user_id),
  expires_at: timestamp("expires_at").notNull(),
  used: boolean("used").notNull().default(false),
});
