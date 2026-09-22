// XS add-on gate — spec §5.1 extension. The XS is RATIONAL's smallest combi
// oven and skips three accessories the rest of the line offers: the
// integrated fat drain, an externally attachable core temperature probe, and
// a lockable control panel. When a kitchen picks XS in Step 1, this inserts
// a real guided-selling step (not a chat aside) that checks for that need
// before continuing, and offers to step up to a size that has them.
//
// Fat-drain unavailability on XS is sourced directly from RATIONAL's own fact
// file; the other two features are flagged from client feedback without a
// public spec citation, so they're phrased without a link.
export const XS_GATE_CITATION = {
  label: "RATIONAL — Integrated Fat Drain Fact File",
  url: "https://hcms.rational-online.com/hcms/v1.7/entity/brochure/118270/storage/MDExODI3MC8wL3BkZi1wcmV2aWV3LTE1MHBwaS1wcmludHNoZWV0/download/flyer_fact_file_integrated_fat_drain_icombi_-_english_us.pdf",
};

export const XS_GATE_ASK = {
  stepLabel: "STEP 1a OF 6 — ESSENTIAL ADD-ONS",
  shortLabel: "ADD-ONS",
  title: "Will you need any of these on your combi oven?",
  subtitle:
    "The XS is RATIONAL's smallest combi oven, so a few accessories only exist from 6-Grid and up: the integrated fat drain, an externally attachable core temperature probe, and a lockable control panel.",
  options: [
    { id: "no", label: "No — none of these are essential", sublabel: "The compact XS covers what I need" },
    { id: "yes", label: "Yes — I need at least one of these", sublabel: "Show me a size that includes them" },
  ],
};

export const XS_GATE_CHOOSE = {
  stepLabel: "STEP 1a OF 6 — CHOOSE A SIZE",
  shortLabel: "ADD-ONS",
  title: "Which size works instead?",
  subtitle:
    "The integrated fat drain, the externally attachable core probe, and the lockable control panel are all available from 6-Grid and up — pick whichever size fits your volume.",
};

// Highlighted, not enforced — every non-XS size actually carries these
// three, but 6-Grid is the smallest (closest) step up from XS.
export const XS_GATE_SUGGESTED = ["6-Grid (1/1 GN)", "6-Grid (2/1 GN)"];

export const XS_GATE_STAY_TEXT = "Good — sticking with the XS keeps things simple and compact.";
