import { useAppState, useAppDispatch } from "../../state/store";
import MobileHeader from "./MobileHeader";
import MobileProductZone from "./MobileProductZone";
import MobileGuidedTab from "./MobileGuidedTab";
import MobileChatTab from "./MobileChatTab";
import MobileBottomBar from "./MobileBottomBar";

// Consumes the same AppProvider context as the desktop tree (mounted once at
// the App root) so resizing across the breakpoint never resets in-progress
// answers — only the presentation swaps. activeTab lives in global state
// (not local component state) so other components — e.g. the mobile Path C
// demo's "Let me review my setup" action — can switch it too.
export default function MobileApp() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const activeTab = state.mobileTab;
  const setActiveTab = (tab) => dispatch({ type: "SET_MOBILE_TAB", tab });

  return (
    <div className="m-stage">
      <div className="m-frame">
        <MobileHeader activeTab={activeTab} onTabChange={setActiveTab} />
        <MobileProductZone />
        <div className="m-tab-content">{activeTab === "guided" ? <MobileGuidedTab /> : <MobileChatTab />}</div>
        {activeTab === "guided" && <MobileBottomBar />}
      </div>
    </div>
  );
}
