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
      "Hi, I'm Zoe — I'll help you find the right RATIONAL combi oven for your kitchen. You can click through the questions on the left, or just tell me about your kitchen here and I'll get you started. Either way, I'll explain the 'why' behind every recommendation, and you can ask me anything along the way — specs, installation, warranty, whatever you need.",
    options: [
      {
        id: "xs",
        label: "20–80 meals",
        sublabel: "Very tight kitchen, compact batches",
        points: 0,
        gridSize: "XS",
        factBubble: "The iCombi Pro XS is RATIONAL's smallest combi oven, full stop: about 25¾\"W × 24½\"D × 23⅜\"H, around 147 lb, running on just 5.7 kW. It holds six 2/3 GN pans and is electric-only — there's no gas version. It's built for kitchens that genuinely don't have room for a full-size unit, not as a cut-down version of the bigger ones.",
        citation: { label: "RATIONAL iCombi Pro XS Datasheet", url: "https://www.webstaurantstore.com/documents/specsheets/pro_xs.pdf" },
        suggestions: [
          { q: "Why electric only?", a: "There's no gas version of the XS — its small footprint and low power draw are built around the electric-only spec, so gas isn't offered at this size." },
          { q: "What actually fits in it?", a: "Six 2/3 GN pans — smaller than the 1/1 GN pans the rest of the line uses, so check your existing pans fit before committing to this size." },
        ],
      },
      {
        id: "6-1",
        label: "30–100 meals",
        sublabel: "Small kitchen, standard-size pans",
        points: 0,
        gridSize: "6-Grid (1/1 GN)",
        factBubble: "The 6-Grid 1/1 GN is RATIONAL's smallest standard-pan unit: 33½\"W × 33⅛\"D × 31⅝\"H, about 218 lb, running on 10.8 kW. It holds six 1/1 GN pans — the whole cabinet fits on a standard countertop run. The cabinet and capacity are identical whether you end up on Classic or Pro; Pro just adds the touchscreen and automated cooking assistant on top.",
        citation: { label: "RATIONAL iCombi Pro 6-1/1 Datasheet", url: "https://www.webstaurantstore.com/documents/specsheets/pro_6-half.pdf" },
        suggestions: [
          { q: "How much space does this need?", a: "It's the most compact standard-pan size in the line — fits comfortably on a standard countertop run." },
          { q: "Will I outgrow this fast?", a: "Most small kitchens run this size for years — it's sized for steady low volume, not just a starting point." },
        ],
      },
      {
        id: "6-2",
        label: "60–160 meals",
        sublabel: "Small kitchen, bigger batches",
        points: 1,
        gridSize: "6-Grid (2/1 GN)",
        factBubble: "Same 6-pan cabinet family, but built around the wider 2/1 GN pan (roughly double a 1/1 GN pan): 42¼\"W × 38⅜\"D × 29⅝\"H, about 298 lb, running on 22.4 kW. It's a meaningfully bigger, heavier unit than the 1/1 GN version — worth it if your batches genuinely need the larger pan, not just more of them.",
        citation: { label: "RATIONAL iCombi Pro 6-2/1 Datasheet", url: "https://www.webstaurantstore.com/documents/specsheets/pro_6-full.pdf" },
        suggestions: [
          { q: "What's actually different from the 1/1 GN version?", a: "The pan itself — 2/1 GN is roughly double the surface area of 1/1 GN, so the same six-pan count holds a lot more per load, at the cost of a larger, heavier cabinet." },
          { q: "Do I need the bigger pan format?", a: "Only if your batches are genuinely bigger than a 1/1 GN pan comfortably holds — otherwise the 1/1 GN version covers the same meal count in a smaller footprint." },
        ],
      },
      {
        id: "10-1",
        label: "80–150 meals",
        sublabel: "Growing kitchen, standard-size pans",
        points: 1,
        gridSize: "10-Grid (1/1 GN)",
        factBubble: "The 10-Grid 1/1 GN measures 33½\"W × 33⅛\"D × 41⅞\"H, weighs about 287 lb, and runs on 18.9 kW — holding ten 1/1 GN pans. It's the same footprint as the 6-Grid 1/1 GN, just taller, so it's still a straightforward swap-in if you're sizing up later. Cabinet and capacity are identical between Classic and Pro at this size; the difference is entirely in the controls.",
        citation: { label: "RATIONAL iCombi Pro 10-1/1 Datasheet", url: "https://file.hstatic.net/200000788953/file/icombipro_10-half_size_eg_en-us_standard_e53d471a6b884aa2ae0377ceaea56095.pdf" },
        suggestions: [
          { q: "What if I grow beyond this?", a: "This can run two overlapping services a day if needed, and the 20-Grid family uses the same control logic, so retraining is minimal." },
          { q: "Is this enough for a lunch rush?", a: "Yes for most à la carte lunch volumes — it's the same size recommended for standard service, not just steady-state days." },
        ],
      },
      {
        id: "10-2",
        label: "150–300 meals",
        sublabel: "Growing kitchen, bigger batches",
        points: 2,
        gridSize: "10-Grid (2/1 GN)",
        factBubble: "Same 10-pan cabinet family, built around the wider 2/1 GN pan: 42¼\"W × 38⅜\"D × 41⅞\"H, about 381 lb, running on 37.4 kW. It effectively doubles per-load capacity over the 1/1 GN version — some operators run this as 10× 2/1 GN, others load it as 20× 1/1 GN instead.",
        citation: { label: "RATIONAL iCombi Pro 10-2/1 Datasheet", url: "https://www.webstaurantstore.com/documents/specsheets/pro_10-full.pdf" },
        suggestions: [
          { q: "Can I use 1/1 GN pans in this one too?", a: "Yes — it's rated for either ten 2/1 GN pans or twenty 1/1 GN pans, so it flexes to whichever pan format your kitchen already uses." },
          { q: "How does this compare to a 20-Grid?", a: "Meal range overlaps with the 20-Grid 1/1 GN — this one gets there through wider pans instead of more of them, so it's a shorter, wider cabinet rather than a taller one." },
        ],
      },
      {
        id: "20-1",
        label: "150–300 meals",
        sublabel: "Busy kitchen, standard-size pans, high turnover",
        points: 3,
        gridSize: "20-Grid (1/1 GN)",
        factBubble: "The 20-Grid 1/1 GN is 34½\"W × 35⅞\"D × 73¾\"H, around 560 lb, and pulls 37.2 kW — holding twenty 1/1 GN pans on a mobile rack. It's a floor-standing unit only (no countertop mount at this size). Cabinet and capacity are the same between Classic and Pro; Pro's touchscreen and automated cooking assistant are what change.",
        citation: { label: "RATIONAL iCombi Pro 20-1/1 Datasheet", url: "https://cdn.beedash.com/Rational/987b9baeaccba945d161d25270667b610a71be6c.pdf" },
        suggestions: [
          { q: "Is that overkill on quieter days?", a: "No — this runs efficiently at partial load too, so quieter days just mean it's not running at capacity, not wasted." },
          { q: "Why Pro instead of Classic at this volume?", a: "At this turnover, Pro's sensor-adjusted cooking and automated cleaning start paying for themselves in consistency and staff time." },
        ],
      },
      {
        id: "20-2",
        label: "300–500 meals",
        sublabel: "Large-scale operation, bigger batches",
        points: 3,
        gridSize: "20-Grid (2/1 GN)",
        factBubble: "The top of the line: same 20-pan cabinet family, built around the wider 2/1 GN pan — 42⅝\"W × 41⅜\"D × 71⅛\"H, about 717 lb, running on 67.9 kW. Floor-standing only, same as the 1/1 GN version. This is the highest single-cabinet capacity in the range before you're into multi-unit territory.",
        citation: { label: "RATIONAL iCombi Pro 20-2/1 Datasheet", url: "https://www.webstaurantstore.com/documents/specsheets/pro_20-full.pdf" },
        suggestions: [
          { q: "What comes after this if I outgrow it?", a: "This is the largest single cabinet in the line — beyond this, operators add a second unit rather than a bigger single oven." },
          { q: "Does this need a heavier-duty power connection?", a: "Yes — 67.9 kW electric is a serious connected load, so factor that into your installer conversation early." },
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
        factBubble: "Worth being precise here: Rational doesn't actually sell a product called a \"quick-service rack.\" What suits à la carte best in their real lineup is a standard stainless mobile GN rack paired with pull-out rails, which Rational markets specifically for fast loading and unloading during service.",
        citation: { label: "RATIONAL Accessories Catalog (PDF)", url: "https://toolbox.rational-online.com/direct-download/1575782/200140/80.23.271_Brochure_Accessories_LETTER-en_US.pdf" },
        suggestions: [
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
        factBubble: "Rational's real banquet accessory is the Banquet system — a plate-holding rack installed directly in the oven, sized to the unit (up to ~12¼\" plate diameter). Capacity scales with grid size, from around 26 plates on a 10-Grid up to 84–100 plates on a 20-Grid, and it's built for exactly this — holding and reheating banquet-style plated meals at volume.",
        citation: { label: "RATIONAL Accessories Catalog (PDF)", url: "https://toolbox.rational-online.com/direct-download/1575782/200140/80.23.271_Brochure_Accessories_LETTER-en_US.pdf" },
        suggestions: [
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
        factBubble: "This is a real, distinct Rational variant of their mobile oven rack, spaced for bakery-standard 15¾\"×23⅝\" (400×600mm) trays instead of GN pans. It needs a different air baffle in the cooking cabinet than the GN version, which your service partner can supply.",
        citation: { label: "RATIONAL Accessories Catalog (PDF)", url: "https://toolbox.rational-online.com/direct-download/1575782/200140/80.23.271_Brochure_Accessories_LETTER-en_US.pdf" },
        suggestions: [
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
        factBubble: "This is Rational's real, standard mobile oven rack — stainless steel, holds 1/1 GN pans, sheet pans, or smaller containers. It comes in a few rail-spacing options per grid size (fewer, wider-spaced rails for bigger pans; more, closer rails for smaller ones), so it flexes across a mixed menu without needing a specialty rack.",
        citation: { label: "RATIONAL Accessories Catalog (PDF)", url: "https://toolbox.rational-online.com/direct-download/1575782/200140/80.23.271_Brochure_Accessories_LETTER-en_US.pdf" },
        suggestions: [
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
        factBubble: "Rational's real tabletop stand is the Stand II \"MobilityLine\" — screw the oven straight onto it, with side handles and large casters so two people can move the whole thing together. It's only cataloged up to their 10-Grid ovens; 20-Grid units ship on a floor-standing mobile base instead, which is exactly why we cap the size here.",
        citation: { label: "RATIONAL Accessories Catalog (PDF)", url: "https://toolbox.rational-online.com/direct-download/1575782/200140/80.23.271_Brochure_Accessories_LETTER-en_US.pdf" },
        suggestions: [
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
        factBubble: "This is Rational's real caster-equipped stand — stainless steel, with height-adjustable, lockable wheels so you can roll the unit out for deep cleaning or repositioning. It's rated for real load: the equivalent fixed frame carries up to 600 kg, so it's built for the oven's full weight, not just a light base.",
        citation: { label: "RATIONAL Stand II, Angila Catering Equipment", url: "https://angliacateringequipment.com/product/rational-stand-ii-for-icombi-pro-icombi-classic-6-1-1-10-1-1/" },
        suggestions: [
          { q: "Mobile or fixed — does it matter?", a: "Mobile is more flexible day-to-day (easier cleaning access, easier to reposition); fixed is sturdier for a line that never moves. Either handles a 10 or 20-Grid fine." },
          { q: "Do I need extra clearance around the unit?", a: "A little more than countertop installs, mainly so it can be rolled out for deep cleaning if you choose a mobile stand." },
          { q: "Can I reposition it later if my layout changes?", a: "Yes, if you choose the mobile stand — that's exactly what it's designed for." },
          {
            q: "What are the dimensions of this stand?",
            a: "The castor version measures about 34¾\"W × 30″D × 27½\"H (883 × 760 × 699 mm) and weighs around 76 lb (34.4 kg) on its own — rated for up to 600 kg on the equivalent fixed frame, so it's built for the oven's full weight.",
            citation: { label: "RATIONAL Stand II, Angila Catering Equipment", url: "https://angliacateringequipment.com/product/rational-stand-ii-for-icombi-pro-icombi-classic-6-1-1-10-1-1/" },
            // Not shown as a chip — reachable only by typing it, per explicit request. Still
            // findable by the free-text fuzzy matcher since it stays in this array.
            hidden: true,
          },
        ],
      },
      {
        id: "generous",
        label: "Generous / multi-unit line",
        sublabel: "Part of a fixed service line",
        points: 2,
        stand: "Fixed stand",
        factBubble: "Rational's real fixed-mount option is their anchoring / \"MarineLine\" stand — bolted rather than wheeled, built for environments where the unit needs to stay put (their name for it comes from use on ships, where things need to be secured against motion, but it's the same real product used for any permanent built-in line).",
        citation: { label: "RATIONAL Accessories Catalog (PDF)", url: "https://toolbox.rational-online.com/direct-download/1575782/200140/80.23.271_Brochure_Accessories_LETTER-en_US.pdf" },
        suggestions: [
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
            factBubble:
              "Gas draws far less electrical power than electric — about 0.6 kW vs. 10.8 kW at this grid size, since heat comes from the burner rather than electric elements — but the gas unit runs roughly 30 lb heavier and needs its own gas connection (typically 3/4\") alongside a certified gas-safe installer and compliant flue.",
            citation: { label: "RATIONAL iCombi Pro 6-Grid Datasheet", url: "https://www.webstaurantstore.com/documents/specsheets/pro_6-half.pdf" },
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
              { q: "What's left before I get a final quote?", a: "Just the Refine screen to confirm grid size, stand, and rack, then Summary." },
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
