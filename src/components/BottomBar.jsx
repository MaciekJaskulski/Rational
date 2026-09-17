import { useAppState, useRecommendation } from "../state/store";

export default function BottomBar() {
  const state = useAppState();
  const rec = useRecommendation();

  const chips = [];
  if (rec.gridSize) chips.push({ label: `Model: ${rec.gridSize}`, active: true });
  chips.push({ label: `Hood: ${rec.hood || "—"}`, active: false });
  if (rec.rack) chips.push({ label: `Rack: ${rec.rack}`, active: false });
  if (rec.stand) chips.push({ label: `Stand: ${rec.stand}`, active: false });
  if (state.answers.power) {
    const label = state.answers.power === "gas" ? "Gas" : "Electric";
    chips.push({ label: `Power: ${label}`, active: false });
  }
  if (state.accessories.length) {
    chips.push({ label: `+${state.accessories.length} accessor${state.accessories.length > 1 ? "ies" : "y"}`, active: false });
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
