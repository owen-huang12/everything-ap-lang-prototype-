import { useState } from "react";
import icon from "../assets/icon.png";

export default function ResetPasswordPage({ token, onDone }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError("");
    if (password !== confirm) { setError("Passwords don't match"); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters"); return; }
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      setDone(true);
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
      <p className="home-subtitle">choose a new password</p>

      <div className="auth-box">
        {done ? (
          <p className="auth-sent">password updated — you can sign in now</p>
        ) : (
          <>
            <input
              className="auth-input"
              type="password"
              placeholder="new password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="auth-input"
              type="password"
              placeholder="confirm password..."
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
            />
            {error && <p className="auth-error">{error}</p>}
            <button className="auth-btn" onClick={submit} disabled={loading}>
              {loading ? "updating..." : "update password"}
            </button>
          </>
        )}
      </div>

      {done && (
        <div className="auth-box auth-box-secondary">
          <button className="auth-btn" onClick={onDone}>sign in</button>
        </div>
      )}
    </div>
  );
}
