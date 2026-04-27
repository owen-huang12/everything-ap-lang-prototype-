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

export default function EvidenceCard({ item, onClick }) {
  const colors = TYPE_COLORS[item.type] ?? TYPE_COLORS.book;
  const metaKeys = TYPE_META_LABELS[item.type] ?? [];

  return (
    <button className="evidence-card" onClick={onClick}>
      <div className="evidence-card-title">{item.title}</div>
      <div
        className="evidence-type-pill"
        style={{ background: colors.bg, border: `0.5px solid ${colors.border}`, color: colors.text }}
      >
        {item.type}
      </div>
      <div className="evidence-card-field">
        <span className="evidence-field-label">topics:</span>
        <span className="evidence-field-value">{item.topics}</span>
      </div>
      <div className="evidence-card-field">
        <span className="evidence-field-label">reflection:</span>
        <span className="evidence-field-value">{item.reflection}</span>
      </div>
      {metaKeys.map((key) =>
        item.metadata?.[key] ? (
          <div key={key} className="evidence-card-field evidence-card-field--inline">
            <span className="evidence-field-label">{key.replace("_", " ")}:</span>
            <span className="evidence-field-value">{item.metadata[key]}</span>
          </div>
        ) : null
      )}
    </button>
  );
}
