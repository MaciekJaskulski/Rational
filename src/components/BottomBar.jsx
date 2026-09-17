import { useAppState, useAppDispatch, useRecommendation } from "../state/store";
import { STEPS } from "../data/steps";

function canContinue(state) {
  const step = state.currentStep;
  if (step === 1) return !!state.answers.meals;
  if (step === 2) return !!state.answers.focus;
  if (step === 3) return !!state.answers.footprint;
  if (step === 4) return !!state.answers.power && !!state.answers.ventilation;
  return true;
}

export default function BottomBar() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const rec = useRecommendation();

  const chips = [];
  if (rec.gridSize) chips.push({ label: `Model: ${rec.gridSize}`, active: true });
  chips.push({ label: `Hood: ${rec.hood || "—"}`, active: false });
  if (rec.rack) chips.push({ label: `Rack: ${rec.rack}`, active: false });
  if (rec.stand) chips.push({ label: `Stand: ${rec.stand}`, active: false });
  if (state.answers.power) {
    const label = state.answers.power === "gas" ? "Gas" : "Electric";
    chips.push({ label: `Power: ${label}`, active: false });
  }
  if (state.accessories.length) {
    chips.push({ label: `+${state.accessories.length} accessor${state.accessories.length > 1 ? "ies" : "y"}`, active: false });
  }

  const isGuided = state.screen === "guided";
  const isFirstStep = isGuided && state.currentStep === 1 && !state.pathC.active;
  const continueEnabled = isGuided ? canContinue(state) : true;

  function handleBack() {
    dispatch({ type: "BACK" });
  }

  function handleContinue() {
    if (state.screen === "guided") {
      if (state.currentStep === 4) {
        dispatch({ type: "GO_REFINE" });
      } else {
        dispatch({ type: "CONTINUE" });
      }
    } else if (state.screen === "refine") {
      dispatch({ type: "GO_SUMMARY" });
    }
  }

  if (state.screen === "summary") return null;

  return (
    <div className="bottom-bar glass">
      <div className="chips">
        {chips.map((c, i) => (
          <span key={i} className={`chip ${c.active ? "active" : ""}`}>
            {c.label}
          </span>
        ))}
      </div>
      <div className="bottom-actions">
        {!isFirstStep && (
          <button className="btn btn-back" onClick={handleBack}>
            Back
          </button>
        )}
        <button className="btn btn-primary" onClick={handleContinue} disabled={!continueEnabled}>
          Continue →
        </button>
      </div>
    </div>
  );
}
