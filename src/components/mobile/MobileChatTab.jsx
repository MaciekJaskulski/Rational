import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { STEPS } from "../../data/steps";
import { useAppState, useAppDispatch, useRecommendation, useT } from "../../state/store";
import { gridSizeOptions, standOptions, rackOptions, hoodOptions } from "../../data/engine";
import { XS_GATE_SUBQUESTIONS, xsGateAnyYes } from "../../data/xsGate";
import StreamedText from "../chat/StreamedText";
import resolveAction from "../chat/resolveAction";
import Citation from "../chat/Citation";
import { downloadConfigPdf } from "../../utils/pdf";

const LIVE_EVENT_URL = "https://www.rational-online.com/en_gb/see-for-yourself/rational-live-events/index.php";

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
  const t = useT();
  const blocks = [];
  const upTo = state.screen === "guided" ? state.currentStep : 4;

  for (let stepId = 1; stepId <= upTo; stepId += 1) {
    const step = STEPS.find((s) => s.id === stepId);
    const isCurrent = state.screen === "guided" && stepId === state.currentStep;
    const entries = state.chatByStep[step.key] || [];

    if (step.options) {
      const answered = !!state.answers[step.key];
      let synthetic = null;
      if (isCurrent && !answered) {
        synthetic = { text: t(step.title), suggestions: step.options.map((o) => ({ q: t(o.label), action: `select:${step.id}:${o.id}` })) };
      } else if (isCurrent && step.key === "meals" && state.xsGate.active) {
        // XS add-on subflow ("Step 1a/1b/1c") — same 3-question sequence as
        // the desktop/guided-tab panel, rendered here as chat chips instead
        // of option cards. Zoe's proactive explanation for the current
        // sub-question is a real (persisted) chat entry pushed by the
        // reducer, not part of this synthetic block.
        const sub = XS_GATE_SUBQUESTIONS[state.xsGate.subStep];
        const suggestions = [
          { q: t("Yes"), action: "xsgate:answer:yes" },
          { q: t("No"), action: "xsgate:answer:no" },
        ];
        if (xsGateAnyYes(state.xsGate.answers)) {
          suggestions.push({ q: t("Pick a different oven (recommended)"), action: "xsgate:restart" });
        }
        synthetic = { text: t(sub.question), suggestions };
      }
      blocks.push({ key: step.key, entries, synthetic });
    } else if (step.subQuestions) {
      const powerDone = !!state.answers.power;
      const ventDone = !!state.answers.ventilation;
      // In the Path C chat-narrated flow, the ventilation question waits
      // behind an explicit "ready to move on to ventilation?" nudge (see
      // nudgeForState in store.jsx) instead of appearing automatically —
      // outside Path C (plain mobile guided-via-chat), it still shows as
      // soon as power is answered, unchanged.
      const ventilationGateOpen = !state.pathC.active || state.pathC.ventilationUnlocked;
      let synthetic = null;
      if (isCurrent && !powerDone) {
        synthetic = { text: t("What's your power connection — electric or gas?"), suggestions: step.subQuestions[0].options.map((o) => ({ q: t(o.label), action: `subselect:power:${o.id}` })) };
      } else if (isCurrent && !ventDone && ventilationGateOpen) {
        synthetic = {
          text: t("And what about ventilation — do you already have extraction, or will you need a hood?"),
          suggestions: step.subQuestions[1].options.map((o) => ({ q: t(o.label), action: `subselect:ventilation:${o.id}` })),
        };
      }
      blocks.push({ key: step.key, entries, synthetic });
    }
  }

  if (state.screen === "refine" || state.screen === "summary") {
    blocks.push({ key: "refine", entries: state.chatByStep.refine || [], synthetic: null, isRefine: true });
  }

  return blocks;
}

// Flattens the per-step blocks into ONE chronological queue — real entries,
// then (only on the last block) a synthetic question, then (once refine is
// reached) the refine prompt/confirmation. This is what actually gets played
// out message-by-message; see revealCount below.
function buildQueue(blocks, sentToAdvisor, pathCActive) {
  const queue = [];
  const lastBlockIdx = blocks.length - 1;
  blocks.forEach((block, bi) => {
    const isLastBlock = bi === lastBlockIdx;
    block.entries.forEach((entry, i) => {
      queue.push({ id: `${block.key}-${i}`, kind: "entry", entry, blockKey: block.key, entryIndex: i });
    });
    if (block.synthetic && isLastBlock) {
      queue.push({ id: `${block.key}-synthetic`, kind: "synthetic", synthetic: block.synthetic, blockKey: block.key });
    }
    if (block.isRefine && block.entries.length > 0) {
      // The mobile Path C demo ends with its own three CTAs instead of the
      // generic "tweak a field" panel — plain mobile guided-via-chat (never
      // touched Path C) keeps the original panel, unchanged.
      const kind = sentToAdvisor ? "refine-sent" : pathCActive ? "refine-pathc-actions" : "refine-prompt";
      queue.push({ id: "refine-prompt", kind });
    }
  });
  return queue;
}

// Items with nothing to stream (the user's own bubble, the refine control
// panel) don't hold up the queue — they're revealed and immediately let the
// next item start.
function isInstantKind(item) {
  return (item.kind === "entry" && item.entry.type === "user") || item.kind === "refine-prompt" || item.kind === "refine-pathc-actions";
}

// Suggestion chips only appear once the message is 100% streamed in — `done`
// is local to each entry component, which mounts once per chat entry (keyed
// by position), matching StreamedText's own "streams once" model. Defined at
// module scope (not inside MobileChatTab) so these don't remount — and lose
// their `done` state — on every parent re-render. `onStreamDone` (separate
// from the local `done` used for suggestion-gating) advances the reveal
// queue so the next queued message can start.
function MSuggestions({ done, show, suggestions, onClick }) {
  const t = useT();
  if (!show || !done || !suggestions || suggestions.length === 0) return null;
  // `hidden` suggestions stay in the array (so the free-text fuzzy matcher
  // can still find them) but never render as a chip — `si` must stay the
  // index into the REAL array for that matching (and TAP_SUGGESTION) to work.
  if (suggestions.every((s) => s.hidden)) return null;
  return (
    <div className="m-suggestions">
      {suggestions.map((s, si) =>
        s.hidden ? null : (
          <button key={si} type="button" className="m-suggestion-chip" onClick={() => onClick(si, s)}>
            {t(s.q)}
          </button>
        )
      )}
    </div>
  );
}

// See ChatPanel.jsx's identical helper — combines a message's text with its
// optional trailing nudge prompt AFTER translating each piece separately.
function displayText(t, text, appendPrompt) {
  return appendPrompt ? `${t(text)} ${t(appendPrompt)}` : t(text);
}

function MQaEntry({ q, a, appendPrompt, citation, suggestions, show, onSuggestionClick, onStreamDone }) {
  const t = useT();
  const [done, setDone] = useState(false);
  function handleDone() {
    setDone(true);
    if (onStreamDone) onStreamDone();
  }
  return (
    <>
      <div className="m-bubble-user">{t(q)}</div>
      <div className="m-bubble" style={{ marginTop: 6 }}>
        <StreamedText text={displayText(t, a, appendPrompt)} after={<Citation citation={citation} />} onDone={handleDone} />
      </div>
      <MSuggestions done={done} show={show} suggestions={suggestions} onClick={onSuggestionClick} />
    </>
  );
}

function MAssistantEntry({ text, appendPrompt, citation, suggestions, show, onSuggestionClick, onStreamDone }) {
  const t = useT();
  const [done, setDone] = useState(false);
  function handleDone() {
    setDone(true);
    if (onStreamDone) onStreamDone();
  }
  return (
    <>
      <div className="m-bubble">
        <StreamedText text={displayText(t, text, appendPrompt)} after={<Citation citation={citation} />} onDone={handleDone} />
      </div>
      <MSuggestions done={done} show={show} suggestions={suggestions} onClick={onSuggestionClick} />
    </>
  );
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
  const t = useT();
  const blocks = useConversationBlocks();
  const queue = buildQueue(blocks, state.sentToAdvisor, state.pathC.active);
  const [text, setText] = useState("");
  const [expandedField, setExpandedField] = useState(null);
  const [revealCount, setRevealCount] = useState(0);
  const scrollRef = useRef(null);
  const spacerRef = useRef(null);
  const prevQueueLenRef = useRef(0);
  const keyboardInset = useKeyboardInset();

  useEffect(() => {
    if (state.screen === "refine" && (!state.chatByStep.refine || state.chatByStep.refine.length === 0)) {
      dispatch({ type: "SEED_REFINE" });
    }
  }, [state.screen, state.chatByStep.refine, dispatch]);

  // Messages are played out one at a time: only the first `revealCount`
  // queue items are mounted at all. A streamed item advances the queue via
  // its own onDone; an instant item (see isInstantKind) advances itself as
  // soon as it's shown. If the queue ever shrinks (RESTART), start over.
  useEffect(() => {
    if (queue.length < prevQueueLenRef.current) {
      setRevealCount(0);
    }
    prevQueueLenRef.current = queue.length;
  }, [queue.length]);

  useEffect(() => {
    if (revealCount === 0) {
      if (queue.length > 0) setRevealCount(1);
      return;
    }
    const current = queue[revealCount - 1];
    if (current && isInstantKind(current) && revealCount < queue.length) {
      setRevealCount((rc) => rc + 1);
    }
  }, [revealCount, queue.length]);

  function advanceIfCurrent(index) {
    setRevealCount((rc) => (index === rc - 1 ? rc + 1 : rc));
  }

  // Pins the newest ACTIVE message to the top of the visible area — fires
  // only when a new message actually starts (revealCount changes), not on
  // every character the current one streams, so a long message stays put
  // (readable from its start) instead of chasing the scroll downward.
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (spacerRef.current) spacerRef.current.style.height = `${el.clientHeight}px`;
    const items = el.querySelectorAll(".m-msg-block");
    const last = items[items.length - 1];
    if (last) el.scrollTop = Math.max(0, last.offsetTop - 8);
  }, [revealCount, expandedField, state.sentToAdvisor]);

  function handleSuggestion(action) {
    const [kind, a, b] = action.split(":");
    if (kind === "select") {
      const stepId = Number(a);
      dispatch({ type: "SELECT_OPTION", stepId, optionId: b });
      // Outside Path C, selecting immediately advances — mobile's only way
      // to move forward without a separate Continue button. Inside Path C,
      // the answer's factBubble + curated suggestions get a turn first;
      // advancing instead waits for the explicit "ready to continue" nudge.
      if (!state.pathC.active) dispatch({ type: "CONTINUE" });
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
    if (kind === "xsgate") {
      if (a === "restart") {
        dispatch({ type: "XSGATE_RESTART" });
        return;
      }
      dispatch({ type: "XSGATE_ANSWER_SUB", value: b });
      dispatch({ type: "XSGATE_CONTINUE" });
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

  function renderQueueItem(item, index, isLast) {
    const key = item.id;

    if (item.kind === "entry") {
      const entry = item.entry;
      if (entry.type === "transition") {
        return (
          <div className="m-msg-block" key={key}>
            <div className="m-bubble m-bubble-transition">
              <StreamedText text={t(entry.text)} onDone={() => advanceIfCurrent(index)} />
            </div>
          </div>
        );
      }
      if (entry.type === "user") {
        return (
          <div className="m-msg-block" key={key}>
            <div className="m-bubble-user">{t(entry.text)}</div>
          </div>
        );
      }
      function onSuggestionClick(si, s) {
        if (s.action) {
          // Action-driven chips (Yes/continue, option taps routed through an
          // action string) don't get a "qa" pairing the way plain Q&A chips
          // do — echo the click as its own user bubble so every tap shows up
          // in the conversation, matching plain-suggestion taps below.
          dispatch({ type: "ECHO_USER", stepKey: item.blockKey, text: s.q });
          if (resolveAction(dispatch, s.action)) return;
        }
        dispatch({ type: "TAP_SUGGESTION", stepKey: item.blockKey, msgIndex: item.entryIndex, suggestionIndex: si });
      }
      if (entry.type === "qa") {
        return (
          <div className="m-msg-block" key={key}>
            <MQaEntry
              q={entry.q}
              a={entry.a}
              appendPrompt={entry.appendPrompt}
              citation={entry.citation}
              suggestions={entry.suggestions}
              show={isLast}
              onSuggestionClick={onSuggestionClick}
              onStreamDone={() => advanceIfCurrent(index)}
            />
          </div>
        );
      }
      return (
        <div className="m-msg-block" key={key}>
          <MAssistantEntry
            text={entry.text}
            appendPrompt={entry.appendPrompt}
            citation={entry.citation}
            suggestions={entry.suggestions}
            show={isLast}
            onSuggestionClick={onSuggestionClick}
            onStreamDone={() => advanceIfCurrent(index)}
          />
        </div>
      );
    }

    if (item.kind === "synthetic") {
      return (
        <div className="m-msg-block" key={key}>
          <MAssistantEntry
            text={item.synthetic.text}
            suggestions={item.synthetic.suggestions}
            show={true}
            onSuggestionClick={(si, s) => {
              if (s.action) dispatch({ type: "ECHO_USER", stepKey: item.blockKey, text: s.q });
              handleSuggestion(s.action);
            }}
            onStreamDone={() => advanceIfCurrent(index)}
          />
        </div>
      );
    }

    if (item.kind === "refine-prompt") {
      return (
        <div className="m-msg-block" key={key}>
          <div className="m-bubble">{t("Want to tweak anything before I send this to your advisor?")}</div>
          <div className="m-suggestions">
            {Object.keys(REFINE_FIELD_META).map((field) => (
              <button key={field} type="button" className="m-suggestion-chip" onClick={() => changeField(field)}>
                {state.lang === "de" ? `${t(REFINE_FIELD_META[field].label)} ändern` : `Change ${REFINE_FIELD_META[field].label}`}
              </button>
            ))}
            <button type="button" className="m-suggestion-chip m-suggestion-chip--primary" onClick={() => dispatch({ type: "SEND_TO_ADVISOR" })}>
              {t("That's perfect, send it →")}
            </button>
          </div>
          {expandedField && (
            <div className="m-suggestions" style={{ marginTop: 8 }}>
              {REFINE_FIELD_META[expandedField].options().map((val) => (
                <button key={val} type="button" className="m-suggestion-chip" onClick={() => setOverride(expandedField, val)}>
                  {t(val)}
                </button>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (item.kind === "refine-pathc-actions") {
      return (
        <div className="m-msg-block" key={key}>
          <div className="m-bubble">{t("Ready to bring this all together?")}</div>
          <div className="m-suggestions">
            <button type="button" className="m-suggestion-chip m-suggestion-chip--primary" onClick={() => dispatch({ type: "SET_MOBILE_TAB", tab: "guided" })}>
              {t("Let me review my setup")}
            </button>
            <button type="button" className="m-suggestion-chip" onClick={() => downloadConfigPdf(rec, state, t)}>
              {t("Save as PDF")}
            </button>
            <a className="m-suggestion-chip" href="https://www.rational-online.com/en_gb/customercare/rational-dealer/" target="_blank" rel="noreferrer">
              {t("Find a local dealer")}
            </a>
            <a className="m-suggestion-chip" href={LIVE_EVENT_URL} target="_blank" rel="noreferrer">
              {t("Sign up to a live event")}
            </a>
          </div>
        </div>
      );
    }

    // refine-sent
    const powerLabel = state.answers.power ? t(state.answers.power) : t("power TBD");
    const hoodLabel = rec.hood === "None" ? t("no hood needed") : rec.hood ? t(rec.hood) : t("hood TBD");
    const sentText = `${t("Your config:")} ${rec.line}, ${rec.gridSize}, ${powerLabel}, ${hoodLabel}, ${rec.stand ? t(rec.stand) : rec.stand}, ${
      rec.rack ? t(rec.rack) : rec.rack
    }. ${t("A Rational advisor will reach out to confirm pricing, lead time, and installation logistics — nothing is ordered automatically.")}`;
    return (
      <div className="m-msg-block" key={key}>
        <div className="m-bubble">
          <StreamedText text={sentText} onDone={() => advanceIfCurrent(index)} />
        </div>
      </div>
    );
  }

  const visibleQueue = queue.slice(0, revealCount);

  return (
    <div className="m-sheet m-sheet-chat">
      <div className="m-chat-card">
        <div className="m-chat-conversation" ref={scrollRef}>
          {visibleQueue.map((item, i) => renderQueueItem(item, i, i === queue.length - 1))}
          <div ref={spacerRef} className="m-chat-spacer" aria-hidden="true" />
        </div>

        <div className="m-chat-input-row" style={{ transform: keyboardInset ? `translateY(-${keyboardInset}px)` : "none" }}>
          <div className="m-chips">
            {rec.gridSize && (
              <span className="m-chip active">
                {t("Model:")} {rec.gridSize}
              </span>
            )}
            <span className="m-chip">
              {t("Hood:")} {rec.hood ? t(rec.hood) : "—"}
            </span>
            {rec.rack && (
              <span className="m-chip">
                {t("Rack:")} {t(rec.rack)}
              </span>
            )}
          </div>
          <div className="m-chat-input">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t("Ask anything")}
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
