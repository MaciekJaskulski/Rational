import { useState } from "react";
import { BG_CANVAS } from "../../assets/images";
import MobileHeader from "./MobileHeader";
import MobileProductZone from "./MobileProductZone";
import MobileGuidedTab from "./MobileGuidedTab";
import MobileChatTab from "./MobileChatTab";
import MobileBottomBar from "./MobileBottomBar";

// Consumes the same AppProvider context as the desktop tree (mounted once at
// the App root) so resizing across the breakpoint never resets in-progress
// answers — only the presentation swaps.
export default function MobileApp() {
  const [activeTab, setActiveTab] = useState("guided");

  return (
    <div className="m-stage">
      <img className="m-bg-canvas" src={BG_CANVAS} alt="" />
      <div className="m-bg-scrim" />
      <div className="m-frame">
        <MobileHeader activeTab={activeTab} onTabChange={setActiveTab} />
        <MobileProductZone />
        <div className="m-tab-content">{activeTab === "guided" ? <MobileGuidedTab /> : <MobileChatTab />}</div>
        {activeTab === "guided" && <MobileBottomBar />}
      </div>
    </div>
  );
}
