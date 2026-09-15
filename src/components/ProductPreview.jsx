import { motion } from "framer-motion";
import { useAppState, useRecommendation } from "../state/store";
import { PRODUCT_IMAGES, PRODUCT_IMAGE_FALLBACK, ACCESSORY_IMAGES, slugify } from "../assets/images";
import { ACCESSORIES_BY_FOCUS } from "../data/accessories";

function getAddonTiles(rec, focusId, accessories) {
  const tiles = [];
  if (rec.rack) tiles.push({ id: "rack", label: rec.rack, slug: slugify(rec.rack) });
  const extra = accessories.length > 0 ? accessories : (ACCESSORIES_BY_FOCUS[focusId] || []).slice(0, 1);
  extra.forEach((a) => {
    const slug = slugify(a.label);
    if (!tiles.find((t) => t.slug === slug)) tiles.push({ id: a.id, label: a.label, slug });
  });
  return tiles.slice(0, 3);
}

export default function ProductPreview({ variant, force }) {
  const state = useAppState();
  const rec = useRecommendation();

  if (!force && !state.productPreviewShown) return null;

  const name = rec.gridSize ? `${rec.line} ${rec.gridSize}` : rec.line;
  const sub = rec.rack || "Rack — pending";
  const image = PRODUCT_IMAGES[rec.gridSize] || PRODUCT_IMAGE_FALLBACK;
  const showAddons = variant !== "summary";
  const addons = showAddons ? getAddonTiles(rec, state.answers.focus, state.accessories) : [];

  return (
    <motion.div
      className={`product-preview ${variant === "summary" ? "product-preview--summary" : ""}`}
      initial={{ opacity: 0, x: variant === "summary" ? 0 : 24, y: variant === "summary" ? 16 : 0 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="product-zone-row">
        <div className="product-col">
          <div className="product-picture">
            <img key={image} src={image} alt={name} className="product-img" />
          </div>
          <div className="product-tag">
            <span className="tag-name">{name}</span>
            <span className="tag-sub">{sub}</span>
          </div>
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
                  <div className="addon-tag">{addon.label}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
