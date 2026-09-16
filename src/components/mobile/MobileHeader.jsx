import { useAppState, useAppDispatch } from "../../state/store";

export default function MobileHeader({ activeTab, onTabChange }) {
  const state = useAppState();
  const dispatch = useAppDispatch();

  const stepLabel = state.screen === "guided" ? `STEP ${state.currentStep} OF 6` : null;

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
            Restart
          </button>
        </div>
      </div>
      <div className="m-tabbar">
        <button type="button" className={`m-tab ${activeTab === "guided" ? "active" : ""}`} onClick={() => onTabChange("guided")}>
          Guided selling
        </button>
        <button type="button" className={`m-tab ${activeTab === "chat" ? "active" : ""}`} onClick={() => onTabChange("chat")}>
          <span className="m-tab-icon">✨</span> Talk about it
        </button>
      </div>
    </div>
  );
}
