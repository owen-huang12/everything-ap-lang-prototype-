import { useRef } from "react";
import { animate } from "animejs";

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

const COLLAPSED = 64;
const EXPANDED = 140;

function GuideCard({ guide, onClick }) {
  const cardRef = useRef(null);
  const descRef = useRef(null);
  const cardAnim = useRef(null);
  const descAnim = useRef(null);

  const cancelAll = () => {
    if (cardAnim.current) { cardAnim.current.cancel(); cardAnim.current = null; }
    if (descAnim.current) { descAnim.current.cancel(); descAnim.current = null; }
  };

  const expand = () => {
    cancelAll();
    descRef.current.style.opacity = 0;
    cardAnim.current = animate(cardRef.current, { height: `${EXPANDED}px`, duration: 400, ease: "outExpo" });
    descAnim.current = animate(descRef.current, { opacity: 1, duration: 250, ease: "outExpo", delay: 120 });
  };

  const collapse = () => {
    cancelAll();
    descRef.current.style.opacity = 0;
    cardAnim.current = animate(cardRef.current, { height: `${COLLAPSED}px`, duration: 350, ease: "outExpo" });
  };

  return (
    <button
      ref={cardRef}
      className="essay-guide-card"
      style={{ background: guide.bg, height: `${COLLAPSED}px` }}
      onMouseEnter={expand}
      onMouseLeave={collapse}
      onClick={() => onClick(guide)}
    >
      <span className="essay-guide-label">{guide.label}</span>
      <span ref={descRef} className="essay-guide-teaser">{guide.teaser}</span>
    </button>
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
    </div>
  );
}
