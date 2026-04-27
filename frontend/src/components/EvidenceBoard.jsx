import { useState, useRef, useEffect } from "react";
import { animate } from "animejs";
import EvidenceCard from "./EvidenceCard.jsx";
import EvidenceDetail from "./EvidenceDetail.jsx";
import AddEvidenceForm from "./AddEvidenceForm.jsx";

export default function EvidenceBoard({ items, onAdd, onUpdate, onDelete }) {
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const detailRef = useRef(null);
  const formRef = useRef(null);

  const slideIn = (ref) => {
    requestAnimationFrame(() => {
      if (ref.current) {
        animate(ref.current, { translateX: ["100%", "0%"], duration: 400, ease: "outExpo" });
      }
    });
  };

  const slideOut = (ref, onComplete) => {
    if (ref.current) {
      animate(ref.current, {
        translateX: ["0%", "100%"],
        duration: 300,
        ease: "outExpo",
        onComplete,
      });
    }
  };

  const openForm = () => { setShowForm(true); slideIn(formRef); };
  const closeForm = () => slideOut(formRef, () => setShowForm(false));

  const openDetail = (item) => {
    if (showForm) closeForm();
    setSelected(item);
    slideIn(detailRef);
  };
  const closeDetail = () => slideOut(detailRef, () => setSelected(null));

  useEffect(() => {
    if (selected) {
      const fresh = items.find((i) => i.evidence_id === selected.evidence_id);
      if (fresh) setSelected(fresh);
    }
  }, [items]);

  return (
    <div className="evidence-tracker">

      {items.length > 0 && <div className="evidence-board">
        <div className="evidence-cards">
          {items.map((item) => (
            <EvidenceCard key={item.evidence_id} item={item} onClick={() => openDetail(item)} />
          ))}
        </div>
      </div>}
      {items.length == 0 && <div className = "evidence-card-empty">
        <span>start tracking pieces of evidence you can use in your essays!</span>
      </div>}

      <div className="evidence-add-bar">
        <button className="evidence-add-btn" onClick={openForm}>+ add evidence</button>
      </div>

      {selected && (
        <div className="evidence-detail-overlay" ref={detailRef}>
          <EvidenceDetail
            item={selected}
            onClose={closeDetail}
            onUpdate={onUpdate}
            onDelete={(id) => { onDelete(id); closeDetail(); }}
          />
        </div>
      )}

      {showForm && (
        <div className="evidence-form-overlay" ref={formRef}>
          <AddEvidenceForm
            onSave={(newItem) => { onAdd(newItem); closeForm(); }}
            onCancel={closeForm}
          />
        </div>
      )}
    </div>
  );
}
