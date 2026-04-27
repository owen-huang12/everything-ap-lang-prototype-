import { useState } from "react";
import icon from "../assets/icon.png";

export default function SignInPage({ onSignIn, onCreateAccount, onForgotPassword, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      onSignIn(data.user);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-header">
        <img src={icon} className="home-icon" />
        everything ap lang
      </div>
      <p className="home-subtitle">your all in one study tool to ace the AP Lang exam</p>

      <div className="auth-box">
        <input
          className="auth-input"
          type="email"
          placeholder="enter email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
        />
        <input
          className="auth-input"
          type="password"
          placeholder="enter password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
        />
        {error && <p className="auth-error">{error}</p>}
        <button className="auth-btn" onClick={submit} disabled={loading}>
          {loading ? "signing in..." : "sign in"}
        </button>
      </div>

      <div className="auth-box auth-box-secondary">
        <button className="auth-btn" onClick={onCreateAccount}>create account</button>
        <button className="auth-btn" onClick={onForgotPassword}>forgot password</button>
        <button className="auth-btn" onClick={onBack}>back to home</button>
      </div>
    </div>
  );
}
