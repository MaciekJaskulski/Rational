// Content transcribed from zoe-guided-selling-spec.md §5 (Full Clickable Branching Logic)
// Each step: id, stepLabel, title, subtitle, transition remark (Zoe, on arrival), options[]
// Each option: id, points {meals, focus, footprint}, canvasLabel, factBubble, suggestions[{q,a}]

export const STEPS = [
  {
    id: 1,
    key: "meals",
    stepLabel: "STEP 1 OF 6 — MEALS & VOLUME",
    shortLabel: "MEALS & VOLUME",
    title: "How many meals do you prepare per day?",
    subtitle:
      "This is the single biggest factor in sizing your unit — it sets the grid count we'll recommend.",
    transition:
      "I'll add detail as you go — happy to explain the 'why' behind anything, but feel free to just click through if you already know what you need.",
    options: [
      {
        id: "up_to_30",
        label: "Up to 30 meals",
        sublabel: "Small kitchen, low volume",
        points: 0,
        gridSize: "6-Grid",
        factBubble: "A 6-Grid comfortably covers up to ~30 meals a service with room to spare.",
        suggestions: [
          {
            q: "Tell me more about this model",
            a: "The 6-Grid is RATIONAL's smallest unit in this line: 33½\"W × 33⅛\"D × 31⅝\"H, about 218 lb, running on 10.8 kW. It holds six 1/1 GN pans — the whole cabinet fits on a standard countertop run. The cabinet and capacity are identical whether you end up on Classic or Pro; Pro just adds the touchscreen and automated cooking assistant on top.",
            citation: { label: "RATIONAL iCombi Pro 6-Grid Datasheet", url: "https://www.webstaurantstore.com/documents/specsheets/pro_6-half.pdf" },
          },
          { q: "How much space does a 6-Grid need?", a: "It's the most compact size in the line — fits comfortably on a standard countertop run." },
          { q: "Will I outgrow this fast?", a: "Most small kitchens run a 6-Grid for years — it's sized for steady low volume, not just a starting point." },
          { q: "What's the price difference vs. a bigger unit?", a: "Smaller grids cost meaningfully less up front and use less energy per idle hour — worth it if your volume is genuinely steady." },
        ],
      },
      {
        id: "30_80",
        label: "30–80 meals",
        sublabel: "Standard à la carte service",
        points: 1,
        gridSize: "10-Grid",
        factBubble: "That's a 10-Grid — sized for standard à la carte service without overbuilding your kitchen.",
        suggestions: [
          {
            q: "Tell me more about this model",
            a: "The 10-Grid measures 33½\"W × 33⅛\"D × 41⅞\"H, weighs about 287 lb, and runs on 18.9 kW — holding ten 1/1 GN pans. It's the same footprint as the 6-Grid, just taller, so it's still a straightforward swap-in if you're sizing up later. Cabinet and capacity are identical between Classic and Pro at this size; the difference is entirely in the controls.",
            citation: { label: "RATIONAL iCombi Pro 10-Grid Datasheet", url: "https://file.hstatic.net/200000788953/file/icombipro_10-half_size_eg_en-us_standard_e53d471a6b884aa2ae0377ceaea56095.pdf" },
          },
          { q: "What if I grow beyond this?", a: "A 10-Grid can run two overlapping services a day if needed, and the 20-Grid uses the same control logic, so retraining is minimal." },
          { q: "Is 10-Grid enough for a lunch rush?", a: "Yes for most à la carte lunch volumes — it's the same size recommended for standard service, not just steady-state days." },
          { q: "Can I run breakfast and dinner on one 10-Grid?", a: "Yes — most operators run multiple dayparts on one unit, cleaning between services rather than needing separate ovens." },
        ],
      },
      {
        id: "80_150",
        label: "80–150 meals",
        sublabel: "Busy kitchen, high turnover",
        points: 3,
        gridSize: "20-Grid",
        factBubble: "A 20-Grid handles up to ~180 meals a service without reloading.",
        suggestions: [
          {
            q: "Tell me more about this model",
            a: "The 20-Grid is 34½\"W × 35⅞\"D × 73¾\"H, around 560 lb, and pulls 37.2 kW — holding twenty 1/1 GN pans on a mobile rack. It's a floor-standing unit only (no countertop mount at this size). Cabinet and capacity are the same between Classic and Pro; Pro's touchscreen and automated cooking assistant are what change.",
            citation: { label: "RATIONAL iCombi Pro 20-Grid Datasheet", url: "https://cdn.beedash.com/Rational/987b9baeaccba945d161d25270667b610a71be6c.pdf" },
          },
          { q: "Is that overkill on quieter days?", a: "No — a 20-Grid runs efficiently at partial load too, so quieter days just mean it's not running at capacity, not wasted." },
          { q: "Does a bigger oven cost more to run?", a: "Energy use scales roughly with how full each batch is, not the cabinet size itself, so it doesn't cost much more than a smaller unit run at capacity." },
          { q: "Why Pro instead of Classic at this volume?", a: "At this turnover, Pro's sensor-adjusted cooking and automated cleaning start paying for themselves in consistency and staff time." },
        ],
      },
      {
        id: "150_plus",
        label: "150+ meals",
        sublabel: "Large-scale or multi-unit operation",
        points: 3,
        gridSize: "20-Grid",
        gridNote: "consider a second unit or a multi-unit service line",
        factBubble: "At this volume, most operators run a 20-Grid near capacity or add a second unit for backup.",
        suggestions: [
          {
            q: "Tell me more about this model",
            a: "The 20-Grid is 34½\"W × 35⅞\"D × 73¾\"H, around 560 lb, and pulls 37.2 kW — holding twenty 1/1 GN pans on a mobile rack, floor-standing only. At this volume most operators either run one near capacity or add a second unit as backup; either way, cabinet and capacity are identical between Classic and Pro at this size.",
            citation: { label: "RATIONAL iCombi Pro 20-Grid Datasheet", url: "https://cdn.beedash.com/Rational/987b9baeaccba945d161d25270667b610a71be6c.pdf" },
          },
          { q: "Why would I want two units instead of one bigger one?", a: "20-Grid is currently the largest single-cabinet size in this line — a second unit also gives you a backup if one goes down for cleaning or service." },
          { q: "Can two ovens share the same control settings?", a: "Yes — programs and settings carry over across units in the same line, so staff don't need to relearn anything." },
          { q: "What does a multi-unit installation change?", a: "Mainly utility sizing (power/gas capacity) and floor plan — otherwise each unit installs the same way as a single one." },
        ],
      },
    ],
  },
  {
    id: 2,
    key: "focus",
    stepLabel: "STEP 2 OF 6 — CULINARY FOCUS",
    shortLabel: "CULINARY FOCUS",
    title: "What's your culinary focus?",
    subtitle: "The rack insert and holding behavior we recommend follow directly from how you cook.",
    transition: "Every menu style asks something different of an oven — let's narrow this down.",
    options: [
      {
        id: "ala_carte",
        label: "À la carte & quick service",
        sublabel: "Fast turnaround, small batches",
        points: 0,
        rack: "Quick-service rack",
        factBubble: "À la carte kitchens lean on fast, repeatable results.",
        suggestions: [
          {
            q: "Tell me more about this rack",
            a: "Worth being precise here: Rational doesn't actually sell a product called a \"quick-service rack.\" What suits à la carte best in their real lineup is a standard stainless mobile GN rack paired with pull-out rails, which Rational markets specifically for fast loading and unloading during service.",
            citation: { label: "RATIONAL Accessories Catalog (PDF)", url: "https://toolbox.rational-online.com/direct-download/1575782/200140/80.23.271_Brochure_Accessories_LETTER-en_US.pdf" },
          },
          { q: "Why does that matter for me specifically?", a: "Manual controls can drift slightly with load size, so a busy line may see some inconsistency; sensor-adjusted cooking on Pro corrects automatically so dish 1 and dish 30 come out the same." },
          { q: "Do I need Pro for à la carte?", a: "Not always — it depends more on volume and consistency needs than menu style alone; check what your Meals & Volume answer put you in." },
          { q: "What rack works best for quick service?", a: "The Quick-service rack, which is what we've pre-selected — it's spaced for fast-turnover, smaller-batch cooking." },
        ],
      },
      {
        id: "banqueting",
        label: "Banqueting & bulk cooking",
        sublabel: "Large batches held at temperature",
        points: 2,
        rack: "Banquet rack",
        factBubble: "Bulk cooking benefits most from holding-at-temperature features.",
        suggestions: [
          {
            q: "Tell me more about this rack",
            a: "Rational's real banquet accessory is the Banquet system — a plate-holding rack installed directly in the oven, sized to the unit (up to ~12¼\" plate diameter). Capacity scales with grid size, from around 26 plates on a 10-Grid up to 84–100 plates on a 20-Grid, and it's built for exactly this — holding and reheating banquet-style plated meals at volume.",
            citation: { label: "RATIONAL Accessories Catalog (PDF)", url: "https://toolbox.rational-online.com/direct-download/1575782/200140/80.23.271_Brochure_Accessories_LETTER-en_US.pdf" },
          },
          { q: "What actually breaks if I hold food on Classic instead?", a: "You can hold food on either line, but Pro's climate control keeps humidity more stable over long holds, so food doesn't dry out or overcook at the edges." },
          { q: "How long can food safely hold this way?", a: "That depends on the dish and your local food-safety guidance — Zoe can flag the general holding-temperature ranges but always defer to your local regs." },
          { q: "Does this push me toward the 20-Grid?", a: "It nudges things that way — bulk service usually pairs with larger grids, though your Meals & Volume answer is still the main driver of size." },
        ],
      },
      {
        id: "baking",
        label: "Baking & pastry",
        sublabel: "Even proofing and bake results",
        points: 1,
        rack: "Bakery rack",
        factBubble: "Baking is sensitive to humidity swings — precise climate control keeps proofing and bake results even, batch to batch.",
        suggestions: [
          {
            q: "Tell me more about this rack",
            a: "This is a real, distinct Rational variant of their mobile oven rack, spaced for bakery-standard 15¾\"×23⅝\" (400×600mm) trays instead of GN pans. It needs a different air baffle in the cooking cabinet than the GN version, which your service partner can supply.",
            citation: { label: "RATIONAL Accessories Catalog (PDF)", url: "https://toolbox.rational-online.com/direct-download/1575782/200140/80.23.271_Brochure_Accessories_LETTER-en_US.pdf" },
          },
          { q: "Do I need Pro just for baking?", a: "Not always — small-batch or occasional baking works fine on Classic. It's high-volume or exacting pastry work where Pro's tighter humidity control shows up in the results." },
          { q: "What's different about the Bakery rack?", a: "It's spaced and coated for baking trays rather than gastronorm pans, so bake sheets sit level and airflow stays even." },
          { q: "Can I proof dough in this oven too?", a: "Yes — combi ovens with climate control can hold low-temperature, high-humidity settings suited to proofing, not just baking." },
        ],
      },
      {
        id: "mixed",
        label: "Mixed / full menu",
        sublabel: "A bit of everything",
        points: 1,
        rack: "Standard GN rack",
        factBubble: "Mixed menus usually pair well with the Standard GN rack — flexible across formats.",
        suggestions: [
          {
            q: "Tell me more about this rack",
            a: "This is Rational's real, standard mobile oven rack — stainless steel, holds 1/1 GN pans, sheet pans, or smaller containers. It comes in a few rail-spacing options per grid size (fewer, wider-spaced rails for bigger pans; more, closer rails for smaller ones), so it flexes across a mixed menu without needing a specialty rack.",
            citation: { label: "RATIONAL Accessories Catalog (PDF)", url: "https://toolbox.rational-online.com/direct-download/1575782/200140/80.23.271_Brochure_Accessories_LETTER-en_US.pdf" },
          },
          { q: "What if banqueting becomes a bigger part of my business?", a: "Easy to adjust — you can swap to the Banquet rack later, and if that volume grows, it's worth revisiting whether Pro's holding features make sense." },
          { q: "Can I switch rack types later?", a: "Yes — racks are swappable inserts, not fixed to the cabinet, so switching later is straightforward." },
          { q: "Does mixed menu push me toward Pro or Classic?", a: "On its own, a modest nudge toward Pro (+1 point) — but volume and footprint usually matter more for that call." },
        ],
      },
    ],
  },
  {
    id: 3,
    key: "footprint",
    stepLabel: "STEP 3 OF 6 — SPACE & FOOTPRINT",
    shortLabel: "SPACE & FOOTPRINT",
    title: "What's your kitchen footprint?",
    subtitle: "Where the oven lives determines which stand — and which grid sizes — are actually available to you.",
    transition: "Where the oven lives matters as much as what it cooks.",
    options: [
      {
        id: "compact",
        label: "Compact countertop",
        sublabel: "Limited floor space",
        points: 0,
        stand: "Countertop mount",
        gridCap: 10,
        factBubble: "Countertop keeps your footprint small, but it does cap you around a 6–10-Grid.",
        suggestions: [
          {
            q: "Tell me more about this stand",
            a: "Rational's real tabletop stand is the Stand II \"MobilityLine\" — screw the oven straight onto it, with side handles and large casters so two people can move the whole thing together. It's only cataloged up to their 10-Grid ovens; 20-Grid units ship on a floor-standing mobile base instead, which is exactly why we cap the size here.",
            citation: { label: "RATIONAL Accessories Catalog (PDF)", url: "https://toolbox.rational-online.com/direct-download/1575782/200140/80.23.271_Brochure_Accessories_LETTER-en_US.pdf" },
          },
          { q: "Is a small oven a problem for growth?", a: "Not really — a 6 or 10-Grid covers most independent kitchens comfortably, and the settings carry over if you size up later." },
          { q: "Does countertop limit ventilation options?", a: "It works with any of the three ventilation answers from Step 4 — condensation and full extraction hoods both fit countertop installs." },
          { q: "How much clearance do I need around it?", a: "A bit of side and rear clearance for airflow and service access — your installer will confirm exact figures for your specific model." },
        ],
      },
      {
        id: "standard",
        label: "Standard floor space",
        sublabel: "Room to reposition the unit",
        points: 1,
        stand: "Mobile stand",
        factBubble: "Floor space like this keeps both mobile and fixed stands on the table.",
        suggestions: [
          {
            q: "Tell me more about this stand",
            a: "This is Rational's real caster-equipped stand — stainless steel, with height-adjustable, lockable wheels so you can roll the unit out for deep cleaning or repositioning. It's rated for real load: the equivalent fixed frame carries up to 600 kg, so it's built for the oven's full weight, not just a light base.",
            citation: { label: "RATIONAL Stand II, Angila Catering Equipment", url: "https://angliacateringequipment.com/product/rational-stand-ii-for-icombi-pro-icombi-classic-6-1-1-10-1-1/" },
          },
          { q: "Mobile or fixed — does it matter?", a: "Mobile is more flexible day-to-day (easier cleaning access, easier to reposition); fixed is sturdier for a line that never moves. Either handles a 10 or 20-Grid fine." },
          { q: "Do I need extra clearance around the unit?", a: "A little more than countertop installs, mainly so it can be rolled out for deep cleaning if you choose a mobile stand." },
          { q: "Can I reposition it later if my layout changes?", a: "Yes, if you choose the mobile stand — that's exactly what it's designed for." },
        ],
      },
      {
        id: "generous",
        label: "Generous / multi-unit line",
        sublabel: "Part of a fixed service line",
        points: 2,
        stand: "Fixed stand",
        factBubble: "Generous space and a fixed line usually go together — this also keeps the 20-Grid fully in play with no footprint compromise.",
        suggestions: [
          {
            q: "Tell me more about this stand",
            a: "Rational's real fixed-mount option is their anchoring / \"MarineLine\" stand — bolted rather than wheeled, built for environments where the unit needs to stay put (their name for it comes from use on ships, where things need to be secured against motion, but it's the same real product used for any permanent built-in line).",
            citation: { label: "RATIONAL Accessories Catalog (PDF)", url: "https://toolbox.rational-online.com/direct-download/1575782/200140/80.23.271_Brochure_Accessories_LETTER-en_US.pdf" },
          },
          { q: "Why fixed instead of mobile at this size?", a: "At larger scale, a fixed stand integrates more cleanly into a built service line — matched height, connected utilities — whereas mobile is more flexibility than a permanent line usually needs." },
          { q: "Does this affect my hood choice?", a: "Not directly — hood choice is still driven by your ventilation answer in Step 4, though a full built-in line often pairs with a full extraction hood." },
          { q: "Can I still add another unit later?", a: "Yes — a multi-unit line is designed to be extended; the current recommendation just reflects what you've told us so far." },
        ],
      },
    ],
  },
  {
    id: 4,
    key: "installation",
    stepLabel: "STEP 4 OF 6 — INSTALLATION & OPERATION",
    shortLabel: "INSTALLATION",
    title: "How does this connect to your kitchen?",
    subtitle: "Last piece — power connection and ventilation, so your quote reflects a real install.",
    transition: "Last piece — how this connects to your kitchen's utilities.",
    subQuestions: [
      {
        id: "power",
        label: "Power connection",
        options: [
          {
            id: "electric",
            label: "Electric",
            sublabel: "Standard 3-phase electric supply",
            factBubble: "Electric 3-phase keeps energy costs predictable and is the simpler install of the two — no gas line or flue to certify.",
            suggestions: [
              { q: "Is electric slower to heat than gas?", a: "No — modern electric combi units heat and recover just as fast as gas in practice." },
              { q: "What if I don't have 3-phase power?", a: "That's a conversation for your electrician and installer — it can sometimes be added, but it affects install cost and timeline." },
              { q: "Does electric cost more to run than gas?", a: "It depends on your local utility rates — worth comparing electric vs. gas tariffs for your specific site before deciding." },
            ],
          },
          {
            id: "gas",
            label: "Gas",
            sublabel: "Gas connection with electric ignition",
            factBubble: "Gas units need a certified gas-safe installer and a compliant flue — factor that into your install timeline.",
            suggestions: [
              { q: "Do I need a professional installer for this?", a: "Yes — gas connections and flue work both require certified trades, same as the extraction hood if you need one." },
              { q: "Can I switch to electric to simplify the install?", a: "Yes — electric-only, hoodless installs are the fastest path if timeline matters more than fuel type." },
              { q: "How long does this kind of install usually take?", a: "Longer than an electric-only install, since it depends on scheduling certified gas and ductwork trades — your installer can give you a firm timeline." },
            ],
          },
        ],
      },
      {
        id: "ventilation",
        label: "Ventilation",
        options: [
          {
            id: "have_extraction",
            label: "I already have extraction",
            sublabel: "No hood needed",
            hood: "None",
            factBubble: "Since you've already got extraction, we won't add a hood to the quote — that's a meaningful cost and install-time saving.",
            suggestions: [
              { q: "How do I know my existing extraction is sufficient?", a: "It should match the unit's rated exhaust airflow — your installer can confirm against the spec sheet during a site visit." },
              { q: "What's left before I get a final quote?", a: "Just the Refine & Accessories screen to confirm grid size, stand, and rack, then Summary." },
              { q: "Can I add a hood later if I need one?", a: "Yes, though it's more disruptive once the kitchen is built out — most operators decide on ventilation before installation." },
            ],
          },
          {
            id: "condensation",
            label: "I need a condensation hood",
            sublabel: "Compact, low-airflow kitchens",
            hood: "Condensation hood",
            factBubble: "A condensation hood suits lower-airflow kitchens — smaller footprint and install than a full extraction hood.",
            suggestions: [
              { q: "When is condensation not enough?", a: "If you're doing heavy grilling, searing, or high-smoke cooking alongside the combi oven, you'll likely need full extraction instead." },
              { q: "Is it a DIY install?", a: "No — hood installs still need a qualified installer, just a less involved one than full extraction ductwork." },
              { q: "Does this work with any grid size?", a: "Yes — condensation hoods scale with the unit, so it works whether you land on a 6-Grid or a 20-Grid." },
            ],
          },
          {
            id: "extraction",
            label: "I need a full extraction hood",
            sublabel: "No existing canopy",
            hood: "Extraction hood",
            factBubble: "A full extraction hood is the more involved install, but it's the right call with no existing canopy — factor certified ductwork trades into your timeline.",
            suggestions: [
              { q: "Do I need a professional installer for all of this?", a: "Yes — hood ductwork needs certified trades, same as a gas connection if that's also part of your build." },
              { q: "Can I add this later instead of now?", a: "You can, but it's more disruptive once the kitchen is built out and running — most operators install the hood alongside the oven." },
              { q: "How long does this kind of install usually take?", a: "Plan for it to be the longest lead-time item in your install — your installer can give a firm timeline once they've seen the site." },
            ],
          },
        ],
      },
    ],
  },
];

export const TRANSITIONS_FIRST = STEPS[0].transition;
