import { useT } from "../../state/store";

// Shared by desktop ChatPanel, mobile MobileChatTab, and the XS gate's
// advisory banners — renders one or more small "Source: ..." links under a
// message. `citation` is either a single {label,url} or an array of them
// (a message can cite more than one fact, e.g. a product's own datasheet
// plus the fat-drain fact file). citation.label itself (a real external
// document title) is left untranslated.
export default function Citation({ citation }) {
  const t = useT();
  const list = (Array.isArray(citation) ? citation : [citation]).filter((c) => c && c.url);
  if (list.length === 0) return null;
  return (
    <>
      {list.map((c, i) => (
        <a key={i} href={c.url} target="_blank" rel="noreferrer" className="chat-citation">
          {t("Source:")} {c.label} ↗
        </a>
      ))}
    </>
  );
}
