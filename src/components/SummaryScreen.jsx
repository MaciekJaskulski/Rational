import { useAppState, useAppDispatch, useRecommendation } from "../state/store";
import ProductPreview from "./ProductPreview";

const DEALER_LOCATOR_URL = "https://www.rational-online.com/en_gb/customercare/rational-dealer/?zipKey=London%2C+UK";

export default function SummaryScreen() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const rec = useRecommendation();

  const powerLabel = state.answers.power === "gas" ? "gas" : state.answers.power === "electric" ? "electric" : "power TBD";

  return (
    <div className="summary-screen">
      <div className="summary-panel">
        <div className="step-label">STEP 6 OF 6 — SUMMARY</div>
        <h1 className="q-title" style={{ fontSize: 26 }}>
          {rec.line}, {rec.gridSize}
        </h1>
        <ProductPreview variant="summary" force />
        <div className="summary-list">
          <span className="chip active">Model: {rec.gridSize}</span>
          <span className="chip">Power: {powerLabel}</span>
          <span className="chip">Hood: {rec.hood || "—"}</span>
          <span className="chip">Stand: {rec.stand || "—"}</span>
          <span className="chip">Rack: {rec.rack || "—"}</span>
          {state.accessories.map((a) => (
            <span className="chip" key={a.id}>
              {a.label}
            </span>
          ))}
        </div>

        <p className="q-subtitle" style={{ textAlign: "center" }}>
          Your config: {rec.line}, {rec.gridSize}, {powerLabel}, {rec.hood === "None" ? "no hood needed" : rec.hood || "hood TBD"}, {rec.stand}, {rec.rack}.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <button className="btn btn-back" type="button">
            Save as PDF
          </button>
          <button className="btn btn-back" type="button">
            Email it
          </button>
          <a className="btn btn-primary" href={DEALER_LOCATOR_URL} target="_blank" rel="noreferrer">
            Find your local dealer
          </a>
        </div>

        <button className="btn btn-back" style={{ marginTop: 8 }} onClick={() => dispatch({ type: "BACK" })}>
          Back to Refine
        </button>
      </div>
    </div>
  );
}
