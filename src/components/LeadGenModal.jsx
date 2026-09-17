import { useState } from "react";
import { useAppState, useRecommendation, useT } from "../state/store";

// Shared by desktop (SummaryScreen, RefineScreen) and mobile (MobileBottomBar)
// — one modal implementation, triggered from any of them. Mirrors
// ThreeDModal's visual style (glass card over a dark backdrop).
export default function LeadGenModal({ open, onClose }) {
  const state = useAppState();
  const rec = useRecommendation();
  const t = useT();
  const [submitted, setSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  if (!open) return null;

  const powerLabel = state.answers.power === "gas" ? t("gas") : state.answers.power === "electric" ? t("electric") : t("power TBD");
  const hoodLabel = rec.hood === "None" ? t("no hood needed") : rec.hood ? t(rec.hood) : t("hood TBD");
  const gridLabel = rec.gridSize || t("grid size TBD");
  const standLabel = rec.stand ? t(rec.stand) : t("stand TBD");
  const rackLabel = rec.rack ? t(rec.rack) : t("rack TBD");
  const description = `${rec.line}, ${gridLabel}, ${powerLabel}, ${hoodLabel}, ${standLabel}, ${rackLabel}.`;

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
            <h2 className="leadgen-title">
              {state.lang === "de" ? `Danke${firstName ? `, ${firstName}` : ""} — Sie sind startklar` : `Thanks, ${firstName || "there"} — you're all set`}
            </h2>
            <p className="leadgen-subtitle">
              {state.lang === "de"
                ? `Ein RATIONAL Berater wird sich bei ${email || "Ihrer E-Mail-Adresse"} melden, um Preis, Lieferzeit und Installationsdetails zu bestätigen. Es wird nichts automatisch bestellt.`
                : `A Rational advisor will reach out to ${email || "your email"} to confirm pricing, lead time, and installation logistics. Nothing is ordered automatically.`}
            </p>
            <button type="button" className="btn btn-primary" onClick={handleClose}>
              {t("Close")}
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="leadgen-title">{t("Submit to sales")}</h2>
            <div className="leadgen-description">{description}</div>

            <label className="leadgen-field">
              <span>{t("First name")}</span>
              <input required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder={state.lang === "de" ? "Max" : "Jamie"} />
            </label>
            <label className="leadgen-field">
              <span>{t("Company name")}</span>
              <input
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder={state.lang === "de" ? "Restaurant Rheinblick" : "Riverside Steakhouse"}
              />
            </label>
            <label className="leadgen-field">
              <span>{t("Email")}</span>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={state.lang === "de" ? "max@rheinblick.de" : "jamie@riverside.com"}
              />
            </label>
            <label className="leadgen-field">
              <span>{t("Phone number")}</span>
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={state.lang === "de" ? "+49 151 23456789" : "+1 555 010 1234"}
              />
            </label>

            <div className="leadgen-actions">
              <button type="button" className="btn btn-back" onClick={handleClose}>
                {t("Cancel")}
              </button>
              <button type="submit" className="btn btn-primary">
                {t("Submit")}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
