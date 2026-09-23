// XS add-on subflow — "Step 1a/1b/1c". The XS is RATIONAL's smallest combi
// oven and skips three accessories the rest of the line offers: the
// integrated fat drain, an externally attachable core temperature probe, and
// a lockable control panel. Picking XS in Step 1 walks through one real
// guided-selling question per feature (not a chat aside) — Zoe explains the
// feature alongside it, but the question, the "you'd need a bigger size for
// that" advisory, and the final decision all live in the guided flow itself.
//
// Fat-drain unavailability on XS is sourced directly from RATIONAL's own fact
// file; the other two features are flagged from client feedback without a
// public spec citation, so they're phrased without a link.
export const XS_GATE_FAT_DRAIN_CITATION = {
  label: "RATIONAL — Integrated Fat Drain Fact File",
  url: "https://hcms.rational-online.com/hcms/v1.7/entity/brochure/118270/storage/MDExODI3MC8wL3BkZi1wcmV2aWV3LTE1MHBwaS1wcmludHNoZWV0/download/flyer_fact_file_integrated_fat_drain_icombi_-_english_us.pdf",
};

export const XS_GATE_INTRO_TEXT = "That's a great choice for a smaller volume, let's make sure it's suitable.";

// One entry per sub-question, in order — `key` matches the field in
// xsGate.answers. `question`/`yesAdvisory` are guided-flow content (shown on
// the option panel); `zoeText`/`suggestions` are Zoe's chat-only assist.
export const XS_GATE_SUBQUESTIONS = [
  {
    key: "fatDrain",
    stepLabel: "STEP 1a OF 6 — FATTY FOODS",
    shortLabel: "ADD-ONS",
    question: "Do you cook a lot of fatty meats? Chicken, ribs, duck, etc?",
    zoeText:
      "Imagine roasting 20–30 chickens or a large batch of ribs. Fat and cooking juices accumulate during the cooking process. The integrated drain allows them to be removed from the cooking chamber rather than having to deal with them manually.",
    suggestions: ["What if I mostly do vegetables?", "Can I buy it as an add-on later on?"],
    yesAdvisory:
      "This oven doesn't have an integrated fat drain, which is highly useful for large quantities of fatty food, and we advise selecting iCombi 6 1/1 that has that feature.",
    citation: XS_GATE_FAT_DRAIN_CITATION,
  },
  {
    key: "coreProbe",
    stepLabel: "STEP 1b OF 6 — CORE TEMPERATURE",
    shortLabel: "ADD-ONS",
    question: "Do you need to measure the temperature inside the food? (Especially useful for whole chickens, pork, roast beef, etc.)",
    zoeText:
      'The probe measures the temperature inside the food, rather than simply measuring the temperature of the oven chamber. You can tell the oven "Cook it until the core reaches X degrees."',
    suggestions: ["Can I buy it as an add-on later on?", "How's that different to cooking by time?"],
    yesAdvisory:
      "This oven doesn't have an external core probe that gives much more control over the final result if you cook large portions of meat, and we advise selecting iCombi 6 1/1 that has that feature.",
    citation: null,
  },
  {
    key: "lockPanel",
    stepLabel: "STEP 1c OF 6 — PANEL SECURITY",
    shortLabel: "ADD-ONS",
    question: "Will the oven be accessible to people who shouldn't be able to operate it?",
    zoeText: "This is simply a physical/software lock for the control panel.",
    suggestions: ["How do I unlock the panel?", "Is it easy to accidentally change settings on the panel?"],
    yesAdvisory:
      "This oven doesn't have a lockable panel so anyone will be able to change its settings, and we advise selecting iCombi 6 1/1 that has that feature.",
    citation: null,
  },
];

export function xsGateAnyYes(answers) {
  return Object.values(answers).some((v) => v === "yes");
}
