// Shared by desktop ChatPanel and mobile MobileChatTab — resolves the Path C
// / refine action-chips (power:, vent:, accessory:, pathc:) into dispatches.
export default function resolveAction(dispatch, action) {
  if (!action) return false;
  const [kind, value] = action.split(":");
  if (kind === "power") {
    dispatch({ type: "PATHC_SET_POWER", power: value });
    return true;
  }
  if (kind === "vent") {
    if (value === "unsure") dispatch({ type: "PATHC_SET_VENTILATION", unsure: true });
    else dispatch({ type: "PATHC_SET_VENTILATION", ventilation: value });
    return true;
  }
  if (kind === "accessory") {
    if (value === "none") dispatch({ type: "PATHC_ADD_ACCESSORY", accessoryId: null });
    else dispatch({ type: "PATHC_ADD_ACCESSORY", accessoryId: value });
    return true;
  }
  if (kind === "pathc") {
    if (value === "confirm") dispatch({ type: "PATHC_CONFIRM" });
    if (value === "upsize") dispatch({ type: "PATHC_UPSIZE" });
    if (value === "why") dispatch({ type: "PATHC_WHY" });
    return true;
  }
  return false;
}
