import { STEPS } from "../data/steps";
import { useAppState, useAppDispatch } from "../state/store";
import ChatPanel from "./ChatPanel";

export default function QuestionPanel() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const step = STEPS.find((s) => s.id === state.currentStep);
  const stepKey = step.key;
  const chatLog = state.chatByStep[stepKey] || [];

  const freeTextMode = stepKey === "meals" && !state.answers.meals && !state.pathC.active;

  function askAnything(text) {
    dispatch({ type: "ASK_ANYTHING", stepKey, text });
  }

  return (
    <div className="question-panel">
      <div className="step-label">{step.stepLabel}</div>
      <div className="body-chat">
        <div className="q-body">
          <h1 className="q-title">{step.title}</h1>
          <p className="q-subtitle">{step.subtitle}</p>

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
                      <span className="option-title">{opt.label}</span>
                      <span className="option-sub">{opt.sublabel}</span>
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
                  <div className="q-subgroup-label">{sub.label}</div>
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
                          <span className="option-title">{opt.label}</span>
                          <span className="option-sub">{opt.sublabel}</span>
                        </div>
                        <div className={`option-radio ${selected ? "checked" : ""}`}>{selected ? "✓" : ""}</div>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>

        <ChatPanel stepKey={stepKey} chatLog={chatLog} onAskAnything={askAnything} freeTextMode={freeTextMode} />
      </div>
    </div>
  );
}
