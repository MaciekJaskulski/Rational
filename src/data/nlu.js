// spec §7.2 — slot-inference cheatsheet for free-text intake (Path C). Simple keyword matcher.
export const INFERENCE_CHEATSHEET = [
  {
    cues: ["steakhouse", "steak house"],
    meals: "up_to_30",
    focus: "ala_carte",
    footprint: "compact",
    confidence: "Low–medium",
    businessLabel: "steakhouse",
    reason:
      "Steakhouse kitchens are usually à la carte and compact by nature, and 'small' usually means a modest cover count",
  },
  {
    cues: ["food truck"],
    meals: "up_to_30",
    focus: "ala_carte",
    footprint: "compact",
    confidence: "Medium",
    businessLabel: "food truck",
    reason: "Food trucks run tight, fast-turnaround menus in a very small footprint",
  },
  {
    cues: ["bakery", "pastry shop", "patisserie"],
    meals: "30_80",
    focus: "baking",
    footprint: "standard",
    confidence: "Medium",
    businessLabel: "bakery",
    reason: "Bakeries run steady batch volumes centered on proofing and bake consistency",
  },
  {
    cues: ["banquet hall", "catering company", "catering", "banquet"],
    meals: "80_150",
    focus: "banqueting",
    footprint: "generous",
    confidence: "Medium",
    businessLabel: "banqueting / catering operation",
    reason: "Banquet and catering operations run large batches held at temperature for service",
  },
  {
    cues: ["hotel restaurant", "full-service restaurant", "hotel"],
    meals: "30_80",
    focus: "mixed",
    footprint: "standard",
    confidence: "Low",
    businessLabel: "hotel restaurant",
    reason: "Hotels vary widely, so this is a soft default",
  },
  {
    cues: ["busy diner", "quick-service chain", "diner", "qsr"],
    meals: "80_150",
    focus: "ala_carte",
    footprint: "standard",
    confidence: "Medium",
    businessLabel: "busy diner",
    reason: "Quick-service and diner locations run high turnover on a compact, fast menu",
  },
];

export function inferFromText(text) {
  const lower = text.toLowerCase();
  return INFERENCE_CHEATSHEET.find((row) => row.cues.some((cue) => lower.includes(cue))) || null;
}

// power/ventilation are never inferred; detect only if explicitly stated
export function detectPower(text) {
  const lower = text.toLowerCase();
  if (lower.includes("gas")) return "gas";
  if (lower.includes("electric")) return "electric";
  return null;
}

export function detectVentilation(text) {
  const lower = text.toLowerCase();
  if (lower.includes("already have extraction") || lower.includes("existing extraction")) return "have_extraction";
  if (lower.includes("condensation")) return "condensation";
  if (lower.includes("extraction hood") || lower.includes("full extraction")) return "extraction";
  return null;
}
