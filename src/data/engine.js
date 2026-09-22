// Recommendation engine — spec §2. Pure functions, no side effects.
import { STEPS } from "./steps";

const meals = STEPS[0];
const focus = STEPS[1];
const footprint = STEPS[2];

export function findOption(stepKey, optionId) {
  if (!optionId) return null;
  if (stepKey === "power" || stepKey === "ventilation") {
    const sub = STEPS[3].subQuestions.find((s) => s.id === stepKey);
    return sub.options.find((o) => o.id === optionId) || null;
  }
  const step = STEPS.find((s) => s.key === stepKey);
  return step.options.find((o) => o.id === optionId) || null;
}

// answers = { meals: optionId|null, focus: optionId|null, footprint: optionId|null, power: optionId|null, ventilation: optionId|null }
export function computeScore(answers) {
  let score = 0;
  const m = findOption("meals", answers.meals);
  const f = findOption("focus", answers.focus);
  const fp = findOption("footprint", answers.footprint);
  if (m) score += m.points;
  if (f) score += f.points;
  if (fp) score += fp.points;
  return score;
}

export function computeLine() {
  // This demo only has assets and content for iCombi Pro — the Classic-vs-Pro
  // score is kept internally (RefineScreen shows it, and Zoe's knowledge
  // base still answers Classic-vs-Pro questions), but the recommended line
  // itself must never surface "iCombi Classic" since there's no Classic
  // product photo or 3D model to back it up.
  return "iCombi Pro";
}

export function computeGridSize(answers) {
  const m = findOption("meals", answers.meals);
  return m ? m.gridSize : null;
}

export function computeGridNote(answers) {
  const m = findOption("meals", answers.meals);
  return m ? m.gridNote || null : null;
}

export function computeRack(answers) {
  const f = findOption("focus", answers.focus);
  return f ? f.rack : null;
}

export function computeHood(answers) {
  const v = findOption("ventilation", answers.ventilation);
  return v ? v.hood : null;
}

// Returns { stand, forcedMobile, warning }
export function computeStand(answers, gridSizeOverride) {
  const fp = findOption("footprint", answers.footprint);
  if (!fp) return { stand: null, forcedMobile: false, warning: null };
  const gridSize = gridSizeOverride || computeGridSize(answers);
  const gridNumber = gridSize ? parseInt(gridSize, 10) : 0;
  if (fp.stand === "Countertop mount" && gridNumber > 10) {
    return {
      stand: "Mobile stand",
      forcedMobile: true,
      warning:
        "This grid size is floor-standing only — there's no countertop mount at this size.",
    };
  }
  return { stand: fp.stand, forcedMobile: false, warning: null };
}

export function gridSizeOptions() {
  return ["XS", "6-Grid (1/1 GN)", "6-Grid (2/1 GN)", "10-Grid (1/1 GN)", "10-Grid (2/1 GN)", "20-Grid (1/1 GN)", "20-Grid (2/1 GN)"];
}

export function standOptions() {
  return ["Countertop mount", "Mobile stand", "Fixed stand"];
}

export function rackOptions() {
  return ["Quick-service rack", "Banquet rack", "Bakery rack", "Standard GN rack"];
}

export function hoodOptions() {
  return ["None", "Condensation hood", "Extraction hood"];
}

// Full progressive recommendation snapshot, recomputed after every answer.
export function computeRecommendation(answers, overrides = {}) {
  const score = computeScore(answers);
  const line = computeLine(score);
  const gridSize = overrides.gridSize || computeGridSize(answers);
  const gridNote = computeGridNote(answers);
  const rack = overrides.rack || computeRack(answers);
  const hood = overrides.hood || computeHood(answers);
  const standResult = computeStand(answers, gridSize);
  const stand = overrides.stand || standResult.stand;
  const power = answers.power;
  return {
    score,
    line,
    gridSize,
    gridNote,
    rack,
    hood,
    stand,
    standWarning: overrides.stand ? null : standResult.warning,
    power,
  };
}

export function powerSku(answers) {
  const p = findOption("power", answers.power);
  return p ? p.label : null;
}
