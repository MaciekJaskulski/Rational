import { motion } from "framer-motion";
import { useAppState, useRecommendation } from "../state/store";
import { PRODUCT_IMAGES, PRODUCT_IMAGE_FALLBACK, ACCESSORY_IMAGES, slugify } from "../assets/images";

// Only these get a tile — matches the asset set we actually have.
export const ADDON_ALLOWLIST = ["Mobile stand", "Fixed stand", "Standard GN rack", "Banquet rack", "Bakery rack"];

export function getAddonTiles(rec) {
  return [rec.stand, rec.rack]
    .filter((label) => label && ADDON_ALLOWLIST.includes(label))
    .map((label) => ({ id: label, label, slug: slugify(label) }));
}

export default function ProductPreview({ variant, force }) {
  const state = useAppState();
  const rec = useRecommendation();

  if (!force && !state.productPreviewShown) return null;

  const name = rec.gridSize ? `${rec.line} ${rec.gridSize}` : rec.line;
  const sub = rec.rack || "Rack — pending";
  const image = PRODUCT_IMAGES[rec.gridSize] || PRODUCT_IMAGE_FALLBACK;
  const isSummary = variant === "summary";
  const showAddons = variant === "refine" || isSummary;
  const addons = showAddons ? getAddonTiles(rec) : [];

  return (
    <motion.div
      className={`product-preview ${isSummary ? "product-preview--summary" : ""}`}
      initial={{ opacity: 0, x: isSummary ? 0 : 24, y: isSummary ? 16 : 0 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="product-zone-row">
        <div className="product-col">
          <div className="product-picture">
            <img key={image} src={image} alt={name} className="product-img" />
          </div>
          {!isSummary && (
            <div className="product-tag">
              <span className="tag-name">{name}</span>
              <span className="tag-sub">{sub}</span>
            </div>
          )}
        </div>

        {addons.length > 0 && (
          <div className="addons-column">
            {addons.map((addon) => {
              const img = ACCESSORY_IMAGES[addon.slug];
              return (
                <div className="addon-tile" key={addon.id}>
                  <div className="addon-picture">
                    {img ? <img src={img} alt={addon.label} className="addon-img" /> : <div className="addon-placeholder" aria-hidden="true" />}
                  </div>
                  {!isSummary && <div className="addon-tag">{addon.label}</div>}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
