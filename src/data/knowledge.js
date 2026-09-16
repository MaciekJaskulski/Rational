// Zoe's "extra knowledge" layer — compare + cited support answers.
// Every citation URL below was actually navigated to and confirmed live by a
// research pass against rational-online.com — never fabricated. Grid specs
// (dimensions/weight/power/capacity) come from RATIONAL's own datasheet PDFs;
// note RATIONAL's datasheets don't state a "meals per day" figure for any
// size, so that number is never claimed as sourced — it stays a UI-only
// label carried over from the rest of this demo.

export const SUPPORT_TOPICS = [
  {
    id: "installation",
    keywords: ["install", "installation", "ventilation", "hookup", "hook up", "site prep", "electrical requirement", "extraction"],
    answer:
      "RATIONAL combi ovens are delivered and installed by certified RATIONAL Service Partners, including a free on-site Unit Introduction so your team is walked through the system before it's used commercially. If you don't have existing extraction, RATIONAL's UltraVent recirculating hoods use condensation technology to trap steam and vapors — no external ductwork required, and retrofitting is always possible.",
    citation: { label: "RATIONAL — Installation & Unit Introduction", url: "https://www.rational-online.com/en_us/customercare/customercareplus/index.php" },
  },
  {
    id: "warranty",
    keywords: ["warranty", "warrant", "guarantee"],
    answer:
      "New RATIONAL units and accessories carry a 2-year manufacturer warranty (12 months on used, demo, or training units sold from RATIONAL's own stock). Registering your device with ConnectedCooking right after installation speeds up any warranty claim.",
    citation: { label: "RATIONAL Manufacturer Warranty Statement", url: "https://www.rational-online.com/en_us/customercare/downloads/manufacturer-warranty-statement/" },
  },
  {
    id: "service",
    keywords: ["service", "maintenance", "connectedcooking", "connected cooking", "care system", "cleaning cycle"],
    answer:
      "Ongoing service runs through RATIONAL's network of 1,200+ certified Service Partners, with 24/7 coverage and re-audited every 18 months. ServicePlus also bundles free software updates, the ConnectedCooking remote-monitoring platform, and ChefLine — RATIONAL chefs on the phone 365 days a year for cooking questions.",
    citation: { label: "RATIONAL Service Partners", url: "https://www.rational-online.com/en_us/customercare/rational-service-partner/" },
  },
  {
    id: "support",
    keywords: ["support", "contact", "help desk", "customer service", "reach rational", "phone number", "chefline"],
    answer:
      "You can reach RATIONAL through ChefLine for cooking/application questions, a dedicated Technical Support form for equipment issues, or a general callback request — RATIONAL Service Partners also guarantee spare-parts supply and emergency coverage after hours and on weekends.",
    citation: { label: "RATIONAL Contact & Technical Support", url: "https://www.rational-online.com/en_us/customercare/contact-us/" },
  },
];

export function matchSupportTopic(text) {
  const lower = text.toLowerCase();
  return SUPPORT_TOPICS.find((t) => t.keywords.some((k) => lower.includes(k))) || null;
}

export function isCompareQuery(text) {
  return /\bcompar/i.test(text);
}

// Real spec-sheet facts (electric versions), 1/1 GN "half size" line — same
// cabinet/body between Pro and Classic at each size, per RATIONAL's PDFs.
export const GRID_FACTS = {
  "6-Grid": { dims: '33½"W × 33⅛"D × 31⅝"H', weight: "218 lb", power: "10.8 kW", pans: "6 × 1/1 GN" },
  "10-Grid": { dims: '33½"W × 33⅛"D × 41⅞"H', weight: "287 lb", power: "18.9 kW", pans: "10 × 1/1 GN" },
  "20-Grid": { dims: '34½"W × 35⅞"D × 73¾"H', weight: "560 lb", power: "37.2 kW", pans: "20 × 1/1 GN, on a mobile rack" },
};

export const PRO_VS_CLASSIC =
  "Classic runs a 4.3\" display with softkeys and a dial — no touchscreen — and stores up to 100 manual cooking programs, with humidity set in 10% steps (ClimaPlus). Pro adds a 10.1\" touchscreen, iCookingSuite's automated cooking-path suggestions, iProductionManager for multi-dish scheduling, and stores up to 1,200 programs. Both clean themselves automatically; Pro adds an optional AutoDose cartridge system on 10-Grid and up. Networking (Ethernet + WiFi) is standard on Pro, optional on Classic.";

const SIZE_ALIASES = [
  { re: /\b6\b|\bsix\b/i, size: "6-Grid" },
  { re: /\b10\b|\bten\b/i, size: "10-Grid" },
  { re: /\b20\b|\btwenty\b/i, size: "20-Grid" },
];

function extractSizes(text) {
  const found = [];
  for (const { re, size } of SIZE_ALIASES) {
    if (re.test(text) && !found.includes(size)) found.push(size);
  }
  return found;
}

// Builds a comparison response. Falls back to Pro vs Classic at the user's
// current grid size when the message doesn't name two specific sizes.
export function buildComparison(text, rec) {
  const sizes = extractSizes(text);
  if (sizes.length >= 2) {
    const [a, b] = sizes;
    const fa = GRID_FACTS[a];
    const fb = GRID_FACTS[b];
    return `${rec.line} ${a} vs ${rec.line} ${b}: the ${a} holds ${fa.pans} (${fa.dims}, ${fa.weight}, ${fa.power}), while the ${b} holds ${fb.pans} (${fb.dims}, ${fb.weight}, ${fb.power}). Same control logic across sizes, so staff don't need retraining if you size up later.`;
  }
  const size = rec.gridSize || "10-Grid";
  return `iCombi Classic vs iCombi Pro at ${size}: ${PRO_VS_CLASSIC} Dimensions, weight, and capacity are identical between the two at this size — it's the same cabinet. Right now you're tracking toward ${rec.line} (score ${rec.score}).`;
}
