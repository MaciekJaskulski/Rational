import { useState, useEffect } from "react";

// Streams text in once on mount (each chat bubble mounts exactly once, when appended to the log).
// `after` renders once streaming completes — used for citation links, so they
// don't pop in before the text has finished "being said". `onDone` fires
// once on completion too, so a parent can gate other UI (e.g. suggestion
// chips, which live outside this component) on the message being fully revealed.
export default function StreamedText({ text, speed = 14, after = null, onDone }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    if (!text) return undefined;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const done = count >= (text?.length || 0);

  useEffect(() => {
    if (done && onDone) onDone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  return (
    <>
      {text.slice(0, count)}
      {!done && <span className="stream-cursor" />}
      {done && after}
    </>
  );
}
