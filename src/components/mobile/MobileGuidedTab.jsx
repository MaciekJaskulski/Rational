import { STEPS } from "../../data/steps";
import { useAppState, useAppDispatch, useRecommendation, useT } from "../../state/store";
import { gridSizeOptions, standOptions, rackOptions, hoodOptions } from "../../data/engine";

function StepQuestion() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const t = useT();
  const step = STEPS.find((s) => s.id === state.currentStep);

  return (
    <>
      <div className="m-step-label">{t(step.shortLabel)}</div>
      <h1 className="m-q-title">{t(step.title)}</h1>
      <p className="m-q-subtitle">{t(step.subtitle)}</p>

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
                  <span className="m-option-title">{t(opt.label)}</span>
                  <span className="m-option-sub">{t(opt.sublabel)}</span>
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
              <div className="m-subgroup-label">{t(sub.label)}</div>
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
                      <span className="m-option-title">{t(opt.label)}</span>
                      <span className="m-option-sub">{t(opt.sublabel)}</span>
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
  const t = useT();

  function set(field, value) {
    dispatch({ type: "SET_OVERRIDE", field, value });
  }

  if (state.sentToAdvisor) {
    const powerLabel = state.answers.power ? t(state.answers.power) : t("power TBD");
    const hoodLabel = rec.hood === "None" ? t("no hood needed") : rec.hood ? t(rec.hood) : t("hood TBD");
    return (
      <>
        <div className="m-step-label">{t("ALL SET")}</div>
        <h1 className="m-q-title">{t("Sent to your Rational advisor")}</h1>
        <p className="m-q-subtitle">
          {t("Your config:")} {rec.line}, {rec.gridSize}, {powerLabel}, {hoodLabel}, {rec.stand ? t(rec.stand) : rec.stand}, {rec.rack ? t(rec.rack) : rec.rack}.{" "}
          {t("A Rational advisor will reach out to confirm pricing, lead time, and installation logistics — nothing is ordered automatically.")}
        </p>
      </>
    );
  }

  return (
    <>
      <div className="m-step-label">{t("REFINE")}</div>
      <h1 className="m-q-title">{t("Here's the full build — tweak anything that doesn't fit")}</h1>
      <p className="m-q-subtitle">
        {rec.line} · {rec.gridSize}
        {rec.gridNote ? ` (${t(rec.gridNote)})` : ""}
      </p>

      {rec.standWarning && <div className="m-warning-banner">{t(rec.standWarning)}</div>}

      <div className="m-refine-field">
        <label>{t("Grid size")}</label>
        <div className="m-segmented">
          {gridSizeOptions().map((g) => (
            <button key={g} className={rec.gridSize === g ? "selected" : ""} onClick={() => set("gridSize", g)}>
              {t(g)}
            </button>
          ))}
        </div>
      </div>
      <div className="m-refine-field">
        <label>{t("Stand / mount")}</label>
        <div className="m-segmented">
          {standOptions().map((s) => (
            <button key={s} className={rec.stand === s ? "selected" : ""} onClick={() => set("stand", s)}>
              {t(s)}
            </button>
          ))}
        </div>
      </div>
      <div className="m-refine-field">
        <label>{t("Rack insert")}</label>
        <div className="m-segmented">
          {rackOptions().map((r) => (
            <button key={r} className={rec.rack === r ? "selected" : ""} onClick={() => set("rack", r)}>
              {t(r)}
            </button>
          ))}
        </div>
      </div>
      <div className="m-refine-field">
        <label>{t("Ventilation hood")}</label>
        <div className="m-segmented">
          {hoodOptions().map((h) => (
            <button key={h} className={rec.hood === h ? "selected" : ""} onClick={() => set("hood", h)}>
              {t(h)}
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
  const t = useT();

  const chips = [];
  if (rec.gridSize) chips.push({ label: `${t("Model:")} ${rec.gridSize}`, active: true });
  chips.push({ label: `${t("Hood:")} ${rec.hood ? t(rec.hood) : "—"}`, active: false });
  if (rec.rack) chips.push({ label: `${t("Rack:")} ${t(rec.rack)}`, active: false });
  if (rec.stand) chips.push({ label: `${t("Stand:")} ${t(rec.stand)}`, active: false });
  if (state.answers.power) chips.push({ label: `${t("Power:")} ${state.answers.power === "gas" ? t("Gas") : t("Electric")}`, active: false });

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
