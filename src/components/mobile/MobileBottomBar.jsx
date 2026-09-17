import { useState } from "react";
import { useAppState, useAppDispatch } from "../../state/store";
import LeadGenModal from "../LeadGenModal";

const DEALER_LOCATOR_URL = "https://www.rational-online.com/en_gb/customercare/rational-dealer/?zipKey=London%2C+UK";

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
  const [showLeadGen, setShowLeadGen] = useState(false);

  if (state.sentToAdvisor) return null;

  const isGuided = state.screen === "guided";
  const continueEnabled = isGuided ? canContinue(state) : true;

  function handleBack() {
    dispatch({ type: "BACK" });
  }

  function handleContinue() {
    if (state.currentStep === 4) {
      dispatch({ type: "GO_REFINE" });
    } else {
      dispatch({ type: "CONTINUE" });
    }
  }

  if (isGuided) {
    const isFirstStep = state.currentStep === 1;
    return (
      <div className="m-bottom-bar">
        {!isFirstStep && (
          <button type="button" className="m-btn m-btn-back" onClick={handleBack}>
            Back
          </button>
        )}
        <button type="button" className="m-btn m-btn-primary" onClick={handleContinue} disabled={!continueEnabled}>
          Continue →
        </button>
      </div>
    );
  }

  // Refine screen — same CTAs as desktop's Refine step and the mobile Path C
  // chat ending, instead of the old "Send to advisor" flow.
  return (
    <>
      <div className="m-bottom-bar m-bottom-bar--cta-row">
        <button type="button" className="m-btn m-btn-back" onClick={handleBack}>
          Back
        </button>
        <button type="button" className="m-btn m-btn-back">
          Save as PDF
        </button>
        <button type="button" className="m-btn m-btn-primary" onClick={() => setShowLeadGen(true)}>
          Submit to sales
        </button>
        <a className="m-btn m-btn-back" href={DEALER_LOCATOR_URL} target="_blank" rel="noreferrer">
          Find a dealer
        </a>
      </div>
      <LeadGenModal open={showLeadGen} onClose={() => setShowLeadGen(false)} />
    </>
  );
}
