import demoCanvas from "./bg/demo-canvas3.png";
import icombiPro6 from "./products/icombi-pro-6-1.png";
import icombiPro10 from "./products/icombi-pro-10-1.png";
import icombiPro20 from "./products/icombi-pro-20-1.png";
import icombiProXs from "./products/icombi-pro-xs.png";

export const BG_CANVAS = demoCanvas;

export const PRODUCT_IMAGES = {
  "6-Grid": icombiPro6,
  "10-Grid": icombiPro10,
  "20-Grid": icombiPro20,
};

export const PRODUCT_IMAGE_FALLBACK = icombiProXs;

// Drop accessory/rack images into ./accessories/ named by slug (lowercase,
// spaces/underscores -> hyphens) and they show up automatically — no code
// change needed. e.g. "Quick-service rack" -> quick-service-rack.png,
// accessory id "core_probe" -> core-probe.png (core_probe.png also matches).
const accessoryFiles = import.meta.glob("./accessories/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
});

export const ACCESSORY_IMAGES = Object.fromEntries(
  Object.entries(accessoryFiles).map(([path, url]) => {
    const filename = path.split("/").pop().replace(/\.(png|jpe?g|webp)$/i, "");
    const slug = filename.toLowerCase().replace(/_/g, "-");
    return [slug, url];
  })
);

export function slugify(label) {
  return label
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
