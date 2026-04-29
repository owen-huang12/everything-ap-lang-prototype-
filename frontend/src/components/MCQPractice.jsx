import { useState, useEffect, useRef } from "react";
import { animate, spring } from "animejs";
export default function MCQPractice() {
  const [fullscreen, setFullscreen] = useState(false);
  const [passage, setPassage] = useState("");
  const [title, setTitle] = useState("");
  const [source, setSource] = useState("");
  const [questions, setQuestions] = useState([]);
  const [choices, setChoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const choicesRef = useRef([]);

  const sp = spring({ bounce: 0.15, duration: 10 });
  const anim = (el, props) => animate(el, { ...props, duration: 200, ease: sp });
  const UNSEL   = { card: "#ffffff", border: "#000000", letter: "#ffffff" };
  const SEL     = { card: "#daeeff", border: "#7abfee", letter: "#e5f9ff" };
  const CORRECT = { card: "#d4f5e2", border: "#4caf82", letter: "#c6f0d8" };
  const WRONG   = { card: "#fde8e8", border: "#e05c5c", letter: "#fdd5d5" };

  const animChoice = (el, to, from = UNSEL) => {
    anim(el, { background: [from.card, to.card] });
    anim(el.querySelector(".choice-letter"), { borderRightColor: [from.border, to.border], background: [from.letter, to.letter] });
  };

  useEffect(() => {
    async function load() {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/generate-package`);
      const data = await res.json();
      setPassage(data.passage.body);
      setTitle(data.passage.title);
      setSource(data.passage.source ?? "");
      setQuestions(data.questions);
      setChoices(data.choices);
      setLoading(false);
    }
    load();
  }, []);

  if (loading)
    return (
      <div className="center-screen">
        <div className="dot-spinner" />
      </div>
    );

  return (
    <div className="mcq">
      <div className="mcq-col">
        <div className={`passage-body ${fullscreen ? "fullscreen" : ""}`}>
          <div className="passage-preamble">
            {source && <div>({source})</div>}
            <button
              className="passage-fullscreen"
              onClick={() => setFullscreen((f) => !f)}
              aria-label="Toggle fullscreen"
            >
              {fullscreen ? "⤡" : "⤢"}
            </button>
          </div>
          <div className="passage-text">
            {passage.split("\n").map((para, i) => (
              <p key={i}>{para.trim()}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="mcq-col">
        <div className="answers-box">
          {questions.length > 0 &&
            (() => {
              const q = questions[currentQ];
              const qChoices = choices.filter(
                (c) => c.question_id === q.question_id,
              );
              const letters = ["a", "b", "c", "d", "e"];
              return (
                <div className="question-panel">
                  <div className="question-counter">
                    question {currentQ + 1} / {questions.length}
                  </div>
                  <div className="question-prompt">{q.prompt}</div>
                  <div className="choice-list">
                    {qChoices.map((c, i) => (
                      <button
                        key={c.choice_id}
                        ref={(el) => (choicesRef.current[i] = el)}
                        className="choice-card"
                        disabled={submitted}
                        onClick={() => {
                          if (selectedChoice != null) {
                            const prevI = qChoices.findIndex((ch) => ch.choice_id === selectedChoice);
                            if (choicesRef.current[prevI]) {
                              anim(choicesRef.current[prevI], { background: [SEL.card, UNSEL.card] });
                              anim(choicesRef.current[prevI].querySelector(".choice-letter"), { borderRightColor: [SEL.border, UNSEL.border], background: [SEL.letter, UNSEL.card] });
                            }
                          }
                          anim(choicesRef.current[i], { background: [UNSEL.card, SEL.card] });
                          anim(choicesRef.current[i].querySelector(".choice-letter"), { borderRightColor: [UNSEL.border, SEL.border], background: [UNSEL.card, SEL.letter] });
                          setSelectedChoice(c.choice_id);
                        }}
                      >
                        <span className="choice-letter">{letters[i]}.</span>
                        <span className="choice-text">{c.text}</span>
                      </button>
                    ))}
                  </div>
                  <div style={{ textAlign: "center" }}>
                    {submitted && <button className="see-reason">see the reason ...</button>}
                  </div>
                  <div className="question-footer">

                    <button
                      className="submit-btn"
                      disabled={selectedChoice === null}
                      onClick={() => {
                        if (!submitted) {
                          const selIdx = qChoices.findIndex((ch) => ch.choice_id === selectedChoice);
                          const corrIdx = qChoices.findIndex((ch) => ch.is_correct);
                          const isCorrect = qChoices[selIdx]?.is_correct;
                          animChoice(choicesRef.current[selIdx], isCorrect ? CORRECT : WRONG, SEL);
                          if (!isCorrect) animChoice(choicesRef.current[corrIdx], CORRECT);
                          setSubmitted(true);
                        } else {
                          setSubmitted(false);
                          setSelectedChoice(null);
                          setCurrentQ((q) => Math.min(q + 1, questions.length - 1));
                        }
                      }}
                    >
                      {submitted ? "next question" : "submit"}
                    </button>
                  </div>
                </div>
              );
            })()}
        </div>
      </div>
    </div>
  );
}
