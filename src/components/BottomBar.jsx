import { useAppState, useRecommendation, useT } from "../state/store";

export default function BottomBar() {
  const state = useAppState();
  const rec = useRecommendation();
  const t = useT();

  const chips = [];
  if (rec.gridSize) chips.push({ label: `${t("Model:")} ${rec.gridSize}`, active: true });
  chips.push({ label: `${t("Hood:")} ${rec.hood ? t(rec.hood) : "—"}`, active: false });
  if (rec.rack) chips.push({ label: `${t("Rack:")} ${t(rec.rack)}`, active: false });
  if (rec.stand) chips.push({ label: `${t("Stand:")} ${t(rec.stand)}`, active: false });
  if (state.answers.power) {
    const label = state.answers.power === "gas" ? t("Gas") : t("Electric");
    chips.push({ label: `${t("Power:")} ${label}`, active: false });
  }
  if (state.accessories.length) {
    const n = state.accessories.length;
    const label =
      state.lang === "de" ? `+${n} Zubehörteil${n > 1 ? "e" : ""}` : `+${n} accessor${n > 1 ? "ies" : "y"}`;
    chips.push({ label, active: false });
  }

  if (state.screen === "summary") return null;

  // Guided and Refine steps have their own Continue/Back inside the panel
  // now (more visible, right next to the fields being edited) — the sticky
  // bar here just keeps showing the build-so-far chips, no duplicate actions.
  return (
    <div className="bottom-bar glass">
      <div className="chips">
        {chips.map((c, i) => (
          <span key={i} className={`chip ${c.active ? "active" : ""}`}>
            {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}
