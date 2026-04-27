import { useState, useEffect } from "react";
import EvidenceBoard from "./EvidenceBoard.jsx";

export default function EvidenceTracker({ user }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    fetch("http://localhost:3000/api/evidence", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => { setItems(data); setLoading(false); });
  }, [user]);

  const addItem = (item) => setItems((prev) => [...prev, item]);
  const updateItem = (updated) => setItems((prev) => prev.map((i) => i.evidence_id === updated.evidence_id ? updated : i));
  const deleteItem = (id) => setItems((prev) => prev.filter((i) => i.evidence_id !== id));

  if (!user) {
    return (
      <div className="evidence-tracker">
        <div className="center-screen">
          <div className="evidence-signin-prompt">
            <p>sign in to use the evidence tracker</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="evidence-tracker">
        <div className="center-screen"><div className="dot-spinner" /></div>
      </div>
    );
  }

  return <EvidenceBoard items={items} onAdd={addItem} onUpdate={updateItem} onDelete={deleteItem} />;
}
