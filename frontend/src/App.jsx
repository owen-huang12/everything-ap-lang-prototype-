import icon from "./assets/icon.png";
import houseIcon from "./assets/house.png";
import "./App.css";
import { useState, useEffect, useRef } from "react";
import { animate } from "animejs";
import MCQPractice from "./components/MCQPractice.jsx";
import HomePage from "./components/HomePage.jsx";
import EvidenceTracker from "./components/EvidenceTracker.jsx";
import EssayGuide from "./components/EssayGuide.jsx";
import SignInPage from "./components/SignInPage.jsx";
import CreateAccountPage from "./components/CreateAccountPage.jsx";
import ForgotPasswordPage from "./components/ForgotPasswordPage.jsx";
import ResetPasswordPage from "./components/ResetPasswordPage.jsx";

function App() {
  const [tab, setTab] = useState("home");
  const [user, setUser] = useState(null);
  const [sidebarWidth, setSidebarWidth] = useState(180);

  const draggingRef = useRef(false);
  const sidebarRef = useRef(null);
  const handleRef = useRef(null);
  const widthRef = useRef(180);
  const startWidthRef = useRef(180);

  const MIN_WIDTH = 150;
  const MAX_WIDTH = 180;
  const COLLAPSED = 8;

  const [resetToken, setResetToken] = useState(
    () => new URLSearchParams(window.location.search).get("reset")
  );

  // Rehydrate session and handle reset token on mount
  useEffect(() => {
    fetch("http://localhost:3000/api/auth/me", { credentials: "include" })
      .then((r) => r.json())
      .then(({ user }) => { if (user) setUser(user); });

    const token = new URLSearchParams(window.location.search).get("reset");
    if (token) {
      setResetToken(token);
      window.history.replaceState({}, "", "/");
      setTab("resetPassword");
    }
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      if (!draggingRef.current) return;
      const w = Math.max(COLLAPSED, Math.min(MAX_WIDTH, e.clientX));
      widthRef.current = w;
      if (sidebarRef.current) sidebarRef.current.style.width = `${w}px`;
      if (handleRef.current) handleRef.current.style.left = `${w}px`;
    };

    const onUp = () => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      const rawW = widthRef.current;
      const startedCollapsed = startWidthRef.current === COLLAPSED;
      const target = startedCollapsed
        ? rawW > COLLAPSED + 30 ? MAX_WIDTH : COLLAPSED
        : rawW < MIN_WIDTH ? COLLAPSED : rawW;
      animate(sidebarRef.current, { width: `${target}px`, duration: 300, ease: "outExpo" });
      animate(handleRef.current, {
        left: `${target}px`,
        duration: 300,
        ease: "outExpo",
        onComplete: () => setSidebarWidth(target),
      });
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, []);

  const collapse = () => {
    animate(sidebarRef.current, { width: `${COLLAPSED}px`, duration: 300, ease: "outExpo" });
    animate(handleRef.current, {
      left: `${COLLAPSED}px`,
      duration: 300,
      ease: "outExpo",
      onComplete: () => setSidebarWidth(COLLAPSED),
    });
  };

  const signOut = async () => {
    await fetch("http://localhost:3000/api/auth/signout", { method: "POST", credentials: "include" });
    setUser(null);
  };

  const handleSignIn = (u) => { setUser(u); setTab("home"); };

  // Full-screen auth pages (no layout/sidebar)
  if (tab === "home") return <HomePage onSelect={setTab} user={user} onSignIn={() => setTab("signin")} />;
  if (tab === "signin") return <SignInPage onSignIn={handleSignIn} onCreateAccount={() => setTab("createAccount")} onForgotPassword={() => setTab("forgotPassword")} onBack={() => setTab("home")} />;
  if (tab === "createAccount") return <CreateAccountPage onSignIn={handleSignIn} onBack={() => setTab("signin")} />;
  if (tab === "forgotPassword") return <ForgotPasswordPage onBack={() => setTab("signin")} />;
  if (tab === "resetPassword") return <ResetPasswordPage token={resetToken} onDone={() => setTab("signin")} />;

  return (
    <div className="layout">
      <header className="header">
        <img src={icon} style={{ width: "auto", height: "30px" }} />
        <h1>everything ap lang</h1>
        <button className="home-text-btn" onClick={() => setTab("home")}>home</button>
        {user ? (
          <button className="user-btn" onClick={signOut}>{user.username}</button>
        ) : (
          <button className="user-btn" onClick={() => setTab("signin")}>sign in</button>
        )}
      </header>
      <div className="body">
        <nav className="sidebar" ref={sidebarRef} style={{ width: `${sidebarWidth}px` }}>
          <button className={tab === "mcq" ? "toggled" : ""} onClick={() => setTab("mcq")}>MCQ practice</button>
          <button className={tab === "essay" ? "toggled" : ""} onClick={() => setTab("essay")}>Essay guide</button>
          <button className={tab === "evidenceTracker" ? "toggled" : ""} onClick={() => setTab("evidenceTracker")}>Evidence Tracker</button>
          <button className={tab === "currentEvents" ? "toggled" : ""} onClick={() => setTab("currentEvents")}>Current events</button>
          <button className="collapse-btn" onClick={collapse} aria-label="Collapse sidebar">«</button>
        </nav>
        <div
          ref={handleRef}
          className="divider-handle"
          style={{ left: `${Math.max(COLLAPSED, sidebarWidth)}px` }}
          onMouseDown={(e) => {
            e.preventDefault();
            draggingRef.current = true;
            startWidthRef.current = sidebarWidth;
            widthRef.current = sidebarWidth;
          }}
        />
        <main className="content">
          {tab === "mcq" && <MCQPractice />}
          {tab === "essay" && <EssayGuide user={user} />}
          {tab === "evidenceTracker" && <EvidenceTracker user={user} />}
          {tab === "currentEvents" && <CurrentEvents />}
        </main>
      </div>
    </div>
  );
}



function CurrentEvents() {
  return <div className="center-screen"><p>Current events</p></div>;
}

export default App;
