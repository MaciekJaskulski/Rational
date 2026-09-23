import MobileHeader from "./MobileHeader";
import MobileProductZone from "./MobileProductZone";
import MobileGuidedTab from "./MobileGuidedTab";
import MobileBottomBar from "./MobileBottomBar";

// Consumes the same AppProvider context as the desktop tree (mounted once at
// the App root) so resizing across the breakpoint never resets in-progress
// answers — only the presentation swaps. Guided selling is the only tab —
// there's no way to reach the chat surface on mobile.
export default function MobileApp() {
  return (
    <div className="m-stage">
      <div className="m-frame">
        <MobileHeader />
        <MobileProductZone />
        <div className="m-tab-content">
          <MobileGuidedTab />
        </div>
        <MobileBottomBar />
      </div>
    </div>
  );
}
