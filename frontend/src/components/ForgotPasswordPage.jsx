import { useState } from "react";
import icon from "../assets/icon.png";

export default function ForgotPasswordPage({ onBack }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    await fetch(`${import.meta.env.VITE_BACKEND_API}/api/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-header">
        <img src={icon} className="home-icon" />
        everything ap lang
      </div>
      <p className="home-subtitle">reset your password</p>

      <div className="auth-box">
        {sent ? (
          <p className="auth-sent">if that email exists, a reset link is on its way</p>
        ) : (
          <>
            <input
              className="auth-input"
              type="email"
              placeholder="enter email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
            />
            <button className="auth-btn" onClick={submit} disabled={loading}>
              {loading ? "sending..." : "send reset link"}
            </button>
          </>
        )}
      </div>

      <div className="auth-box auth-box-secondary">
        <button className="auth-btn" onClick={onBack}>back to sign in</button>
      </div>
    </div>
  );
}
