import demoCanvas from "./bg/demo-canvas3.png";
import icombiPro61 from "./products/icombi-pro-6-1.png";
import icombiPro62 from "./products/icombi-pro-6-2.png";
import icombiPro101 from "./products/icombi-pro-10-1.png";
import icombiPro102 from "./products/icombi-pro-10-2.png";
import icombiPro201 from "./products/icombi-pro-20-1.png";
import icombiPro202 from "./products/icombi-pro-20-2.png";
import icombiProXs from "./products/icombi-pro-xs.png";

export const BG_CANVAS = demoCanvas;

// Keyed by the exact gridSize value each Step 1 (Meals & Volume) option
// carries — see src/data/steps.js. "-1"/"-2" in the source filenames are the
// two real GN pan formats (1/1 = half-size, 2/1 = full-size), not two photos
// of the same unit.
export const PRODUCT_IMAGES = {
  XS: icombiProXs,
  "6-Grid (1/1 GN)": icombiPro61,
  "6-Grid (2/1 GN)": icombiPro62,
  "10-Grid (1/1 GN)": icombiPro101,
  "10-Grid (2/1 GN)": icombiPro102,
  "20-Grid (1/1 GN)": icombiPro201,
  "20-Grid (2/1 GN)": icombiPro202,
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
