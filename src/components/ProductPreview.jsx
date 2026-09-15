import { motion } from "framer-motion";
import { useAppState, useRecommendation } from "../state/store";
import { PRODUCT_IMAGES, PRODUCT_IMAGE_FALLBACK } from "../assets/images";

export default function ProductPreview({ variant, force }) {
  const state = useAppState();
  const rec = useRecommendation();

  if (!force && !state.productPreviewShown) return null;

  const name = rec.gridSize ? `${rec.line} ${rec.gridSize}` : rec.line;
  const sub = rec.rack || "Rack — pending";
  const image = PRODUCT_IMAGES[rec.gridSize] || PRODUCT_IMAGE_FALLBACK;

  return (
    <motion.div
      className={`product-preview ${variant === "summary" ? "product-preview--summary" : ""}`}
      initial={{ opacity: 0, x: variant === "summary" ? 0 : 24, y: variant === "summary" ? 16 : 0 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="product-picture">
        <img key={image} src={image} alt={name} className="product-img" />
      </div>
      <div className="product-tag">
        <span className="tag-name">{name}</span>
        <span className="tag-sub">{sub}</span>
      </div>
    </motion.div>
  );
}
