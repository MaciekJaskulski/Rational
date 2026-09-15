// spec §7.4 — accessory upsell reference, keyed by culinary focus option id
export const ACCESSORIES_BY_FOCUS = {
  ala_carte: [
    { id: "core_probe", label: "Core-temperature probe", detail: "Reads internal temperature directly as it cooks, so your team isn't guessing doneness by touch or by cutting into every steak." },
    { id: "griddle_plate", label: "Griddle / searing plate", detail: "Sits inside the cabinet and gives a hard sear finish — handy for steakhouse-style char without a separate flat-top station." },
  ],
  banqueting: [
    { id: "banquet_rack", label: "Banquet rack", detail: "Holding-optimized rack for large batches — skipped automatically if already selected." },
    { id: "gn_trays", label: "Extra GN trays for batch holding", detail: "More trays on hand for overlapping bulk-holding runs." },
  ],
  baking: [
    { id: "bakery_rack", label: "Bakery rack", detail: "Spaced and coated for baking trays — skipped automatically if already selected." },
    { id: "proofing_pack", label: "Proofing-cycle preset pack", detail: "Low-temperature, high-humidity presets suited to proofing dough." },
  ],
  mixed: [
    { id: "gn_rack", label: "Standard GN rack", detail: "Flexible across formats — skipped automatically if already selected." },
    { id: "water_filter", label: "Water filtration kit", detail: "Protects consistency across varied programs." },
  ],
};

export const UPSELL_INTRO = {
  ala_carte: "a core-temperature probe for consistent doneness, and a griddle/searing plate for a hard sear finish",
  banqueting: "the Banquet rack for holding-at-temperature service, and extra GN trays for batch holding",
  baking: "the Bakery rack for even bake results, and a proofing-cycle preset pack",
  mixed: "the Standard GN rack for flexibility across formats, and a water filtration kit for consistency",
};
