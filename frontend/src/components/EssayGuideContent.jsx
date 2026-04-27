export default function EssayGuideContent({ guide, onBack }) {
  return (
    <div className="essay-content-page">
      <div className="essay-content-header">
        <button className="essay-back-btn" onClick={onBack}>← back</button>
        <span className="essay-content-title">{guide.label}</span>
      </div>
      <div className="essay-content-body">
        <p className="essay-content-placeholder">
          content coming soon — Mrs. Cohen's guide for {guide.label} will appear here.
        </p>
      </div>
    </div>
  );
}
