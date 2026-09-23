import { useAppState, useAppDispatch, useT } from "../../state/store";

export default function MobileHeader() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const t = useT();

  const stepLabel = state.screen === "guided" ? (state.lang === "de" ? `SCHRITT ${state.currentStep} VON 6` : `STEP ${state.currentStep} OF 6`) : null;

  return (
    <div className="m-nav">
      <div className="m-header-bar">
        <span className="m-logo">RATIONAL</span>
        {stepLabel && <span className="m-step-badge">{stepLabel}</span>}
        <div className="m-header-links">
          <button type="button" className="m-lang-btn" onClick={() => dispatch({ type: "SET_LANG", lang: state.lang === "en" ? "de" : "en" })}>
            {state.lang.toUpperCase()}
          </button>
          <button type="button" className="m-restart-btn" onClick={() => dispatch({ type: "RESTART" })}>
            {t("Restart")}
          </button>
        </div>
      </div>
    </div>
  );
}
