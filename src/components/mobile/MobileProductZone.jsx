import { useAppState, useRecommendation } from "../../state/store";
import { PRODUCT_IMAGES, PRODUCT_IMAGE_FALLBACK, ACCESSORY_IMAGES } from "../../assets/images";
import { getAddonTiles } from "../ProductPreview";

export default function MobileProductZone() {
  const state = useAppState();
  const rec = useRecommendation();

  if (!state.productPreviewShown) return null;

  const name = rec.gridSize ? `${rec.line} ${rec.gridSize}` : rec.line;
  const sub = rec.rack || "Rack — pending";
  const image = PRODUCT_IMAGES[rec.gridSize] || PRODUCT_IMAGE_FALLBACK;
  const addons = getAddonTiles(rec).slice(0, 2);

  return (
    <div className="m-product-zone">
      <div className="m-product-main">
        <div className="m-product-picture">
          <img key={image} src={image} alt={name} className="m-product-img" />
        </div>
        <div className="m-product-tag">
          <span className="m-tag-name">{name}</span>
          <span className="m-tag-sub">{sub}</span>
        </div>
      </div>
      {addons.length > 0 && (
        <div className="m-addons">
          {addons.map((addon) => {
            const img = ACCESSORY_IMAGES[addon.slug];
            return (
              <div className="m-addon" key={addon.id}>
                <div className="m-addon-picture">
                  {img ? <img src={img} alt={addon.label} className="m-addon-img" /> : <div className="m-addon-placeholder" aria-hidden="true" />}
                </div>
                <div className="m-addon-tag">{addon.label}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
