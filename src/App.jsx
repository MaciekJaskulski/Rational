import { AppProvider, useAppState } from "./state/store";
import Header from "./components/Header";
import QuestionPanel from "./components/QuestionPanel";
import ProductPreview from "./components/ProductPreview";
import BottomBar from "./components/BottomBar";
import RefineScreen from "./components/RefineScreen";
import SummaryScreen from "./components/SummaryScreen";
import { BG_CANVAS } from "./assets/images";

function Screen() {
  const state = useAppState();
  return (
    <div className="stage">
      <img className="bg-canvas" src={BG_CANVAS} alt="" />
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
        <BottomBar />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Screen />
    </AppProvider>
  );
}
