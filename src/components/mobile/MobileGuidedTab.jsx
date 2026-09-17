import { STEPS } from "../../data/steps";
import { useAppState, useAppDispatch, useRecommendation } from "../../state/store";
import { gridSizeOptions, standOptions, rackOptions, hoodOptions } from "../../data/engine";

function StepQuestion() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const step = STEPS.find((s) => s.id === state.currentStep);

  return (
    <>
      <div className="m-step-label">{step.shortLabel}</div>
      <h1 className="m-q-title">{step.title}</h1>
      <p className="m-q-subtitle">{step.subtitle}</p>

      {step.options && (
        <div className="m-options">
          {step.options.map((opt) => {
            const selected = state.answers[step.key] === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                className={`m-option-card ${selected ? "selected" : ""}`}
                onClick={() => dispatch({ type: "SELECT_OPTION", stepId: step.id, optionId: opt.id })}
              >
                <div className="m-option-text">
                  <span className="m-option-title">{opt.label}</span>
                  <span className="m-option-sub">{opt.sublabel}</span>
                </div>
                <div className={`m-option-radio ${selected ? "checked" : ""}`}>{selected ? "✓" : ""}</div>
              </button>
            );
          })}
        </div>
      )}

      {step.subQuestions && (
        <div className="m-options">
          {step.subQuestions.map((sub) => (
            <div key={sub.id}>
              <div className="m-subgroup-label">{sub.label}</div>
              {sub.options.map((opt) => {
                const selected = state.answers[sub.id] === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    className={`m-option-card ${selected ? "selected" : ""}`}
                    style={{ marginTop: 8 }}
                    onClick={() => dispatch({ type: "SELECT_SUBOPTION", subKey: sub.id, optionId: opt.id })}
                  >
                    <div className="m-option-text">
                      <span className="m-option-title">{opt.label}</span>
                      <span className="m-option-sub">{opt.sublabel}</span>
                    </div>
                    <div className={`m-option-radio ${selected ? "checked" : ""}`}>{selected ? "✓" : ""}</div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function RefineFields() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const rec = useRecommendation();

  function set(field, value) {
    dispatch({ type: "SET_OVERRIDE", field, value });
  }

  if (state.sentToAdvisor) {
    return (
      <>
        <div className="m-step-label">ALL SET</div>
        <h1 className="m-q-title">Sent to your Rational advisor</h1>
        <p className="m-q-subtitle">
          Your config: {rec.line}, {rec.gridSize}, {state.answers.power || "power TBD"}, {rec.hood === "None" ? "no hood needed" : rec.hood || "hood TBD"}, {rec.stand}, {rec.rack}.
          A Rational advisor will reach out to confirm pricing, lead time, and installation logistics — nothing is ordered automatically.
        </p>
      </>
    );
  }

  return (
    <>
      <div className="m-step-label">REFINE</div>
      <h1 className="m-q-title">Here's the full build — tweak anything that doesn't fit</h1>
      <p className="m-q-subtitle">
        {rec.line} · {rec.gridSize}
        {rec.gridNote ? ` (${rec.gridNote})` : ""}
      </p>

      {rec.standWarning && <div className="m-warning-banner">{rec.standWarning}</div>}

      <div className="m-refine-field">
        <label>Grid size</label>
        <div className="m-segmented">
          {gridSizeOptions().map((g) => (
            <button key={g} className={rec.gridSize === g ? "selected" : ""} onClick={() => set("gridSize", g)}>
              {g}
            </button>
          ))}
        </div>
      </div>
      <div className="m-refine-field">
        <label>Stand / mount</label>
        <div className="m-segmented">
          {standOptions().map((s) => (
            <button key={s} className={rec.stand === s ? "selected" : ""} onClick={() => set("stand", s)}>
              {s}
            </button>
          ))}
        </div>
      </div>
      <div className="m-refine-field">
        <label>Rack insert</label>
        <div className="m-segmented">
          {rackOptions().map((r) => (
            <button key={r} className={rec.rack === r ? "selected" : ""} onClick={() => set("rack", r)}>
              {r}
            </button>
          ))}
        </div>
      </div>
      <div className="m-refine-field">
        <label>Ventilation hood</label>
        <div className="m-segmented">
          {hoodOptions().map((h) => (
            <button key={h} className={rec.hood === h ? "selected" : ""} onClick={() => set("hood", h)}>
              {h}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

function Chips() {
  const state = useAppState();
  const rec = useRecommendation();

  const chips = [];
  if (rec.gridSize) chips.push({ label: `Model: ${rec.gridSize}`, active: true });
  chips.push({ label: `Hood: ${rec.hood || "—"}`, active: false });
  if (rec.rack) chips.push({ label: `Rack: ${rec.rack}`, active: false });
  if (rec.stand) chips.push({ label: `Stand: ${rec.stand}`, active: false });
  if (state.answers.power) chips.push({ label: `Power: ${state.answers.power === "gas" ? "Gas" : "Electric"}`, active: false });

  return (
    <div className="m-chips">
      {chips.map((c, i) => (
        <span key={i} className={`m-chip ${c.active ? "active" : ""}`}>
          {c.label}
        </span>
      ))}
    </div>
  );
}

export default function MobileGuidedTab() {
  const state = useAppState();

  return (
    <div className="m-sheet">
      <div className="m-sheet-scroll">
        {state.screen === "guided" ? <StepQuestion /> : <RefineFields />}
        <Chips />
      </div>
    </div>
  );
}
