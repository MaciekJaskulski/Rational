import { useState } from "react";
import { useAppState, useAppDispatch, useRecommendation, useT } from "../state/store";
import ProductPreview from "./ProductPreview";
import LeadGenModal from "./LeadGenModal";

const DEALER_LOCATOR_URL = "https://www.rational-online.com/en_gb/customercare/rational-dealer/?zipKey=London%2C+UK";

export default function SummaryScreen() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const rec = useRecommendation();
  const t = useT();
  const [showLeadGen, setShowLeadGen] = useState(false);

  const powerLabel = state.answers.power === "gas" ? t("gas") : state.answers.power === "electric" ? t("electric") : t("power TBD");
  const hoodLabel = rec.hood === "None" ? t("no hood needed") : rec.hood ? t(rec.hood) : t("hood TBD");

  return (
    <div className="summary-screen">
      <div className="summary-panel">
        <div className="step-label">{t("STEP 6 OF 6 — SUMMARY")}</div>
        <h1 className="q-title" style={{ fontSize: 26 }}>
          {rec.line}, {rec.gridSize}
        </h1>
        <ProductPreview variant="summary" force />
        <div className="summary-list">
          <span className="chip active">{t("Model:")} {rec.gridSize}</span>
          <span className="chip">{t("Power:")} {powerLabel}</span>
          <span className="chip">{t("Hood:")} {rec.hood ? t(rec.hood) : "—"}</span>
          <span className="chip">{t("Stand:")} {rec.stand ? t(rec.stand) : "—"}</span>
          <span className="chip">{t("Rack:")} {rec.rack ? t(rec.rack) : "—"}</span>
          {state.accessories.map((a) => (
            <span className="chip" key={a.id}>
              {t(a.label)}
            </span>
          ))}
        </div>

        <p className="q-subtitle" style={{ textAlign: "center" }}>
          {t("Your config:")} {rec.line}, {rec.gridSize}, {powerLabel}, {hoodLabel}, {rec.stand ? t(rec.stand) : rec.stand}, {rec.rack ? t(rec.rack) : rec.rack}.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <button className="btn btn-back" type="button">
            {t("Save as PDF")}
          </button>
          <button className="btn btn-primary" type="button" onClick={() => setShowLeadGen(true)}>
            {t("Submit to sales")}
          </button>
          <a className="btn btn-back" href={DEALER_LOCATOR_URL} target="_blank" rel="noreferrer">
            {t("Find your local dealer")}
          </a>
        </div>

        <button className="btn btn-back" style={{ marginTop: 8 }} onClick={() => dispatch({ type: "BACK" })}>
          {t("Back to Refine")}
        </button>
      </div>
      <LeadGenModal open={showLeadGen} onClose={() => setShowLeadGen(false)} />
    </div>
  );
}
