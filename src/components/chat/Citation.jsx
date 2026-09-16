// Shared by desktop ChatPanel and mobile MobileChatTab — renders a small
// "Source: ..." link under a chat bubble when the message carries one.
export default function Citation({ citation }) {
  if (!citation || !citation.url) return null;
  return (
    <a href={citation.url} target="_blank" rel="noreferrer" className="chat-citation">
      Source: {citation.label} ↗
    </a>
  );
}
