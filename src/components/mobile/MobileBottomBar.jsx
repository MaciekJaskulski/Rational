import { useAppState, useAppDispatch } from "../../state/store";

function canContinue(state) {
  const step = state.currentStep;
  if (step === 1) return !!state.answers.meals;
  if (step === 2) return !!state.answers.focus;
  if (step === 3) return !!state.answers.footprint;
  if (step === 4) return !!state.answers.power && !!state.answers.ventilation;
  return true;
}

export default function MobileBottomBar() {
  const state = useAppState();
  const dispatch = useAppDispatch();

  if (state.sentToAdvisor) return null;

  const isGuided = state.screen === "guided";
  const isFirstStep = isGuided && state.currentStep === 1;
  const continueEnabled = isGuided ? canContinue(state) : true;
  const label = isGuided ? "Continue →" : "Send to advisor";

  function handleBack() {
    dispatch({ type: "BACK" });
  }

  function handleContinue() {
    if (isGuided) {
      if (state.currentStep === 4) {
        dispatch({ type: "GO_REFINE" });
      } else {
        dispatch({ type: "CONTINUE" });
      }
    } else {
      dispatch({ type: "SEND_TO_ADVISOR" });
    }
  }

  return (
    <div className="m-bottom-bar">
      {!isFirstStep && (
        <button type="button" className="m-btn m-btn-back" onClick={handleBack}>
          Back
        </button>
      )}
      <button type="button" className="m-btn m-btn-primary" onClick={handleContinue} disabled={!continueEnabled}>
        {label}
      </button>
    </div>
  );
}
