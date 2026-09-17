import { useEffect } from "react";
import { useAppState, useAppDispatch, useRecommendation, useT } from "../state/store";
import { gridSizeOptions, standOptions, rackOptions, hoodOptions } from "../data/engine";
import ChatPanel from "./ChatPanel";

export default function RefineScreen() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const rec = useRecommendation();
  const t = useT();
  const chatLog = state.chatByStep.refine || [];

  useEffect(() => {
    dispatch({ type: "SEED_REFINE" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function set(field, value) {
    dispatch({ type: "SET_OVERRIDE", field, value });
  }

  function askAnything(text) {
    dispatch({ type: "ASK_ANYTHING", stepKey: "refine", text });
  }

  return (
    <div className="content-row">
      <div className="refine-panel">
        <div className="refine-controls">
          <div className="step-label">{t("STEP 5 OF 6 — REFINE")}</div>
          <h1 className="q-title" style={{ fontSize: 26 }}>
            {t("Here's the full build — tweak anything that doesn't fit")}
          </h1>
          <div className="score-line">
            {rec.line} · {t("score")} {rec.score} · {rec.gridSize}
            {rec.gridNote ? ` (${t(rec.gridNote)})` : ""}
          </div>

          <div className="refine-fields">
            {rec.standWarning && <div className="warning-banner">{t(rec.standWarning)}</div>}

            <div className="refine-field">
              <label>{t("Grid size")}</label>
              <div className="segmented">
                {gridSizeOptions().map((g) => (
                  <button key={g} className={rec.gridSize === g ? "selected" : ""} onClick={() => set("gridSize", g)}>
                    {t(g)}
                  </button>
                ))}
              </div>
            </div>

            <div className="refine-field">
              <label>{t("Stand / mount")}</label>
              <div className="segmented">
                {standOptions().map((s) => (
                  <button key={s} className={rec.stand === s ? "selected" : ""} onClick={() => set("stand", s)}>
                    {t(s)}
                  </button>
                ))}
              </div>
            </div>

            <div className="refine-field">
              <label>{t("Rack insert")}</label>
              <div className="segmented">
                {rackOptions().map((r) => (
                  <button key={r} className={rec.rack === r ? "selected" : ""} onClick={() => set("rack", r)}>
                    {t(r)}
                  </button>
                ))}
              </div>
            </div>

            <div className="refine-field">
              <label>{t("Ventilation hood")}</label>
              <div className="segmented">
                {hoodOptions().map((h) => (
                  <button key={h} className={rec.hood === h ? "selected" : ""} onClick={() => set("hood", h)}>
                    {t(h)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="step-nav">
            <button className="btn btn-back" type="button" onClick={() => dispatch({ type: "BACK" })}>
              {t("Back")}
            </button>
            <button className="btn btn-primary" type="button" onClick={() => dispatch({ type: "GO_SUMMARY" })}>
              {t("Continue →")}
            </button>
          </div>
        </div>

        <ChatPanel stepKey="refine" chatLog={chatLog} onAskAnything={askAnything} />
      </div>
    </div>
  );
}
