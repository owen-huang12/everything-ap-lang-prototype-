import { useState } from "react";
import DatePickerInput from "./DatePickerInput.jsx";
import editIcon from "../assets/edit.png";

const TYPE_COLORS = {
  book:     { bg: "#e5f3ff", border: "#7abfee", text: "#2a7ab5" },
  event:    { bg: "#d4f5e2", border: "#4caf82", text: "#2a7a52" },
  personal: { bg: "#ede5ff", border: "#9b7be8", text: "#5a3ab5" },
  article:  { bg: "#fff0e0", border: "#e8974a", text: "#b56020" },
};

const TYPE_META_LABELS = {
  book:     ["author", "published"],
  event:    ["key_figures", "date"],
  article:  ["author", "source", "date"],
  personal: [],
};

const DATE_KEYS = new Set(["published", "date"]);

export default function EvidenceDetail({ item, onClose, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [topics, setTopics] = useState(item.topics);
  const [reflection, setReflection] = useState(item.reflection);
  const [metadata, setMetadata] = useState(item.metadata ?? {});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const colors = TYPE_COLORS[item.type] ?? TYPE_COLORS.book;
  const metaKeys = TYPE_META_LABELS[item.type] ?? [];

  const saveAll = async () => {
    if (!title.trim()) { setError("Title is required."); return; }
    setError("");
    setSaving(true);
    const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/evidence/${item.evidence_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ title, topics, reflection, metadata }),
    });
    const updated = await res.json();
    onUpdate(updated);
    setSaving(false);
    setEditing(false);
  };

  const cancelEdit = () => {
    setTitle(item.title);
    setTopics(item.topics);
    setReflection(item.reflection);
    setMetadata(item.metadata ?? {});
    setJournal(item.journal_entry);
    setError("");
    setEditing(false);
  };

  const handleDelete = async () => {
    await fetch(`${import.meta.env.VITE_BACKEND_API}/api/evidence/${item.evidence_id}`, {
      method: "DELETE",
      credentials: "include",
    });
    onDelete(item.evidence_id);
  };

  return (
    <div className="evidence-detail">
      <button className="evidence-detail-close" onClick={onClose}>
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.7917 6.04167L6.04167 10.7917M6.04167 6.04167L10.7917 10.7917M16.3333 8.41667C16.3333 12.7889 12.7889 16.3333 8.41667 16.3333C4.04441 16.3333 0.5 12.7889 0.5 8.41667C0.5 4.04441 4.04441 0.5 8.41667 0.5C12.7889 0.5 16.3333 4.04441 16.3333 8.41667Z" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div className="evidence-detail-header">
        {editing ? (
          <input
            className="evidence-edit-input evidence-edit-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
          />
        ) : (
          <div className="evidence-detail-title">{title}</div>
        )}
        <div
          className="evidence-type-pill"
          style={{ background: colors.bg, border: `0.5px solid ${colors.border}`, color: colors.text }}
        >
          {item.type}
        </div>
      </div>

      <div className="evidence-detail-field">
        <div className="evidence-field-label evidence-field-label--underline">topics:</div>
        {editing ? (
          <input className="evidence-edit-input" value={topics} onChange={(e) => setTopics(e.target.value)} placeholder="topics" />
        ) : (
          <div className="evidence-field-value">{topics}</div>
        )}
      </div>

      <div className="evidence-detail-field">
        <div className="evidence-field-label evidence-field-label--underline">reflection:</div>
        {editing ? (
          <input className="evidence-edit-input" value={reflection} onChange={(e) => setReflection(e.target.value)} placeholder="reflection" />
        ) : (
          <div className="evidence-field-value">{reflection}</div>
        )}
      </div>

      {metaKeys.map((key) => (
        <div key={key} className={`evidence-detail-field ${editing ? "" : "evidence-detail-field--inline"}`}>
          <span className="evidence-field-label evidence-field-label--underline">
            {key.replace("_", " ")}:
          </span>
          {editing ? (
            DATE_KEYS.has(key) ? (
              <DatePickerInput
                label={key.replace("_", " ")}
                value={metadata[key] ?? ""}
                onChange={(v) => setMetadata((m) => ({ ...m, [key]: v }))}
              />
            ) : (
              <input
                className="evidence-edit-input"
                value={metadata[key] ?? ""}
                onChange={(e) => setMetadata((m) => ({ ...m, [key]: e.target.value }))}
                placeholder={key.replace("_", " ")}
              />
            )
          ) : (
            <span className="evidence-field-value">{metadata?.[key] || "—"}</span>
          )}
        </div>
      ))}

      <div className="evidence-detail-field">
        <div className="evidence-field-label evidence-field-label--underline">journal entry:</div>
        <div className="evidence-field-value evidence-journal-read">{item.journal_entry || "—"}</div>
      </div>

      <div className="evidence-detail-actions">
        {error && <span className="evidence-journal-error">{error}</span>}
        {editing ? (
          <>
            <button className="evidence-delete-btn" onClick={cancelEdit}>cancel</button>
            <button className="evidence-save-btn" onClick={saveAll} disabled={saving}>
              {saving ? "saving..." : "save"}
            </button>
          </>
        ) : (
          <>
            <button className="evidence-delete-btn" onClick={handleDelete}>delete</button>
            <button className="evidence-edit-icon-btn" onClick={() => setEditing(true)}>
              <img src={editIcon} alt="edit" className="evidence-edit-icon" />
              edit
            </button>
          </>
        )}
      </div>
    </div>
  );
}
