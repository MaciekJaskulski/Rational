// Shared by desktop ChatPanel and mobile MobileChatTab — resolves the Path C
// / refine action-chips ("pathc:*") into dispatches.
export default function resolveAction(dispatch, action) {
  if (!action) return false;
  const [kind, value] = action.split(":");
  if (kind === "pathc") {
    if (value === "confirm") dispatch({ type: "PATHC_CONFIRM" });
    if (value === "upsize") dispatch({ type: "PATHC_UPSIZE" });
    if (value === "why") dispatch({ type: "PATHC_WHY" });
    if (value === "advance") dispatch({ type: "PATHC_ADVANCE" });
    if (value === "unlock_ventilation") dispatch({ type: "PATHC_UNLOCK_VENTILATION" });
    if (value === "summarize") dispatch({ type: "GO_SUMMARY" });
    return true;
  }
  return false;
}
