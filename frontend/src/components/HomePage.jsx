import { useState, useEffect, useRef } from "react";
import { animate, createSpring } from "animejs";
import icon from "../assets/icon.png";

const EXAM = new Date("2026-05-13T08:00:00");

function useCountdown() {
  const calc = () => {
    const diff = EXAM - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
    const total = Math.floor(diff / 1000);
    return {
      days: Math.floor(total / 86400),
      hours: Math.floor((total % 86400) / 3600),
      mins: Math.floor((total % 3600) / 60),
      secs: total % 60,
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const cards = [
  { label: "Essay guides", tab: "essay", info:"guides to score on all of the ap exam: rhetorical analysis essay, argumentative essay, synthesis essay and MCQ guide" },
  { label: "MCQ practice", tab: "mcq", info:"sharpen up on your MCQ solving strategy through real exam pratice"},
  { label: "Evidence tracker", tab: "evidenceTracker", info:"track pieces outside pieces of knowledge in one place" },
  { label: "Current events", tab: "currentEvents", info:"browse all of the current events that was presented on in class"},
];

export default function HomePage({ onSelect, user, onSignIn }) {
  const { days, hours, mins, secs } = useCountdown();
  return (
    <div className="home-page">
      <div className="home-title">
        <img src={icon} className="home-icon" />
        everything ap lang
      </div>
      <p className="home-subtitle">your all in one study tool to ace the AP Lang exam</p>
      <div className="home-grid">
        {cards.map(({ label, tab, info }) => (
          <button
            key={tab}
            className="home-card"
            onClick={() => onSelect(tab)}
            onMouseEnter={(e) =>
              animate(e.currentTarget, {
                scale: 1.03,
                duration: 500,
                ease: "outExpo",
              })
            }
            onMouseLeave={(e) =>
              animate(e.currentTarget, {
                scale: 1,
                duration: 400,
                ease: "outExpo",
              })
            }
          >
            <span className="home-card-label">{label}</span>
            <span className="home-card-info">{info}</span>
          </button>
        ))}
      </div>
      <div className="countdown-wrap">
        <div className="countdown-box">
          {days} days : {hours} hours : {mins} minutes : {secs} seconds
        </div>
        <span className="countdown-label">of study time left</span>
      </div>
      <button className="user-btn home-user" onClick={!user ? onSignIn : undefined}>
        {user ? user.username : "sign in"}
      </button>
    </div>
  );
}
