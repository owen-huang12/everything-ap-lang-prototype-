import { useState, useRef } from "react";
import { animate } from "animejs";

const CATEGORIES = [
  {
    id: "figurative",
    label: "figurative",
    color: { bg: "#daeeff", border: "#7abfee", text: "#1a6fa8" },
    terms: [
      { name: "Metaphor", definition: "A direct comparison between two unlike things without using 'like' or 'as'.", example: "\"Life is a journey — you choose your path.\"" },
      { name: "Simile", definition: "A comparison using 'like' or 'as' to highlight a shared quality.", example: "\"She was as brave as a lion charging into battle.\"" },
      { name: "Personification", definition: "Giving human qualities, feelings, or actions to non-human things.", example: "\"The wind whispered secrets through the trees.\"" },
      { name: "Hyperbole", definition: "Deliberate exaggeration for emphasis or comic effect.", example: "\"I've told you a million times to clean your room.\"" },
      { name: "Understatement", definition: "Deliberately making something seem less significant than it is.", example: "\"The Titanic had a bit of a rough night.\"" },
      { name: "Allusion", definition: "A reference to a well-known person, place, event, or literary work.", example: "\"He has the Midas touch with every business he starts.\"" },
      { name: "Oxymoron", definition: "A figure of speech combining two seemingly contradictory terms.", example: "\"The silence was deafening in the empty stadium.\"" },
      { name: "Paradox", definition: "A statement that seems self-contradictory but reveals a deeper truth.", example: "\"The more you know, the more you realize you know nothing.\"" },
    ],
  },
  {
    id: "syntax",
    label: "syntax",
    color: { bg: "#fef9e7", border: "#c8a84b", text: "#7d6608" },
    terms: [
      { name: "Anaphora", definition: "Repetition of a word or phrase at the beginning of successive clauses.", example: "\"We shall fight on the beaches, we shall fight on the landing grounds, we shall fight in the fields.\"" },
      { name: "Parallelism", definition: "Using the same grammatical structure in a series of phrases or clauses.", example: "\"She likes hiking, swimming, and running marathons.\"" },
      { name: "Epistrophe", definition: "Repetition of a word or phrase at the end of successive clauses.", example: "\"Government of the people, by the people, for the people.\"" },
      { name: "Cumulative sentence", definition: "A sentence that adds modifying phrases after the main independent clause.", example: "\"He ran, arms flailing, heart pounding, screaming into the night.\"" },
      { name: "Antithesis", definition: "Contrasting ideas placed in parallel grammatical structure.", example: "\"That's one small step for man, one giant leap for mankind.\"" },
      { name: "Periodic sentence", definition: "A sentence where the main clause is withheld until the very end.", example: "\"Despite the rain, the cold, and the exhaustion, she finished the race.\"" },
      { name: "Diction", definition: "The author's deliberate choice of words and their connotations.", example: "The author chose 'crept' instead of 'walked' to suggest stealth and unease." },
      { name: "Chiasmus", definition: "Reversing grammatical structures in successive phrases (ABBA pattern).", example: "\"Ask not what your country can do for you — ask what you can do for your country.\"" },
    ],
  },
  {
    id: "appeals",
    label: "appeals",
    color: { bg: "#f0ebff", border: "#a78bda", text: "#5b21b6" },
    terms: [
      { name: "Ethos", definition: "An appeal to the credibility or character of the speaker.", example: "\"As a doctor with 20 years of experience, I recommend this treatment.\"" },
      { name: "Pathos", definition: "An appeal to the audience's emotions.", example: "\"Every night, thousands of children go to bed hungry — you can change that.\"" },
      { name: "Logos", definition: "An appeal to logic, reason, and evidence.", example: "\"Studies show that students who sleep 8 hours score 20% higher on exams.\"" },
      { name: "Rhetorical question", definition: "A question asked for effect rather than to receive an answer.", example: "\"If not us, who? If not now, when?\"" },
      { name: "Concession & refutation", definition: "Acknowledging the opposing view, then countering it with evidence.", example: "\"While some argue social media connects us, it ultimately fosters isolation.\"" },
      { name: "Analogy", definition: "A comparison that explains a complex idea using a familiar one.", example: "\"Learning grammar is like learning chess rules — tedious at first, but essential to play well.\"" },
      { name: "Anecdote", definition: "A brief personal story used to illustrate a larger point.", example: "\"When I was seven, I got lost in a store — that fear of losing something never left me.\"" },
    ],
  },
  {
    id: "tone",
    label: "tone & diction",
    color: { bg: "#e8f8ee", border: "#5cc68e", text: "#1a7a4a" },
    terms: [
      { name: "Irony", definition: "A contrast between what is said and what is actually meant or expected.", example: "A fire station burning down is a perfect example of situational irony." },
      { name: "Satire", definition: "Using humor, irony, or exaggeration to critique human behavior or society.", example: "Swift's 'A Modest Proposal' suggests eating babies to mock British indifference to Irish poverty." },
      { name: "Juxtaposition", definition: "Placing contrasting elements side by side to highlight their differences.", example: "\"The lavish ballroom stood next door to a crumbling homeless shelter.\"" },
      { name: "Imagery", definition: "Vivid descriptive language that appeals to one or more of the senses.", example: "\"The stench of burnt sugar hung thick in the humid summer air.\"" },
      { name: "Tone shift", definition: "A change in the author's attitude or emotional register within a text.", example: "A poem begins with joyful childhood memories, then pivots sharply to grief as the speaker ages." },
      { name: "Colloquialism", definition: "Informal language or expressions that create a conversational tone.", example: "The author writes 'gonna' and 'y'all' to make the narrator sound relatable and Southern." },
      { name: "Euphemism", definition: "A mild or indirect word substituted for a harsher or blunter one.", example: "The company said workers were 'let go' rather than fired." },
    ],
  },
];

const ALL_TERMS = CATEGORIES.flatMap((cat) =>
  cat.terms.map((t) => ({ ...t, category: cat.label, color: cat.color }))
);

const COLLAPSED = 40;

function TermChip({ term, color, category, onSelect }) {
  const chipRef = useRef(null);
  const defRef = useRef(null);
  const chipAnim = useRef(null);
  const defAnim = useRef(null);

  const cancel = () => {
    if (chipAnim.current) { chipAnim.current.cancel(); chipAnim.current = null; }
    if (defAnim.current) { defAnim.current.cancel(); defAnim.current = null; }
  };

  const expand = () => {
    cancel();
    defRef.current.style.opacity = 0;
    const expandedH = 36 + defRef.current.scrollHeight + 10;
    chipAnim.current = animate(chipRef.current, { height: `${expandedH}px`, duration: 400, ease: "outExpo" });
    defAnim.current = animate(defRef.current, { opacity: 1, duration: 250, ease: "outExpo", delay: 120 });
  };

  const collapse = () => {
    cancel();
    defRef.current.style.opacity = 0;
    chipAnim.current = animate(chipRef.current, { height: `${COLLAPSED}px`, duration: 350, ease: "outExpo" });
  };

  return (
    <div
      ref={chipRef}
      className="term-chip"
      style={{ height: `${COLLAPSED}px`, background: color.bg, border: `0.5px solid black` }}
      onMouseEnter={expand}
      onMouseLeave={collapse}
      onClick={() => onSelect({ ...term, color, category })}
    >
      <span className="term-chip-name">{term.name}</span>
      <span ref={defRef} className="term-chip-def">{term.definition}</span>
    </div>
  );
}

function TermDetail({ term, onClose }) {
  return (
    <div className="term-detail-overlay" onClick={onClose}>
      <div className="term-detail-card" onClick={(e) => e.stopPropagation()}>
        <button className="term-detail-close" onClick={onClose}>×</button>
        <span className="term-detail-name">{term.name}</span>
        <span
          className="term-detail-pill"
          style={{ background: term.color.bg, border: `0.5px solid ${term.color.border}`, color: term.color.text }}
        >
          {term.category}
        </span>
        <div className="term-detail-section">
          <span className="term-detail-label">definition</span>
          <p className="term-detail-text">{term.definition}</p>
        </div>
        <div className="term-detail-section">
          <span className="term-detail-label">example</span>
          <p className="term-detail-text term-detail-example">{term.example}</p>
        </div>
      </div>
    </div>
  );
}

function Flashcards() {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const innerRef = useRef(null);

  const term = ALL_TERMS[idx];

  const flip = () => {
    animate(innerRef.current, { rotateX: flipped ? 0 : 180, duration: 650, ease: "outExpo" });
    setFlipped((f) => !f);
  };

  const goTo = (newIdx) => {
    animate(innerRef.current, { rotateX: 0, duration: 0 });
    setFlipped(false);
    setIdx(newIdx);
  };

  return (
    <div className="flashcard-section">
      <div className="flashcard-counter">{idx + 1} / {ALL_TERMS.length}</div>
      <div className="flashcard-scene" onClick={flip}>
        <div ref={innerRef} className="flashcard-inner">
          <div className="flashcard-face flashcard-front">
            <span className="flashcard-term">{term.name}</span>
            <span
              className="flashcard-pill"
              style={{ background: term.color.bg, border: `0.5px solid ${term.color.border}`, color: term.color.text }}
            >
              {term.category}
            </span>
          </div>
          <div className="flashcard-face flashcard-back">
            <span className="flashcard-def">{term.definition}</span>
            <span className="flashcard-example">{term.example}</span>
          </div>
        </div>
      </div>
      <div className="flashcard-nav">
        <button className="flashcard-nav-btn" onClick={(e) => { e.stopPropagation(); goTo((idx - 1 + ALL_TERMS.length) % ALL_TERMS.length); }}>←</button>
        <span className="flashcard-hint">click card to flip</span>
        <button className="flashcard-nav-btn" onClick={(e) => { e.stopPropagation(); goTo((idx + 1) % ALL_TERMS.length); }}>→</button>
      </div>
    </div>
  );
}

export default function RhetoricalMoveList() {
  const [mode, setMode] = useState("moves");
  const [selectedTerm, setSelectedTerm] = useState(null);

  return (
    <div className="rhetorical-page">
      <div className="rhetorical-content">
        {mode === "moves" ? (
          <div className="rhetorical-grid">
            {CATEGORIES.map((cat) => (
              <div key={cat.id} className="category-box">
                <div className="category-label">{cat.label}</div>
                <div className="term-grid">
                  {cat.terms.map((t) => (
                    <TermChip key={t.name} term={t} color={cat.color} category={cat.label} onSelect={setSelectedTerm} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Flashcards />
        )}
      </div>
      <div className="rhetorical-footer">
        <div className="mode-toggle">
          <button className={`mode-btn ${mode === "moves" ? "mode-btn-active" : ""}`} onClick={() => setMode("moves")}>all moves</button>
          <button className={`mode-btn ${mode === "flashcards" ? "mode-btn-active" : ""}`} onClick={() => setMode("flashcards")}>flashcards</button>
        </div>
      </div>
      {selectedTerm && <TermDetail term={selectedTerm} onClose={() => setSelectedTerm(null)} />}
    </div>
  );
}
