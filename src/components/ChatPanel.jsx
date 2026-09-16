import { useState, useRef, useLayoutEffect } from "react";
import { useAppDispatch } from "../state/store";
import StreamedText from "./chat/StreamedText";
import resolveAction from "./chat/resolveAction";
import Citation from "./chat/Citation";

// Suggestion chips only appear once the message is 100% streamed in — `done`
// is local to this component instance, which mounts once per message (keyed
// by position in chatLog), matching StreamedText's own "streams once" model.
function Suggestions({ done, isLast, suggestions, onClick }) {
  if (!isLast || !done || !suggestions || suggestions.length === 0) return null;
  return (
    <div className="chat-suggestions">
      {suggestions.map((s, si) => (
        <button key={si} type="button" className="suggestion-chip" onClick={() => onClick(si, s)}>
          {s.q}
        </button>
      ))}
    </div>
  );
}

function QaEntry({ q, a, citation, suggestions, isLast, onSuggestionClick }) {
  const [done, setDone] = useState(false);
  return (
    <>
      <div className="chat-bubble-user">{q}</div>
      <div className="chat-bubble" style={{ marginTop: 6 }}>
        <StreamedText text={a} after={<Citation citation={citation} />} onDone={() => setDone(true)} />
      </div>
      <Suggestions done={done} isLast={isLast} suggestions={suggestions} onClick={onSuggestionClick} />
    </>
  );
}

function AssistantEntry({ text, citation, suggestions, isLast, onSuggestionClick }) {
  const [done, setDone] = useState(false);
  return (
    <>
      <div className="chat-bubble">
        <StreamedText text={text} after={<Citation citation={citation} />} onDone={() => setDone(true)} />
      </div>
      <Suggestions done={done} isLast={isLast} suggestions={suggestions} onClick={onSuggestionClick} />
    </>
  );
}

export default function ChatPanel({ stepKey, chatLog, inputPlaceholder = "Ask anything", onAskAnything, freeTextMode }) {
  const dispatch = useAppDispatch();
  const [text, setText] = useState("");
  const scrollRef = useRef(null);
  const spacerRef = useRef(null);

  // Messages stay in chronological order (oldest first), but the panel is kept
  // scrolled so the newest bubble sits at the TOP of the visible area — older
  // messages are pushed above that, out of view until the user scrolls up.
  // A trailing spacer (sized to the viewport) guarantees there's always enough
  // scroll room to pin the newest message to the top, even when the log is short.
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (spacerRef.current) spacerRef.current.style.height = `${el.clientHeight}px`;
    const blocks = el.querySelectorAll(".msg-block");
    const last = blocks[blocks.length - 1];
    if (last) el.scrollTop = Math.max(0, last.offsetTop - 8);
  }, [chatLog.length]);

  function submit() {
    const trimmed = text.trim();
    if (!trimmed) return;
    setText("");
    if (freeTextMode) {
      dispatch({ type: "START_FREE_TEXT", text: trimmed });
      return;
    }
    onAskAnything(trimmed);
  }

  function clickSuggestion(msgIndex, si, s) {
    if (s.action) {
      dispatch({ type: "ECHO_USER", stepKey, text: s.q });
      resolveAction(dispatch, s.action);
      return;
    }
    dispatch({ type: "TAP_SUGGESTION", stepKey, msgIndex, suggestionIndex: si });
  }

  return (
    <div className="chat-panel">
      <div className="chat-conversation" ref={scrollRef}>
        {chatLog.length === 0 && (
          <div className="chat-empty">
            {freeTextMode
              ? "Tap an answer on the left, or tell Zoe about your kitchen here to skip straight ahead."
              : "Zoe's notes for this step will appear here."}
          </div>
        )}
        {chatLog.map((msg, i) => {
          const isLast = i === chatLog.length - 1;

          if (msg.type === "transition") {
            return (
              <div className="msg-block" key={i}>
                <div className="chat-bubble transition">
                  <StreamedText text={msg.text} />
                </div>
              </div>
            );
          }
          if (msg.type === "user") {
            return (
              <div className="msg-block" key={i}>
                <div className="chat-bubble-user">{msg.text}</div>
              </div>
            );
          }
          if (msg.type === "qa") {
            return (
              <div className="msg-block" key={i}>
                <QaEntry q={msg.q} a={msg.a} citation={msg.citation} suggestions={msg.suggestions} isLast={isLast} onSuggestionClick={(si, s) => clickSuggestion(i, si, s)} />
              </div>
            );
          }
          // fact or assistant, may carry suggestions — only the newest message still offers them, and only once fully streamed in
          return (
            <div className="msg-block" key={i}>
              <AssistantEntry text={msg.text} citation={msg.citation} suggestions={msg.suggestions} isLast={isLast} onSuggestionClick={(si, s) => clickSuggestion(i, si, s)} />
            </div>
          );
        })}
        <div ref={spacerRef} className="chat-spacer" aria-hidden="true" />
      </div>
      <div className="chat-input-row">
        <div className="chat-input">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={inputPlaceholder}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
            }}
          />
          <button type="button" className="chat-send" onClick={submit}>
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
