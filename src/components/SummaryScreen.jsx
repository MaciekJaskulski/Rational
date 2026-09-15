import { useAppState, useAppDispatch, useRecommendation } from "../state/store";
import ProductPreview from "./ProductPreview";

export default function SummaryScreen() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const rec = useRecommendation();

  const needsTrade = state.answers.power === "gas" || (rec.hood && rec.hood !== "None");
  const tradeThing = state.answers.power === "gas" && rec.hood && rec.hood !== "None"
    ? "gas and your extraction hood"
    : state.answers.power === "gas"
    ? "gas"
    : "your extraction hood";

  const powerLabel = state.answers.power === "gas" ? "gas" : state.answers.power === "electric" ? "electric" : "power TBD";

  return (
    <div className="center-screen">
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

        {!state.sentToAdvisor ? (
          <>
            <p className="q-subtitle" style={{ textAlign: "center" }}>
              Your config: {rec.line}, {rec.gridSize}, {powerLabel}, {rec.hood === "None" ? "no hood needed" : rec.hood}, {rec.stand}, {rec.rack}. Want this sent to a Rational advisor for a formal quote?
            </p>

            {needsTrade && !state.checklistAdded && (
              <p className="q-subtitle" style={{ textAlign: "center" }}>
                Since {tradeThing} need{tradeThing.includes(" and ") ? "" : "s"} a certified installer, want me to attach an installation-readiness checklist alongside your quote?
              </p>
            )}

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              {needsTrade && !state.checklistAdded && (
                <button className="btn btn-back" onClick={() => dispatch({ type: "ADD_CHECKLIST" })}>
                  Yes, add checklist
                </button>
              )}
              <button className="btn btn-primary" onClick={() => dispatch({ type: "SEND_TO_ADVISOR" })}>
                Send to advisor
              </button>
            </div>
          </>
        ) : (
          <p className="q-subtitle" style={{ textAlign: "center" }}>
            A Rational advisor gets your exact configuration and reaches out to confirm pricing, lead time, and installation logistics — nothing is ordered automatically.
            {state.checklistAdded ? " Installation-readiness checklist attached." : ""}
          </p>
        )}

        <button className="btn btn-back" style={{ marginTop: 8 }} onClick={() => dispatch({ type: "BACK" })}>
          Back to Refine &amp; Accessories
        </button>
      </div>
    </div>
  );
}
