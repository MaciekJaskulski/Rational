import { useT } from "../state/store";

// Sketchfab model per grid size — XS/6-Grid share the small-cabinet scan,
// 10-Grid and 20-Grid each get their own. 1/1 GN and 2/1 GN of the same
// grid count share a model since no separate scan exists per pan format.
const THREED_MODELS = {
  XS: "78cd3f702c324433a8f8276311389383",
  "6-Grid (1/1 GN)": "78cd3f702c324433a8f8276311389383",
  "6-Grid (2/1 GN)": "78cd3f702c324433a8f8276311389383",
  "10-Grid (1/1 GN)": "cd536811b6e046d2b8e32e4ae354f276",
  "10-Grid (2/1 GN)": "cd536811b6e046d2b8e32e4ae354f276",
  "20-Grid (1/1 GN)": "0253a21a1d16430c9fbc88cea90c804f",
  "20-Grid (2/1 GN)": "0253a21a1d16430c9fbc88cea90c804f",
};
const THREED_MODEL_FALLBACK = "cd536811b6e046d2b8e32e4ae354f276";

// Shared by both the desktop ProductPreview and mobile MobileProductZone —
// one modal implementation, triggered from either tree.
export default function ThreeDModal({ open, onClose, gridSize }) {
  const t = useT();
  if (!open) return null;

  const modelId = THREED_MODELS[gridSize] || THREED_MODEL_FALLBACK;

  return (
    <div className="threed-backdrop" onClick={onClose}>
      <div className="threed-card" onClick={(e) => e.stopPropagation()}>
        <div className="threed-embed-wrap">
          <iframe
            key={modelId}
            title={t("Rational Combi Oven")}
            className="threed-iframe"
            frameBorder="0"
            allowFullScreen
            mozallowfullscreen="true"
            webkitallowfullscreen="true"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            src={`https://sketchfab.com/models/${modelId}/embed`}
          />
        </div>
        <button type="button" className="threed-close-btn" onClick={onClose}>
          {t("Close")}
        </button>
      </div>
    </div>
  );
}
