import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppState, useAppDispatch, useT } from "../state/store";

const STEP_LABELS = [
  "MEALS & VOLUME",
  "CULINARY FOCUS",
  "SPACE & FOOTPRINT",
  "INSTALLATION",
  "REFINE",
  "SUMMARY",
];

export default function Header() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const t = useT();
  const langRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (langRef.current && !langRef.current.contains(e.target)) {
        dispatch({ type: "CLOSE_LANG" });
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [dispatch]);

  const displayCurrent = state.screen === "refine" ? 5 : state.screen === "summary" ? 6 : state.currentStep;

  return (
    <div className="header glass">
      <div className="logo">RATIONAL</div>

      <div className="step-indicator">
        {STEP_LABELS.map((label, idx) => {
          const stepNum = idx + 1;
          const isCurrent = stepNum === displayCurrent;
          const isVisited = stepNum <= state.furthestStep && stepNum < displayCurrent;
          if (isCurrent) {
            return (
              <motion.div
                layoutId="active-step-pill"
                key={stepNum}
                className="step-pill"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              >
                <span className="num">{stepNum}</span>
                <span className="label">{t(label)}</span>
              </motion.div>
            );
          }
          return (
            <button
              key={stepNum}
              type="button"
              className={`step-dot ${isVisited ? "visited" : ""}`}
              disabled={!isVisited}
              title={isVisited ? t(label) : undefined}
              onClick={() => isVisited && dispatch({ type: "GOTO_STEP", step: stepNum })}
            />
          );
        })}
      </div>

      <div className="header-right">
        <div className="lang-toggle" ref={langRef}>
          <button className="lang-btn" onClick={() => dispatch({ type: "TOGGLE_LANG_EXPAND" })}>
            {state.lang.toUpperCase()}
          </button>
          <AnimatePresence>
            {state.langExpanded && (
              <motion.div
                className="lang-menu"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
              >
                <button className={state.lang === "en" ? "active" : ""} onClick={() => dispatch({ type: "SET_LANG", lang: "en" })}>
                  EN
                </button>
                <button className={state.lang === "de" ? "active" : ""} onClick={() => dispatch({ type: "SET_LANG", lang: "de" })}>
                  DE
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button className="restart-btn" onClick={() => dispatch({ type: "RESTART" })}>
          {t("Restart")}
        </button>
      </div>
    </div>
  );
}
