// Shared by both the desktop ProductPreview and mobile MobileProductZone —
// one modal implementation, triggered from either tree.
export default function ThreeDModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="threed-backdrop" onClick={onClose}>
      <div className="threed-card" onClick={(e) => e.stopPropagation()}>
        <div className="threed-embed-wrap">
          <iframe
            title="Rational Combi Oven"
            className="threed-iframe"
            frameBorder="0"
            allowFullScreen
            mozallowfullscreen="true"
            webkitallowfullscreen="true"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            src="https://sketchfab.com/models/cd536811b6e046d2b8e32e4ae354f276/embed"
          />
        </div>
        <button type="button" className="threed-close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
