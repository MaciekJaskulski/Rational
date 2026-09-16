import { AppProvider, useAppState } from "./state/store";
import { useIsMobile } from "./hooks/useIsMobile";
import Header from "./components/Header";
import QuestionPanel from "./components/QuestionPanel";
import ProductPreview from "./components/ProductPreview";
import BottomBar from "./components/BottomBar";
import RefineScreen from "./components/RefineScreen";
import SummaryScreen from "./components/SummaryScreen";
import MobileApp from "./components/mobile/MobileApp";
import { BG_CANVAS } from "./assets/images";

function Screen() {
  const state = useAppState();
  return (
    <div className="stage">
      <img className="bg-canvas" src={BG_CANVAS} alt="" />
      <div className="bg-canvas-scrim" />
      <div className="app-frame">
        <Header />

        {state.screen === "guided" && (
          <div className="content-row">
            <QuestionPanel />
          </div>
        )}
        {state.screen === "refine" && <RefineScreen />}
        {state.screen === "summary" && <SummaryScreen />}

        {state.screen === "guided" && <ProductPreview />}
        {state.screen === "refine" && <ProductPreview variant="refine" force />}
        <BottomBar />
      </div>
    </div>
  );
}

function Root() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileApp /> : <Screen />;
}

export default function App() {
  return (
    <AppProvider>
      <Root />
    </AppProvider>
  );
}
