import { STEPS } from "../data/steps";
import { useAppState, useAppDispatch, useT } from "../state/store";
import { gridSizeOptions } from "../data/engine";
import { XS_GATE_ASK, XS_GATE_CHOOSE, XS_GATE_SUGGESTED } from "../data/xsGate";
import ChatPanel from "./ChatPanel";

function canContinue(state) {
  const step = state.currentStep;
  if (step === 1) return !!state.answers.meals;
  if (step === 2) return !!state.answers.focus;
  if (step === 3) return !!state.answers.footprint;
  if (step === 4) return !!state.answers.power && !!state.answers.ventilation;
  return true;
}

// XS's add-on gate ("Step 1a") — a real inserted guided-selling step, not a
// chat aside. `ask` checks whether the fat drain / core probe / lockable
// panel matter at all; `choose` (only reached on "yes") lets the user pick
// any non-XS size, with the two smallest ones marked as the suggested step-up.
function XsGatePanel() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const t = useT();
  const { stage, answer, chosenSize } = state.xsGate;
  const isChoose = stage === "choose";
  const content = isChoose ? XS_GATE_CHOOSE : XS_GATE_ASK;
  const continueEnabled = isChoose ? !!chosenSize : !!answer;
  const chatLog = state.chatByStep.meals || [];

  return (
    <div className="question-panel">
      <div className="step-label">{t(content.stepLabel)}</div>
      <div className="body-chat">
        <div className="q-body">
          <h1 className="q-title">{t(content.title)}</h1>
          <p className="q-subtitle">{t(content.subtitle)}</p>

          <div className="q-options">
            {!isChoose &&
              XS_GATE_ASK.options.map((opt) => {
                const selected = answer === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    className={`option-card ${selected ? "selected" : ""}`}
                    onClick={() => dispatch({ type: "XSGATE_SELECT_ANSWER", value: opt.id })}
                  >
                    <div className="option-text">
                      <span className="option-title">{t(opt.label)}</span>
                      <span className="option-sub">{t(opt.sublabel)}</span>
                    </div>
                    <div className={`option-radio ${selected ? "checked" : ""}`}>{selected ? "✓" : ""}</div>
                  </button>
                );
              })}
            {isChoose &&
              gridSizeOptions()
                .filter((g) => g !== "XS")
                .map((g) => {
                  const selected = chosenSize === g;
                  const suggested = XS_GATE_SUGGESTED.includes(g);
                  return (
                    <button
                      key={g}
                      type="button"
                      className={`option-card ${selected ? "selected" : ""}`}
                      onClick={() => dispatch({ type: "XSGATE_SELECT_SIZE", gridSize: g })}
                    >
                      <div className="option-text">
                        <span className="option-title">
                          {t(g)}
                          {suggested && <span className="option-suggested-badge">{t("Suggested")}</span>}
                        </span>
                      </div>
                      <div className={`option-radio ${selected ? "checked" : ""}`}>{selected ? "✓" : ""}</div>
                    </button>
                  );
                })}
          </div>

          <div className="step-nav">
            <button className="btn btn-back" type="button" onClick={() => dispatch({ type: "XSGATE_BACK" })}>
              {t("Back")}
            </button>
            <button className="btn btn-primary" type="button" onClick={() => dispatch({ type: "XSGATE_CONTINUE" })} disabled={!continueEnabled}>
              {t("Continue →")}
            </button>
          </div>
        </div>

        <ChatPanel stepKey="meals" chatLog={chatLog} onAskAnything={(text) => dispatch({ type: "ASK_ANYTHING", stepKey: "meals", text })} freeTextMode={false} />
      </div>
    </div>
  );
}

export default function QuestionPanel() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const t = useT();

  if (state.xsGate.active) return <XsGatePanel />;

  const step = STEPS.find((s) => s.id === state.currentStep);
  const stepKey = step.key;
  const chatLog = state.chatByStep[stepKey] || [];

  const freeTextMode = stepKey === "meals" && !state.answers.meals && !state.pathC.active;
  const isFirstStep = state.currentStep === 1 && !state.pathC.active;
  const continueEnabled = canContinue(state);

  function askAnything(text) {
    dispatch({ type: "ASK_ANYTHING", stepKey, text });
  }

  function handleContinue() {
    if (state.currentStep === 4) {
      dispatch({ type: "GO_REFINE" });
    } else {
      dispatch({ type: "CONTINUE" });
    }
  }

  return (
    <div className="question-panel">
      <div className="step-label">{t(step.stepLabel)}</div>
      <div className="body-chat">
        <div className="q-body">
          <h1 className="q-title">{t(step.title)}</h1>
          <p className="q-subtitle">{t(step.subtitle)}</p>

          {step.options && (
            <div className="q-options">
              {step.options.map((opt) => {
                const selected = state.answers[stepKey] === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    className={`option-card ${selected ? "selected" : ""}`}
                    onClick={() => dispatch({ type: "SELECT_OPTION", stepId: step.id, optionId: opt.id })}
                  >
                    <div className="option-text">
                      <span className="option-title">{t(opt.label)}</span>
                      <span className="option-sub">{t(opt.sublabel)}</span>
                    </div>
                    <div className={`option-radio ${selected ? "checked" : ""}`}>{selected ? "✓" : ""}</div>
                  </button>
                );
              })}
            </div>
          )}

          {step.subQuestions && (
            <div className="q-options">
              {step.subQuestions.map((sub) => (
                <div key={sub.id}>
                  <div className="q-subgroup-label">{t(sub.label)}</div>
                  {sub.options.map((opt) => {
                    const selected = state.answers[sub.id] === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        className={`option-card ${selected ? "selected" : ""}`}
                        style={{ marginTop: 8 }}
                        onClick={() => dispatch({ type: "SELECT_SUBOPTION", subKey: sub.id, optionId: opt.id })}
                      >
                        <div className="option-text">
                          <span className="option-title">{t(opt.label)}</span>
                          <span className="option-sub">{t(opt.sublabel)}</span>
                        </div>
                        <div className={`option-radio ${selected ? "checked" : ""}`}>{selected ? "✓" : ""}</div>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          )}

          <div className="step-nav">
            {!isFirstStep && (
              <button className="btn btn-back" type="button" onClick={() => dispatch({ type: "BACK" })}>
                {t("Back")}
              </button>
            )}
            <button className="btn btn-primary" type="button" onClick={handleContinue} disabled={!continueEnabled}>
              {t("Continue →")}
            </button>
          </div>
        </div>

        <ChatPanel stepKey={stepKey} chatLog={chatLog} onAskAnything={askAnything} freeTextMode={freeTextMode} />
      </div>
    </div>
  );
}
