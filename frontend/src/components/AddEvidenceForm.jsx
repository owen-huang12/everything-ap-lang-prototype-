import { useState } from "react";
import DatePickerInput from "./DatePickerInput.jsx";

const DATE_KEYS = new Set(["published", "date"]);

const META_FIELDS = {
  book:     [{ key: "author", label: "author" }, { key: "published", label: "published" }],
  event:    [{ key: "key_figures", label: "key figures" }, { key: "date", label: "date" }],
  article:  [{ key: "author", label: "author" }, { key: "source", label: "source" }, { key: "date", label: "date" }],
  personal: [],
};

const wordCount = (str) => str.trim().split(/\s+/).filter(Boolean).length;

export default function AddEvidenceForm({ onSave, onCancel }) {
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [topics, setTopics] = useState("");
  const [reflection, setReflection] = useState("");
  const [journal, setJournal] = useState("");
  const [meta, setMeta] = useState({});
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const metaFields = META_FIELDS[type] ?? [];
  const words = wordCount(journal);

  const submit = async () => {
    setError("");
    if (!type || !title || !topics || !reflection || !journal)
      return setError("All fields are required.");
    if (words < 35) return setError("Journal entry must be at least 35 words.");
    if (words > 400) return setError("Journal entry must be at most 400 words.");

    setSaving(true);
    const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/evidence`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ title, type, topics, reflection, journal_entry: journal, metadata: meta }),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error); setSaving(false); return; }
    onSave(data);
  };

  return (
    <div className="add-evidence-form">
      <div className="add-evidence-type-row">
        {["book", "event", "article", "personal"].map((t) => (
          <button
            key={t}
            className={`add-evidence-type-btn ${type === t ? "add-evidence-type-btn--active" : ""}`}
            onClick={() => { setType(t); setMeta({}); }}
          >
            {t}
          </button>
        ))}
      </div>

      {type && (
        <>
          <input className="add-evidence-input" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input className="add-evidence-input" placeholder="topics" value={topics} onChange={(e) => setTopics(e.target.value)} />
          <input className="add-evidence-input" placeholder="reflection" value={reflection} onChange={(e) => setReflection(e.target.value)} />
          {metaFields.map(({ key, label }) =>
            DATE_KEYS.has(key) ? (
              <DatePickerInput
                key={key}
                label={label}
                value={meta[key] ?? ""}
                onChange={(v) => setMeta((m) => ({ ...m, [key]: v }))}
              />
            ) : (
              <input
                key={key}
                className="add-evidence-input"
                placeholder={label}
                value={meta[key] ?? ""}
                onChange={(e) => setMeta((m) => ({ ...m, [key]: e.target.value }))}
              />
            )
          )}
          <textarea
            className="add-evidence-textarea"
            placeholder="journal entry (35–400 words)..."
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
          />
          <div className="add-evidence-wordcount">
            <span className={words < 35 || words > 400 ? "evidence-wordcount--warn" : "evidence-wordcount--ok"}>
              {words} / 35–400 words
            </span>
          </div>
        </>
      )}

      {error && <p className="add-evidence-error">{error}</p>}

      <div className="add-evidence-actions">
        <button className="add-evidence-cancel" onClick={onCancel}>cancel</button>
        {type && (
          <button className="add-evidence-submit" onClick={submit} disabled={saving}>
            {saving ? "saving..." : "add evidence"}
          </button>
        )}
      </div>
    </div>
  );
}
