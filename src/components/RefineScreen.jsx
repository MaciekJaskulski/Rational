import { useEffect } from "react";
import { useAppState, useAppDispatch, useRecommendation } from "../state/store";
import { gridSizeOptions, standOptions, rackOptions, hoodOptions } from "../data/engine";
import ChatPanel from "./ChatPanel";

export default function RefineScreen() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const rec = useRecommendation();
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
          <div className="step-label">STEP 5 OF 6 — REFINE</div>
          <h1 className="q-title" style={{ fontSize: 26 }}>
            Here's the full build — tweak anything that doesn't fit
          </h1>
          <div className="score-line">
            {rec.line} · score {rec.score} · {rec.gridSize}
            {rec.gridNote ? ` (${rec.gridNote})` : ""}
          </div>

          <div className="refine-fields">
            {rec.standWarning && <div className="warning-banner">{rec.standWarning}</div>}

            <div className="refine-field">
              <label>Grid size</label>
              <div className="segmented">
                {gridSizeOptions().map((g) => (
                  <button key={g} className={rec.gridSize === g ? "selected" : ""} onClick={() => set("gridSize", g)}>
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="refine-field">
              <label>Stand / mount</label>
              <div className="segmented">
                {standOptions().map((s) => (
                  <button key={s} className={rec.stand === s ? "selected" : ""} onClick={() => set("stand", s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="refine-field">
              <label>Rack insert</label>
              <div className="segmented">
                {rackOptions().map((r) => (
                  <button key={r} className={rec.rack === r ? "selected" : ""} onClick={() => set("rack", r)}>
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="refine-field">
              <label>Ventilation hood</label>
              <div className="segmented">
                {hoodOptions().map((h) => (
                  <button key={h} className={rec.hood === h ? "selected" : ""} onClick={() => set("hood", h)}>
                    {h}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="refine-nav">
            <button className="btn btn-back" type="button" onClick={() => dispatch({ type: "BACK" })}>
              Back
            </button>
            <button className="btn btn-primary" type="button" onClick={() => dispatch({ type: "GO_SUMMARY" })}>
              Continue →
            </button>
          </div>
        </div>

        <ChatPanel stepKey="refine" chatLog={chatLog} onAskAnything={askAnything} />
      </div>
    </div>
  );
}
