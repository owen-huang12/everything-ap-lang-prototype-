import { useState, useEffect, useRef } from "react";
import { GUIDE_CONTENT } from "../content/guideContent.js";

const CHAR_MS = 12;

// Render a paragraph with **bold** markers.
// During streaming: strip markers, show plain text.
// After streaming: parse and render <strong> tags.
function Para({ text, isLast, streaming }) {
  if (streaming) {
    return (
      <p className="essay-page-text">
        {text.replace(/\*\*/g, "")}
        {isLast && <span className="essay-cursor" />}
      </p>
    );
  }
  const parts = text.split("**");
  return (
    <p className="essay-page-text">
      {parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
      )}
    </p>
  );
}

// Rubric table matching the reference screenshot
function RubricTable({ rows }) {
  return (
    <div className="guide-rubric-table-wrap">
      <table className="guide-rubric-table">
        <thead>
          <tr>
            <th>Row</th>
            <th>Points</th>
            <th>What it's asking for</th>
            <th>What earns it</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <td><strong>{row.row}</strong></td>
              <td>{row.points}</td>
              <td>{row.asks}</td>
              <td>{row.earns}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── main component ────────────────────────────────────────────────────────────

export default function EssayGuideContent({ guide, onBack }) {
  const pages = GUIDE_CONTENT[guide.id] ?? [];
  const [pageIdx, setPageIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [streaming, setStreaming] = useState(false);
  const intervalRef = useRef(null);

  const page = pages[pageIdx];
  const isFirst = pageIdx === 0;
  const isLast  = pageIdx === pages.length - 1;
  const isRubric = page?.type === "rubric";

  const clearStream = () => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
  };

  const revealAll = () => {
    clearStream();
    setDisplayed(page?.text ?? "");
    setStreaming(false);
  };

  useEffect(() => {
    if (isRubric || !page?.text) {
      setDisplayed("");
      setStreaming(false);
      return;
    }
    clearStream();
    setDisplayed("");
    setStreaming(true);
    let i = 0;
    const full = page.text;
    intervalRef.current = setInterval(() => {
      i++;
      setDisplayed(full.slice(0, i));
      if (i >= full.length) { clearStream(); setStreaming(false); }
    }, CHAR_MS);
    return clearStream;
  }, [pageIdx]);

  const goBack = () => { clearStream(); if (isFirst) onBack(); else setPageIdx((p) => p - 1); };
  const goNext = () => {
    if (streaming) { revealAll(); return; }
    clearStream();
    if (isLast) onBack(); else setPageIdx((p) => p + 1);
  };

  if (!pages.length) {
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

  const paragraphs = displayed.split("\n\n").filter(Boolean);

  return (
    <div className="essay-content-page">
      <div className="essay-content-header">
        <button className="essay-back-btn" onClick={onBack}>← back</button>
        <span className="essay-content-title">{guide.label}</span>
        <span className="essay-page-progress">{pageIdx + 1} / {pages.length}</span>
      </div>

      <div className="essay-content-body">
        <div
          className="essay-page-card"
          onClick={streaming ? revealAll : undefined}
          style={{ cursor: streaming ? "pointer" : "default" }}
        >
          {page.heading && <div className="essay-page-heading">{page.heading}</div>}

          {isRubric ? (
            <RubricTable rows={page.rows} />
          ) : (
            <div className="essay-page-paragraphs">
              {paragraphs.map((para, i) => (
                <Para
                  key={i}
                  text={para}
                  isLast={i === paragraphs.length - 1}
                  streaming={streaming}
                />
              ))}
              {streaming && paragraphs.length === 0 && (
                <p className="essay-page-text"><span className="essay-cursor" /></p>
              )}
            </div>
          )}

          <div className="essay-page-nav" onClick={(e) => e.stopPropagation()}>
            <button className="essay-nav-btn" onClick={goBack}>go back</button>
            <button className="essay-nav-btn essay-nav-btn--primary" onClick={goNext}>
              {streaming ? "skip" : isLast ? "finish" : "got it"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
