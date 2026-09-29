// Demo Scenario B's opening — "I have a small diner and I need a new oven".
// Special-cased (not a general rework of the free-text inference system in
// nlu.js): this one exact opener skips product inference entirely and gives
// a two-way shortlist instead, so nothing gets picked until the user asks
// which one fits them. Everything from Step 2 onward is the same Path C
// mechanism already used for every other free-text opener.
import { XS_GATE_FAT_DRAIN_CITATION, XS_GATE_ELECTRIC_ONLY_CITATION } from "./xsGate";

export function isDinerIntroOpener(text) {
  const lower = text.toLowerCase();
  return lower.includes("diner") && lower.includes("small");
}

// Catches the meat question whether it's typed free-text (e.g. "so if I do
// a lot of meat which is a better option?") or tapped as the suggestion
// chip — both route to pickMealsOption via DINERINTRO_PICK_61 / the
// isMeatQuestion branch in START_FREE_TEXT.
export function isMeatQuestion(text) {
  const lower = text.toLowerCase();
  return lower.includes("meat") && (lower.includes("better") || lower.includes("which"));
}

export const DINER_INTRO_SHORTLIST_TEXT =
  "Great, let's pick the perfect oven for you. If you cook less than 100 meals per day, I'd recommend either the iCombi Pro XS or the iCombi Pro 6-Grid 1/1 GN.";

const DINER_INTRO_COMPARE_TEXT =
  "They're closer than you'd think. Both run the same iCombi Pro intelligence — touchscreen controls, the iCookingSuite automated cooking assistant, ConnectedCooking connectivity, and RATIONAL's standard 2-year warranty and service program. Both are also compact, single-column units that sit on a standard countertop, so neither needs a full floor-standing footprint. The key difference: the XS is electric-only, and — unlike the 6-Grid 1/1 GN — it doesn't have the integrated fat drain, an externally attachable core temperature probe, or a lockable control panel. The XS is the smaller, more compact pick; the 6-Grid 1/1 GN is the same footprint family stepped up with those extra features, plus a gas option.";

const DINER_INTRO_COMPARE_FOLLOWUPS = [
  {
    q: "Which one fits a smaller kitchen?",
    a: "Both are compact, single-column units, but the XS is the smallest oven RATIONAL makes — it holds 2/3 GN pans instead of the 1/1 GN pans the rest of the line uses, so it's the pick for genuinely tight spaces.",
  },
  {
    q: "Do I lose anything else by picking the XS?",
    a: "Mainly capacity and those three features — pan size steps down to 2/3 GN, and it's electric-only. Otherwise it runs the same iCombi Pro intelligence as every other size.",
  },
];

const DINER_INTRO_BIGGER_TEXT =
  "If the XS or 6-1/1 feels too small, the next steps up are the 6-Grid 2/1 GN for bigger batches at the same footprint, or the 10-Grid if you're running higher volume — tell me roughly how many meals a day and I can narrow it down.";

export const DINER_INTRO_MEAT_ANSWER_TEXT =
  "For anything that puts off a lot of fat — think ribs, wings, whole chickens — the 6-Grid 1/1 GN pulls ahead thanks to its integrated fat drain, so grease gets carried straight out of the cooking chamber instead of building up.";

export const DINER_INTRO_SUGGESTIONS = [
  {
    q: "Can you compare them?",
    a: DINER_INTRO_COMPARE_TEXT,
    citation: [XS_GATE_ELECTRIC_ONLY_CITATION, XS_GATE_FAT_DRAIN_CITATION],
    suggestions: DINER_INTRO_COMPARE_FOLLOWUPS,
  },
  { q: "Which is better if I do a lot of meat?", a: null, action: "dinerintro:pick61" },
  { q: "Can you suggest something bigger?", a: DINER_INTRO_BIGGER_TEXT },
];
