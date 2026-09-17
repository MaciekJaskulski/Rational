import { useState } from "react";
import { useAppState, useRecommendation } from "../state/store";

// Shared by desktop (SummaryScreen, RefineScreen) and mobile (MobileBottomBar)
// — one modal implementation, triggered from any of them. Mirrors
// ThreeDModal's visual style (glass card over a dark backdrop).
export default function LeadGenModal({ open, onClose }) {
  const state = useAppState();
  const rec = useRecommendation();
  const [submitted, setSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  if (!open) return null;

  const powerLabel = state.answers.power === "gas" ? "gas" : state.answers.power === "electric" ? "electric" : "power TBD";
  const hoodLabel = rec.hood === "None" ? "no hood needed" : rec.hood || "hood TBD";
  const description = `${rec.line}, ${rec.gridSize || "grid size TBD"}, ${powerLabel}, ${hoodLabel}, ${rec.stand || "stand TBD"}, ${rec.rack || "rack TBD"}.`;

  function handleClose() {
    onClose();
    // Reset for next time this is opened, after the close animation would settle.
    setSubmitted(false);
    setFirstName("");
    setCompany("");
    setEmail("");
    setPhone("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="leadgen-backdrop" onClick={handleClose}>
      <div className="leadgen-card" onClick={(e) => e.stopPropagation()}>
        {submitted ? (
          <>
            <h2 className="leadgen-title">Thanks, {firstName || "there"} — you're all set</h2>
            <p className="leadgen-subtitle">
              A Rational advisor will reach out to {email || "your email"} to confirm pricing, lead time, and installation logistics. Nothing is ordered
              automatically.
            </p>
            <button type="button" className="btn btn-primary" onClick={handleClose}>
              Close
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="leadgen-title">Submit to sales</h2>
            <div className="leadgen-description">{description}</div>

            <label className="leadgen-field">
              <span>First name</span>
              <input required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Jamie" />
            </label>
            <label className="leadgen-field">
              <span>Company name</span>
              <input required value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Riverside Steakhouse" />
            </label>
            <label className="leadgen-field">
              <span>Email</span>
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jamie@riverside.com" />
            </label>
            <label className="leadgen-field">
              <span>Phone number</span>
              <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 555 010 1234" />
            </label>

            <div className="leadgen-actions">
              <button type="button" className="btn btn-back" onClick={handleClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
