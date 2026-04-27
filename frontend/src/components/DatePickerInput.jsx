import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";

function parseDate(str) {
  if (!str || !str.trim()) return null;
  const [m, d, y] = str.split("/").map(Number);
  if (!m || !d || !y || y < 100) return "invalid";
  const date = new Date(y, m - 1, d);
  if (
    isNaN(date) ||
    date.getMonth() !== m - 1 ||
    date.getDate() !== d ||
    date.getFullYear() !== y
  ) return "invalid";
  return date;
}

function formatDisplay(date) {
  if (!date || date === "invalid") return "";
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const y = date.getFullYear();
  return `${m}/${d}/${y}`;
}

export default function DatePickerInput({ label, value, onChange }) {
  const [text, setText] = useState(value || "");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [month, setMonth] = useState(new Date());
  const containerRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleTextChange = (e) => {
    const raw = e.target.value;
    setText(raw);
    if (!raw.trim()) { setError(""); onChange(""); return; }
    const parsed = parseDate(raw);
    if (parsed === "invalid") {
      setError("invalid date");
      onChange("");
    } else {
      setError("");
      onChange(formatDisplay(parsed));
      setMonth(parsed); // navigate calendar to typed date
    }
  };

  const handleDaySelect = (day) => {
    if (!day) return;
    const formatted = formatDisplay(day);
    setText(formatted);
    onChange(formatted);
    setError("");
    setOpen(false);
  };

  const selected = parseDate(text);
  const validSelected = selected && selected !== "invalid" ? selected : undefined;

  return (
    <div className="datepicker-wrap" ref={containerRef}>
      <input
        className={`add-evidence-input ${error ? "add-evidence-input--error" : ""}`}
        placeholder={`${label} (mm/dd/yyyy)`}
        value={text}
        onChange={handleTextChange}
        onFocus={() => setOpen(true)}
      />
      {error && <span className="datepicker-error">{error}</span>}
      {open && (
        <div className="datepicker-popover">
          <DayPicker
            mode="single"
            selected={validSelected}
            onSelect={handleDaySelect}
            month={month}
            onMonthChange={setMonth}
            captionLayout="dropdown"
            startMonth={new Date(1900, 0)}
            endMonth={new Date(2030, 11)}
          />
        </div>
      )}
    </div>
  );
}
