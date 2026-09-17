import { useT } from "../../state/store";

// Shared by desktop ChatPanel and mobile MobileChatTab — renders a small
// "Source: ..." link under a chat bubble when the message carries one.
// citation.label itself (a real external document title) is left untranslated.
export default function Citation({ citation }) {
  const t = useT();
  if (!citation || !citation.url) return null;
  return (
    <a href={citation.url} target="_blank" rel="noreferrer" className="chat-citation">
      {t("Source:")} {citation.label} ↗
    </a>
  );
}
