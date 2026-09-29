import { STEPS } from "../data/steps";
import { useAppState, useAppDispatch, useT } from "../state/store";
import { XS_GATE_SUBQUESTIONS, xsGateAnyYes, splitAdvisory } from "../data/xsGate";
import ChatPanel from "./ChatPanel";
import Citation from "./chat/Citation";

function canContinue(state) {
  const step = state.currentStep;
  if (step === 1) return !!state.answers.meals;
  if (step === 2) return !!state.answers.focus;
  if (step === 3) return !!state.answers.footprint;
  if (step === 4) return !!state.answers.power && !!state.answers.ventilation;
  return true;
}

// Step 1's options are the only ones with a gridSize — renders as
// "iCombi Pro <size> (<meals range>)" instead of just the meals range, so
// the product itself is visible at a glance. Product/size names are proper
// nouns (see i18n/dictionary.js) and stay untranslated; only the meals text runs through t().
function optionTitle(t, opt) {
  return opt.gridSize ? `iCombi Pro ${opt.gridSize} (${t(opt.label)})` : t(opt.label);
}

// The advisory paragraph's "iCombi 6 1/1" mention is itself a clickable
// shortcut for the same switch the CTA below performs.
function AdvisoryText({ text, onSwitchClick }) {
  const [before, link, after] = splitAdvisory(text);
  return (
    <p>
      {before}
      {link && (
        <button type="button" className="xsgate-advisory-link" onClick={onSwitchClick}>
          {link}
        </button>
      )}
      {after}
    </p>
  );
}

// XS's add-on subflow ("Step 1a/1b/1c") — three real inserted guided-selling
// questions, one per feature the XS skips (fat drain / core probe / lockable
// panel), not a chat aside. Each is a plain yes/no; "yes" shows an inline
// advisory recommending iCombi 6 1/1, which the user can commit to either by
// tapping the product mention in the advisory or the CTA below — both jump
// straight to Step 2. Continuing through with XS regardless is still fine.
function XsGatePanel() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const t = useT();
  const { subStep, answers } = state.xsGate;
  const sub = XS_GATE_SUBQUESTIONS[subStep];
  const answer = answers[sub.key];
  const anyYes = xsGateAnyYes(answers);
  const chatLog = state.chatByStep.meals || [];
  const showChat = state.viewMode === "extended";

  return (
    <div className={`question-panel ${showChat ? "" : "no-chat"}`}>
      <div className="step-label">{t(sub.stepLabel)}</div>
      <div className="body-chat">
        <div className="q-body">
          <h1 className="q-title">{t(sub.question)}</h1>

          <div className="q-options">
            {["yes", "no"].map((val) => {
              const selected = answer === val;
              return (
                <button
                  key={val}
                  type="button"
                  className={`option-card ${selected ? "selected" : ""}`}
                  onClick={() => dispatch({ type: "XSGATE_ANSWER_SUB", value: val })}
                >
                  <div className="option-text">
                    <span className="option-title">{t(val === "yes" ? "Yes" : "No")}</span>
                  </div>
                  <div className={`option-radio ${selected ? "checked" : ""}`}>{selected ? "✓" : ""}</div>
                </button>
              );
            })}
          </div>

          {answer === "yes" && (
            <div className="xsgate-advisory">
              <AdvisoryText text={t(sub.yesAdvisory)} onSwitchClick={() => dispatch({ type: "XSGATE_SWITCH_TO_6_1" })} />
              <Citation citation={sub.citation} />
            </div>
          )}

          <div className="step-nav">
            {anyYes ? (
              <button className="btn btn-back" type="button" onClick={() => dispatch({ type: "XSGATE_SWITCH_TO_6_1" })}>
                {t("Switch to iCombi 6 1/1")}
              </button>
            ) : (
              <button className="btn btn-back" type="button" onClick={() => dispatch({ type: "XSGATE_BACK" })}>
                {t("Back")}
              </button>
            )}
            <button className="btn btn-primary" type="button" onClick={() => dispatch({ type: "XSGATE_CONTINUE" })} disabled={!answer}>
              {t("Continue →")}
            </button>
          </div>
        </div>

        {showChat && (
          <ChatPanel stepKey="meals" chatLog={chatLog} onAskAnything={(text) => dispatch({ type: "ASK_ANYTHING", stepKey: "meals", text })} freeTextMode={false} />
        )}
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
  const showChat = state.viewMode === "extended";

  const freeTextMode = showChat && stepKey === "meals" && !state.answers.meals && !state.pathC.active;
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
    <div className={`question-panel ${showChat ? "" : "no-chat"}`}>
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
                      <span className="option-title">{optionTitle(t, opt)}</span>
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

        {showChat && <ChatPanel stepKey={stepKey} chatLog={chatLog} onAskAnything={askAnything} freeTextMode={freeTextMode} />}
      </div>
    </div>
  );
}
