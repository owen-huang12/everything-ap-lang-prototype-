const GUIDES = [
  {
    id: "mcq",
    label: "mcq guide",
    teaser: "Master the multiple choice section with proven strategies for close reading and eliminating wrong answers under time pressure.",
    bg: "#fffce5",
  },
  {
    id: "synthesis",
    label: "synthesis essay",
    teaser: "Learn how to weave multiple sources into a coherent argument that goes beyond summarizing — and earns top marks.",
    bg: "#e5f5e5",
  },
  {
    id: "rhetorical",
    label: "rhetorical analysis essay",
    teaser: "Break down how an author builds their argument using rhetorical choices, and write about it with precision and confidence.",
    bg: "#ede5ff",
  },
  {
    id: "argumentative",
    label: "argumentative essay",
    teaser: "Construct a compelling, well-evidenced argument of your own and defend it effectively within the exam time limit.",
    bg: "#e5eaf5",
  },
];

const VIDEOS = [
  { label: "rhetorical analysis", url: "https://www.youtube.com/watch?v=bUyzJ7RTzig" },
  { label: "synthesis", url: "https://www.youtube.com/watch?v=YHhKiWfWdHY" },
  { label: "argument", url: "https://www.youtube.com/watch?v=Kant_3jwhf8" },
];

function GuideCard({ guide, onClick }) {
  return (
    <button
      className="essay-guide-card"
      style={{ background: guide.bg }}
      onClick={() => onClick(guide)}
    >
      <span className="essay-guide-label">{guide.label}</span>
      <span className="essay-guide-teaser">{guide.teaser}</span>
    </button>
  );
}

function TimingGuide() {
  return (
    <div className="timing-guide-wrap">
      <div className="timing-guide-header">Timing guide</div>
      <div className="timing-sections">
        <div className="timing-section">
          <div className="timing-section-label">
            <span>section I</span>
            <span className="timing-section-time">1 hr</span>
          </div>
          <div className="timing-essay-strips">
            <div className="timing-essay-strip" style={{ background: "#fffce5" }}>
              <span>mcq</span>
              <span className="timing-strip-detail">multiple choice questions</span>
              <span className="timing-row-total">1 hr</span>
            </div>
          </div>
        </div>
        <div className="timing-section">
          <div className="timing-section-label">
            <span>section II</span>
            <span className="timing-section-time">2 hr 15 min</span>
          </div>
          <div className="timing-essay-strips">
            <div className="timing-essay-strip" style={{ background: "#e5f5e5" }}>
              <span>synthesis</span>
              <span className="timing-strip-detail">15 min prep · 25 min write</span>
              <span className="timing-row-total">~40 min</span>
            </div>
            <div className="timing-essay-strip" style={{ background: "#ede5ff" }}>
              <span>rhetorical analysis</span>
              <span className="timing-strip-detail">10 min read · 25 min write</span>
              <span className="timing-row-total">~35 min</span>
            </div>
            <div className="timing-essay-strip" style={{ background: "#e5eaf5" }}>
              <span>argument</span>
              <span className="timing-strip-detail">5 min outline · 30 min write</span>
              <span className="timing-row-total">~35 min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VideoLinks() {
  return (
    <div className="video-links-wrap">
      <div className="video-links-header">Mrs. Peer Editor videos</div>
      <div className="video-links-list">
        {VIDEOS.map((v, i) => (
          <a key={i} className="video-link" href={v.url} target="_blank" rel="noopener noreferrer">
            {v.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function EssayGuideHome({ onSelect }) {
  return (
    <div className="essay-guide-page">
      <div className="essay-guide-header">
        AP exam guides handwritten by Mrs. Cohen ...
      </div>
      <div className="essay-guide-grid-wrap">
        {GUIDES.map((g) => (
          <GuideCard key={g.id} guide={g} onClick={onSelect} />
        ))}
      </div>
      <TimingGuide />
      <VideoLinks />
    </div>
  );
}
