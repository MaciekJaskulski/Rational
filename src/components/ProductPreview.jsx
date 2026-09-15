import { motion, AnimatePresence } from "framer-motion";
import { useAppState, useRecommendation } from "../state/store";
import { PRODUCT_IMAGES, PRODUCT_IMAGE_FALLBACK } from "../assets/images";

export default function ProductPreview() {
  const state = useAppState();
  const rec = useRecommendation();

  if (!state.productPreviewShown) return null;

  const name = rec.gridSize ? `${rec.line} ${rec.gridSize}` : rec.line;
  const sub = rec.rack || "Rack — pending";
  const image = PRODUCT_IMAGES[rec.gridSize] || PRODUCT_IMAGE_FALLBACK;

  return (
    <motion.div
      className="product-preview"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="product-picture">
        <AnimatePresence mode="wait">
          <motion.img
            key={image}
            src={image}
            alt={name}
            className="product-img"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25 }}
          />
        </AnimatePresence>
      </div>
      <div className="product-tag">
        <span className="tag-name">{name}</span>
        <span className="tag-sub">{sub}</span>
      </div>
    </motion.div>
  );
}
