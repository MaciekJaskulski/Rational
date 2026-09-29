import { useEffect, useRef } from "react";
import { useAppState, useAppDispatch, useT } from "../../state/store";

export default function MobileHeader({ activeTab, onTabChange }) {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const t = useT();
  const viewRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (viewRef.current && !viewRef.current.contains(e.target)) {
        dispatch({ type: "CLOSE_VIEW_MENU" });
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [dispatch]);

  const stepLabel = state.screen === "guided" ? (state.lang === "de" ? `SCHRITT ${state.currentStep} VON 6` : `STEP ${state.currentStep} OF 6`) : null;

  return (
    <div className="m-nav">
      <div className="m-header-bar">
        <div className="m-view-toggle" ref={viewRef}>
          <button type="button" className="m-logo" onClick={() => dispatch({ type: "TOGGLE_VIEW_EXPAND" })}>
            RATIONAL
          </button>
          {state.viewMenuExpanded && (
            <div className="m-view-menu">
              <button type="button" className={state.viewMode === "mvp" ? "active" : ""} onClick={() => dispatch({ type: "SET_VIEW_MODE", mode: "mvp" })}>
                {t("MVP")}
              </button>
              <button type="button" className={state.viewMode === "extended" ? "active" : ""} onClick={() => dispatch({ type: "SET_VIEW_MODE", mode: "extended" })}>
                {t("V2")}
              </button>
            </div>
          )}
        </div>
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
      {state.viewMode === "extended" && (
        <div className="m-tabbar">
          <button type="button" className={`m-tab ${activeTab === "guided" ? "active" : ""}`} onClick={() => onTabChange("guided")}>
            {t("Guided selling")}
          </button>
          <button type="button" className={`m-tab ${activeTab === "chat" ? "active" : ""}`} onClick={() => onTabChange("chat")}>
            <span className="m-tab-icon">✨</span> {t("Talk about it")}
          </button>
        </div>
      )}
    </div>
  );
}
