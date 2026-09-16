import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { STEPS } from "../../data/steps";
import { useAppState, useAppDispatch, useRecommendation } from "../../state/store";
import { gridSizeOptions, standOptions, rackOptions, hoodOptions } from "../../data/engine";
import StreamedText from "../chat/StreamedText";
import resolveAction from "../chat/resolveAction";
import Citation from "../chat/Citation";

const REFINE_FIELD_META = {
  gridSize: { label: "grid size", options: gridSizeOptions },
  stand: { label: "stand", options: standOptions },
  rack: { label: "rack", options: rackOptions },
  hood: { label: "hood", options: hoodOptions },
};

// Builds the flat, chronological "blocks" for the whole conversation so far —
// one per guided step (1-4) plus a trailing refine block once reached. Each
// block carries its real chat history (fact bubbles / qa / follow-ups) plus,
// only on the block currently being answered, a synthetic question+options
// bubble that isn't persisted anywhere (mirrors the step's title/options).
function useConversationBlocks() {
  const state = useAppState();
  const blocks = [];
  const upTo = state.screen === "guided" ? state.currentStep : 4;

  for (let stepId = 1; stepId <= upTo; stepId += 1) {
    const step = STEPS.find((s) => s.id === stepId);
    const isCurrent = state.screen === "guided" && stepId === state.currentStep;
    const entries = state.chatByStep[step.key] || [];

    if (step.options) {
      const answered = !!state.answers[step.key];
      blocks.push({
        key: step.key,
        entries,
        synthetic: isCurrent && !answered ? { text: step.title, suggestions: step.options.map((o) => ({ q: o.label, action: `select:${step.id}:${o.id}` })) } : null,
      });
    } else if (step.subQuestions) {
      const powerDone = !!state.answers.power;
      const ventDone = !!state.answers.ventilation;
      let synthetic = null;
      if (isCurrent && !powerDone) {
        synthetic = { text: "What's your power connection — electric or gas?", suggestions: step.subQuestions[0].options.map((o) => ({ q: o.label, action: `subselect:power:${o.id}` })) };
      } else if (isCurrent && !ventDone) {
        synthetic = { text: "And what about ventilation — do you already have extraction, or will you need a hood?", suggestions: step.subQuestions[1].options.map((o) => ({ q: o.label, action: `subselect:ventilation:${o.id}` })) };
      }
      blocks.push({ key: step.key, entries, synthetic });
    }
  }

  if (state.screen === "refine" || state.screen === "summary") {
    blocks.push({ key: "refine", entries: state.chatByStep.refine || [], synthetic: null, isRefine: true });
  }

  return blocks;
}

function useKeyboardInset() {
  const [inset, setInset] = useState(0);
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return undefined;
    function onResize() {
      const gap = window.innerHeight - vv.height - vv.offsetTop;
      setInset(Math.max(0, gap));
    }
    vv.addEventListener("resize", onResize);
    vv.addEventListener("scroll", onResize);
    onResize();
    return () => {
      vv.removeEventListener("resize", onResize);
      vv.removeEventListener("scroll", onResize);
    };
  }, []);
  return inset;
}

export default function MobileChatTab() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const rec = useRecommendation();
  const blocks = useConversationBlocks();
  const [text, setText] = useState("");
  const [expandedField, setExpandedField] = useState(null);
  const scrollRef = useRef(null);
  const spacerRef = useRef(null);
  const keyboardInset = useKeyboardInset();

  useEffect(() => {
    if (state.screen === "refine" && (!state.chatByStep.refine || state.chatByStep.refine.length === 0)) {
      dispatch({ type: "SEED_REFINE" });
    }
  }, [state.screen, state.chatByStep.refine, dispatch]);

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (spacerRef.current) spacerRef.current.style.height = `${el.clientHeight}px`;
    const items = el.querySelectorAll(".m-msg-block");
    const last = items[items.length - 1];
    if (last) el.scrollTop = Math.max(0, last.offsetTop - 8);
  }, [blocks.length, expandedField, state.sentToAdvisor]);

  function handleSuggestion(action) {
    const [kind, a, b] = action.split(":");
    if (kind === "select") {
      const stepId = Number(a);
      dispatch({ type: "SELECT_OPTION", stepId, optionId: b });
      dispatch({ type: "CONTINUE" });
      return;
    }
    if (kind === "subselect") {
      const subKey = a;
      const optionId = b;
      dispatch({ type: "SELECT_SUBOPTION", subKey, optionId });
      const otherDone = subKey === "power" ? !!state.answers.ventilation : !!state.answers.power;
      if (otherDone) dispatch({ type: "CONTINUE" });
      return;
    }
    resolveAction(dispatch, action);
  }

  function changeField(field) {
    setExpandedField(field === expandedField ? null : field);
  }

  function setOverride(field, value) {
    dispatch({ type: "SET_OVERRIDE", field, value });
    setExpandedField(null);
  }

  function submit() {
    const trimmed = text.trim();
    if (!trimmed) return;
    setText("");
    const stepKey = state.screen === "guided" ? STEPS.find((s) => s.id === state.currentStep).key : "refine";
    if (stepKey === "meals" && !state.answers.meals && !state.pathC.active) {
      dispatch({ type: "START_FREE_TEXT", text: trimmed });
      return;
    }
    dispatch({ type: "ASK_ANYTHING", stepKey, text: trimmed });
  }

  function renderEntry(entry, entryIndex, blockKey, reactKey, isLastEntryOfLastBlock) {
    if (entry.type === "transition") {
      return (
        <div className="m-msg-block" key={reactKey}>
          <div className="m-bubble m-bubble-transition">
            <StreamedText text={entry.text} />
          </div>
        </div>
      );
    }
    if (entry.type === "user") {
      return (
        <div className="m-msg-block" key={reactKey}>
          <div className="m-bubble-user">{entry.text}</div>
        </div>
      );
    }
    if (entry.type === "qa") {
      return (
        <div className="m-msg-block" key={reactKey}>
          <div className="m-bubble-user">{entry.q}</div>
          <div className="m-bubble" style={{ marginTop: 6 }}>
            <StreamedText text={entry.a} after={<Citation citation={entry.citation} />} />
          </div>
        </div>
      );
    }
    const showSuggestions = isLastEntryOfLastBlock && entry.suggestions && entry.suggestions.length > 0;
    return (
      <div className="m-msg-block" key={reactKey}>
        <div className="m-bubble">
          <StreamedText text={entry.text} after={<Citation citation={entry.citation} />} />
        </div>
        {showSuggestions && (
          <div className="m-suggestions">
            {entry.suggestions.map((s, si) => (
              <button
                key={si}
                type="button"
                className="m-suggestion-chip"
                onClick={() => {
                  if (s.action && resolveAction(dispatch, s.action)) return;
                  dispatch({ type: "TAP_SUGGESTION", stepKey: blockKey, msgIndex: entryIndex, suggestionIndex: si });
                }}
              >
                {s.q}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  const lastBlockIdx = blocks.length - 1;

  return (
    <div className="m-sheet m-sheet-chat">
      <div className="m-chat-card">
        <div className="m-chat-conversation" ref={scrollRef}>
          {blocks.map((block, bi) => {
            const isLastBlock = bi === lastBlockIdx;
            return (
              <div key={block.key}>
                {block.entries.map((entry, i) =>
                  renderEntry(entry, i, block.key, `${block.key}-${i}`, isLastBlock && i === block.entries.length - 1 && !block.synthetic)
                )}
                {block.synthetic && isLastBlock && (
                  <div className="m-msg-block">
                    <div className="m-bubble">
                      <StreamedText text={block.synthetic.text} />
                    </div>
                    <div className="m-suggestions">
                      {block.synthetic.suggestions.map((s, si) => (
                        <button key={si} type="button" className="m-suggestion-chip" onClick={() => handleSuggestion(s.action)}>
                          {s.q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {block.isRefine && block.entries.length > 0 && (
                  <div className="m-msg-block">
                    {!state.sentToAdvisor ? (
                      <>
                        <div className="m-bubble">Want to tweak anything before I send this to your advisor?</div>
                        <div className="m-suggestions">
                          {Object.keys(REFINE_FIELD_META).map((field) => (
                            <button key={field} type="button" className="m-suggestion-chip" onClick={() => changeField(field)}>
                              Change {REFINE_FIELD_META[field].label}
                            </button>
                          ))}
                          <button type="button" className="m-suggestion-chip m-suggestion-chip--primary" onClick={() => dispatch({ type: "SEND_TO_ADVISOR" })}>
                            That's perfect, send it →
                          </button>
                        </div>
                        {expandedField && (
                          <div className="m-suggestions" style={{ marginTop: 8 }}>
                            {REFINE_FIELD_META[expandedField].options().map((val) => (
                              <button key={val} type="button" className="m-suggestion-chip" onClick={() => setOverride(expandedField, val)}>
                                {val}
                              </button>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="m-bubble">
                        <StreamedText
                          text={`Your config: ${rec.line}, ${rec.gridSize}, ${state.answers.power || "power TBD"}, ${rec.hood === "None" ? "no hood needed" : rec.hood || "hood TBD"}, ${rec.stand}, ${rec.rack}. A Rational advisor will reach out to confirm pricing, lead time, and installation logistics — nothing is ordered automatically.`}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
          <div ref={spacerRef} className="m-chat-spacer" aria-hidden="true" />
        </div>

        <div className="m-chat-input-row" style={{ transform: keyboardInset ? `translateY(-${keyboardInset}px)` : "none" }}>
          <div className="m-chips">
            {rec.gridSize && <span className="m-chip active">Model: {rec.gridSize}</span>}
            <span className="m-chip">Hood: {rec.hood || "—"}</span>
            {rec.rack && <span className="m-chip">Rack: {rec.rack}</span>}
          </div>
          <div className="m-chat-input">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ask anything"
              onKeyDown={(e) => {
                if (e.key === "Enter") submit();
              }}
            />
            <button type="button" className="m-chat-send" onClick={submit}>
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
