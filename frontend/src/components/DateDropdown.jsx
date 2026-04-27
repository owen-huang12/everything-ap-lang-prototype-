const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i);

export default function DateDropdown({ value, onChange }) {
  const parts = value ? value.split("|") : ["", "", ""];
  const [month, day, year] = parts;

  const update = (m, d, y) => onChange([m, d, y].join("|"));

  return (
    <div className="date-dropdown">
      <select
        className="date-select"
        value={month}
        onChange={(e) => update(e.target.value, day, year)}
      >
        <option value="">month</option>
        {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
      </select>
      <select
        className="date-select"
        value={day}
        onChange={(e) => update(month, e.target.value, year)}
      >
        <option value="">day</option>
        {days.map((d) => <option key={d} value={d}>{d}</option>)}
      </select>
      <select
        className="date-select"
        value={year}
        onChange={(e) => update(month, day, e.target.value)}
      >
        <option value="">year</option>
        {years.map((y) => <option key={y} value={y}>{y}</option>)}
      </select>
    </div>
  );
}

export function formatDate(value) {
  if (!value) return "";
  const [month, day, year] = value.split("|");
  if (!month && !day && !year) return "";
  return [month, day, year].filter(Boolean).join(" ");
}
