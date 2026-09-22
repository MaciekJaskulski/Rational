// Flat English → German dictionary. Keys are the EXACT English strings used
// throughout the app's data files (steps.js, knowledge.js, nlu.js, engine.js)
// and components. Product/model names (iCombi Pro/Classic, 6/10/20-Grid) and
// real external document titles (citation.label) are intentionally NOT
// translated — they're proper nouns / real document names either way.
//
// Usage: translate(text, lang) — returns the German string when lang==="de"
// and a translation exists, otherwise returns the original text unchanged
// (safe fallback for anything not yet in the dictionary).

export const DE = {
  // ---- Header / step labels (also doubles as each step's shortLabel) ----
  "MEALS & VOLUME": "MAHLZEITEN & VOLUMEN",
  "CULINARY FOCUS": "KULINARISCHER SCHWERPUNKT",
  "SPACE & FOOTPRINT": "PLATZ & STELLFLÄCHE",
  INSTALLATION: "INSTALLATION",
  REFINE: "VERFEINERN",
  SUMMARY: "ZUSAMMENFASSUNG",
  Restart: "Neu starten",

  // ---- Step 1 — Meals & Volume ----
  "STEP 1 OF 6 — MEALS & VOLUME": "SCHRITT 1 VON 6 — MAHLZEITEN & VOLUMEN",
  "How many meals do you prepare per day?": "Wie viele Mahlzeiten bereiten Sie pro Tag zu?",
  "This is the single biggest factor in sizing your unit — it sets the grid count we'll recommend.":
    "Das ist der wichtigste Faktor bei der Dimensionierung Ihres Geräts — er bestimmt die Rack-Anzahl, die wir empfehlen.",
  "Hi, I'm Zoe — I'll help you find the right RATIONAL combi oven for your kitchen. You can click through the questions on the left, or just tell me about your kitchen here and I'll get you started. Either way, I'll explain the 'why' behind every recommendation, and you can ask me anything along the way — specs, installation, warranty, whatever you need.":
    "Hallo, ich bin Zoe — ich helfe Ihnen, den richtigen RATIONAL Combi-Dämpfer für Ihre Küche zu finden. Sie können sich links durch die Fragen klicken oder mir hier einfach von Ihrer Küche erzählen, dann lege ich direkt los. So oder so erkläre ich Ihnen immer das „Warum“ hinter jeder Empfehlung, und Sie können mich jederzeit alles fragen — Spezifikationen, Installation, Garantie, was auch immer Sie brauchen.",

  "20–80 meals": "20–80 Mahlzeiten",
  "Very tight kitchen, compact batches": "Sehr beengte Küche, kompakte Chargen",
  "The iCombi Pro XS is RATIONAL's smallest combi oven, full stop: about 25¾\"W × 24½\"D × 23⅜\"H, around 147 lb, running on just 5.7 kW. It holds six 2/3 GN pans and is electric-only — there's no gas version. It's built for kitchens that genuinely don't have room for a full-size unit, not as a cut-down version of the bigger ones.":
    "Der iCombi Pro XS ist RATIONALs kleinster Combi-Dämpfer, ganz einfach: etwa 25¾″ B × 24½″ T × 23⅜″ H, rund 147 lb (67 kg), mit nur 5,7 kW Leistung. Er fasst sechs 2/3-GN-Behälter und ist ausschließlich elektrisch — es gibt keine Gasversion. Er ist für Küchen gebaut, die wirklich keinen Platz für ein vollwertiges Gerät haben, nicht als abgespeckte Version der größeren Modelle.",
  "Why electric only?": "Warum nur elektrisch?",
  "There's no gas version of the XS — its small footprint and low power draw are built around the electric-only spec, so gas isn't offered at this size.":
    "Es gibt keine Gasversion des XS — seine geringe Stellfläche und der niedrige Leistungsbedarf sind auf die rein elektrische Ausführung ausgelegt, daher wird Gas bei dieser Größe nicht angeboten.",
  "What actually fits in it?": "Was passt tatsächlich hinein?",
  "Six 2/3 GN pans — smaller than the 1/1 GN pans the rest of the line uses, so check your existing pans fit before committing to this size.":
    "Sechs 2/3-GN-Behälter — kleiner als die 1/1-GN-Behälter, die der Rest der Baureihe verwendet. Prüfen Sie also, ob Ihre vorhandenen Behälter passen, bevor Sie sich für diese Größe entscheiden.",

  "30–100 meals": "30–100 Mahlzeiten",
  "Small kitchen, standard-size pans": "Kleine Küche, Standardgröße Behälter",
  "The 6-Grid 1/1 GN is RATIONAL's smallest standard-pan unit: 33½\"W × 33⅛\"D × 31⅝\"H, about 218 lb, running on 10.8 kW. It holds six 1/1 GN pans — the whole cabinet fits on a standard countertop run. The cabinet and capacity are identical whether you end up on Classic or Pro; Pro just adds the touchscreen and automated cooking assistant on top.":
    "Das 6-Grid 1/1 GN ist RATIONALs kleinstes Gerät mit Standardbehältern: 33½″ B × 33⅛″ T × 31⅝″ H, etwa 218 lb (99 kg), mit 10,8 kW Leistung. Es fasst sechs 1/1-GN-Behälter — das gesamte Gehäuse passt auf eine normale Arbeitsplatte. Gehäuse und Kapazität sind bei Classic und Pro identisch; Pro ergänzt lediglich den Touchscreen und den automatisierten Kochassistenten.",
  "How much space does this need?": "Wie viel Platz benötigt dieses Gerät?",
  "It's the most compact standard-pan size in the line — fits comfortably on a standard countertop run.":
    "Es ist die kompakteste Standardbehälter-Größe der Baureihe — passt problemlos auf eine normale Arbeitsplatte.",
  "Will I outgrow this fast?": "Wachse ich daraus schnell heraus?",
  "Most small kitchens run this size for years — it's sized for steady low volume, not just a starting point.":
    "Die meisten kleinen Küchen nutzen diese Größe jahrelang — sie ist für gleichbleibend geringes Volumen ausgelegt, nicht nur als Einstiegsgröße gedacht.",

  "60–160 meals": "60–160 Mahlzeiten",
  "Small kitchen, bigger batches": "Kleine Küche, größere Chargen",
  "Same 6-pan cabinet family, but built around the wider 2/1 GN pan (roughly double a 1/1 GN pan): 42¼\"W × 38⅜\"D × 29⅝\"H, about 298 lb, running on 22.4 kW. It's a meaningfully bigger, heavier unit than the 1/1 GN version — worth it if your batches genuinely need the larger pan, not just more of them.":
    "Gleiche 6-Behälter-Gerätefamilie, aber um den breiteren 2/1-GN-Behälter herum gebaut (etwa doppelt so groß wie ein 1/1-GN-Behälter): 42¼″ B × 38⅜″ T × 29⅝″ H, etwa 298 lb (135 kg), mit 22,4 kW Leistung. Es ist ein spürbar größeres, schwereres Gerät als die 1/1-GN-Version — lohnt sich, wenn Ihre Chargen wirklich den größeren Behälter brauchen, nicht nur mehr davon.",
  "What's actually different from the 1/1 GN version?": "Was ist tatsächlich anders als bei der 1/1-GN-Version?",
  "The pan itself — 2/1 GN is roughly double the surface area of 1/1 GN, so the same six-pan count holds a lot more per load, at the cost of a larger, heavier cabinet.":
    "Der Behälter selbst — 2/1 GN hat etwa die doppelte Fläche von 1/1 GN, sodass dieselbe Anzahl von sechs Behältern deutlich mehr pro Charge fasst, allerdings bei einem größeren, schwereren Gehäuse.",
  "Do I need the bigger pan format?": "Brauche ich das größere Behälterformat?",
  "Only if your batches are genuinely bigger than a 1/1 GN pan comfortably holds — otherwise the 1/1 GN version covers the same meal count in a smaller footprint.":
    "Nur wenn Ihre Chargen wirklich größer sind, als ein 1/1-GN-Behälter bequem fasst — andernfalls deckt die 1/1-GN-Version dieselbe Mahlzeitenzahl auf kleinerer Stellfläche ab.",

  "80–150 meals": "80–150 Mahlzeiten",
  "Growing kitchen, standard-size pans": "Wachsende Küche, Standardgröße Behälter",
  "The 10-Grid 1/1 GN measures 33½\"W × 33⅛\"D × 41⅞\"H, weighs about 287 lb, and runs on 18.9 kW — holding ten 1/1 GN pans. It's the same footprint as the 6-Grid 1/1 GN, just taller, so it's still a straightforward swap-in if you're sizing up later. Cabinet and capacity are identical between Classic and Pro at this size; the difference is entirely in the controls.":
    "Das 10-Grid 1/1 GN misst 33½″ B × 33⅛″ T × 41⅞″ H, wiegt etwa 287 lb (130 kg) und läuft mit 18,9 kW — es fasst zehn 1/1-GN-Behälter. Die Stellfläche ist identisch mit dem 6-Grid 1/1 GN, nur höher — ein späteres Upsizing ist also problemlos möglich. Gehäuse und Kapazität sind bei Classic und Pro bei dieser Größe identisch; der Unterschied liegt allein in der Steuerung.",
  "What if I grow beyond this?": "Was, wenn ich darüber hinauswachse?",
  "This can run two overlapping services a day if needed, and the 20-Grid family uses the same control logic, so retraining is minimal.":
    "Dieses Gerät kann bei Bedarf zwei überlappende Services pro Tag bewältigen, und die 20-Grid-Familie nutzt die gleiche Bedienlogik — der Schulungsaufwand bleibt also minimal.",
  "Is this enough for a lunch rush?": "Reicht das für den Mittagsansturm?",
  "Yes for most à la carte lunch volumes — it's the same size recommended for standard service, not just steady-state days.":
    "Ja, für die meisten À-la-carte-Mittagsvolumen — diese Größe wird für den Standardbetrieb empfohlen, nicht nur für ruhigere Tage.",

  "150–300 meals": "150–300 Mahlzeiten",
  "Growing kitchen, bigger batches": "Wachsende Küche, größere Chargen",
  "Same 10-pan cabinet family, built around the wider 2/1 GN pan: 42¼\"W × 38⅜\"D × 41⅞\"H, about 381 lb, running on 37.4 kW. It effectively doubles per-load capacity over the 1/1 GN version — some operators run this as 10× 2/1 GN, others load it as 20× 1/1 GN instead.":
    "Gleiche 10-Behälter-Gerätefamilie, um den breiteren 2/1-GN-Behälter herum gebaut: 42¼″ B × 38⅜″ T × 41⅞″ H, etwa 381 lb (173 kg), mit 37,4 kW Leistung. Es verdoppelt effektiv die Kapazität pro Charge gegenüber der 1/1-GN-Version — manche Betriebe fahren es mit 10× 2/1 GN, andere beladen es stattdessen mit 20× 1/1 GN.",
  "Can I use 1/1 GN pans in this one too?": "Kann ich hier auch 1/1-GN-Behälter verwenden?",
  "Yes — it's rated for either ten 2/1 GN pans or twenty 1/1 GN pans, so it flexes to whichever pan format your kitchen already uses.":
    "Ja — es ist für zehn 2/1-GN-Behälter oder zwanzig 1/1-GN-Behälter ausgelegt und passt sich so an das Behälterformat an, das Ihre Küche bereits verwendet.",
  "How does this compare to a 20-Grid?": "Wie schneidet das im Vergleich zu einem 20-Grid ab?",
  "Meal range overlaps with the 20-Grid 1/1 GN — this one gets there through wider pans instead of more of them, so it's a shorter, wider cabinet rather than a taller one.":
    "Der Mahlzeitenbereich überschneidet sich mit dem 20-Grid 1/1 GN — dieses Gerät erreicht das über breitere statt mehr Behälter, also ein kürzeres, breiteres statt ein höheres Gehäuse.",

  "Busy kitchen, standard-size pans, high turnover": "Stark frequentierte Küche, Standardgröße Behälter, hoher Durchsatz",
  "The 20-Grid 1/1 GN is 34½\"W × 35⅞\"D × 73¾\"H, around 560 lb, and pulls 37.2 kW — holding twenty 1/1 GN pans on a mobile rack. It's a floor-standing unit only (no countertop mount at this size). Cabinet and capacity are the same between Classic and Pro; Pro's touchscreen and automated cooking assistant are what change.":
    "Das 20-Grid 1/1 GN ist 34½″ B × 35⅞″ T × 73¾″ H, etwa 560 lb (254 kg) schwer und benötigt 37,2 kW — es fasst zwanzig 1/1-GN-Behälter auf einem fahrbaren Rack. Es ist ausschließlich als Standgerät erhältlich (bei dieser Größe gibt es keine Aufstellung auf der Arbeitsplatte). Gehäuse und Kapazität sind bei Classic und Pro gleich; der Unterschied liegt im Touchscreen und im automatisierten Kochassistenten von Pro.",
  "Is that overkill on quieter days?": "Ist das an ruhigeren Tagen übertrieben?",
  "No — this runs efficiently at partial load too, so quieter days just mean it's not running at capacity, not wasted.":
    "Nein — auch dieses Gerät arbeitet bei Teilbeladung effizient, an ruhigeren Tagen läuft es einfach nicht mit voller Kapazität, ohne dass etwas verschwendet wird.",
  "Why Pro instead of Classic at this volume?": "Warum Pro statt Classic bei diesem Volumen?",
  "At this turnover, Pro's sensor-adjusted cooking and automated cleaning start paying for themselves in consistency and staff time.":
    "Bei diesem Durchsatz zahlen sich Pros sensorgesteuertes Garen und die automatische Reinigung in Konsistenz und Personalzeit aus.",

  "300–500 meals": "300–500 Mahlzeiten",
  "Large-scale operation, bigger batches": "Großbetrieb, größere Chargen",
  "The top of the line: same 20-pan cabinet family, built around the wider 2/1 GN pan — 42⅝\"W × 41⅜\"D × 71⅛\"H, about 717 lb, running on 67.9 kW. Floor-standing only, same as the 1/1 GN version. This is the highest single-cabinet capacity in the range before you're into multi-unit territory.":
    "Die Spitze der Baureihe: gleiche 20-Behälter-Gerätefamilie, um den breiteren 2/1-GN-Behälter herum gebaut — 42⅝″ B × 41⅜″ T × 71⅛″ H, etwa 717 lb (325 kg), mit 67,9 kW Leistung. Ausschließlich als Standgerät, genau wie die 1/1-GN-Version. Das ist die höchste Einzelgerät-Kapazität der Baureihe, bevor es in Richtung Mehrgeräte-Betrieb geht.",
  "What comes after this if I outgrow it?": "Was kommt danach, wenn ich daraus herauswachse?",
  "This is the largest single cabinet in the line — beyond this, operators add a second unit rather than a bigger single oven.":
    "Das ist das größte Einzelgerät der Baureihe — darüber hinaus ergänzen Betriebe ein zweites Gerät, statt einen noch größeren Einzelofen zu wählen.",
  "Does this need a heavier-duty power connection?": "Braucht das einen stärkeren Stromanschluss?",
  "Yes — 67.9 kW electric is a serious connected load, so factor that into your installer conversation early.":
    "Ja — 67,9 kW elektrisch ist eine erhebliche Anschlussleistung, das sollten Sie frühzeitig mit Ihrem Installateur besprechen.",

  // ---- Step 2 — Culinary Focus ----
  "STEP 2 OF 6 — CULINARY FOCUS": "SCHRITT 2 VON 6 — KULINARISCHER SCHWERPUNKT",
  "What's your culinary focus?": "Was ist Ihr kulinarischer Schwerpunkt?",
  "The rack insert and holding behavior we recommend follow directly from how you cook.":
    "Der empfohlene Racktyp und das Warmhalteverhalten ergeben sich direkt daraus, wie Sie kochen.",
  "Every menu style asks something different of an oven — let's narrow this down.":
    "Jeder Menüstil stellt andere Anforderungen an einen Ofen — lassen Sie uns das eingrenzen.",

  "À la carte & quick service": "À la carte & Schnellservice",
  "Fast turnaround, small batches": "Schneller Durchlauf, kleine Chargen",
  "Quick-service rack": "Schnellservice-Rack",
  "Worth being precise here: Rational doesn't actually sell a product called a \"quick-service rack.\" What suits à la carte best in their real lineup is a standard stainless mobile GN rack paired with pull-out rails, which Rational markets specifically for fast loading and unloading during service.":
    "Hier lohnt sich Genauigkeit: RATIONAL verkauft kein Produkt, das offiziell „Schnellservice-Rack“ heißt. Am besten zu À la carte passt im echten Sortiment ein Standard-Edelstahl-Mobilrack mit Auszugsschienen, das RATIONAL gezielt für schnelles Be- und Entladen während des Service anbietet.",
  "Why does that matter for me specifically?": "Warum ist das speziell für mich wichtig?",
  "Manual controls can drift slightly with load size, so a busy line may see some inconsistency; sensor-adjusted cooking on Pro corrects automatically so dish 1 and dish 30 come out the same.":
    "Manuelle Steuerungen können je nach Beladung leicht schwanken, sodass es bei starkem Andrang zu Unstimmigkeiten kommen kann; das sensorgesteuerte Garen von Pro gleicht das automatisch aus, damit Gericht 1 und Gericht 30 gleich gut gelingen.",
  "Do I need Pro for à la carte?": "Brauche ich Pro für À la carte?",
  "Not always — it depends more on volume and consistency needs than menu style alone; check what your Meals & Volume answer put you in.":
    "Nicht immer — das hängt mehr vom Volumen und den Konsistenzanforderungen ab als vom Menüstil allein; schauen Sie, wohin Sie Ihre Antwort bei Mahlzeiten & Volumen eingeordnet hat.",
  "What rack works best for quick service?": "Welches Rack eignet sich am besten für den Schnellservice?",
  "The Quick-service rack, which is what we've pre-selected — it's spaced for fast-turnover, smaller-batch cooking.":
    "Das Schnellservice-Rack, das wir bereits vorausgewählt haben — sein Schienenabstand ist auf schnellen Durchlauf und kleinere Chargen ausgelegt.",

  "Banqueting & bulk cooking": "Bankett & Großmengenkochen",
  "Large batches held at temperature": "Große Chargen, warmgehalten",
  "Banquet rack": "Bankett-Rack",
  "Rational's real banquet accessory is the Banquet system — a plate-holding rack installed directly in the oven, sized to the unit (up to ~12¼\" plate diameter). Capacity scales with grid size, from around 26 plates on a 10-Grid up to 84–100 plates on a 20-Grid, and it's built for exactly this — holding and reheating banquet-style plated meals at volume.":
    "RATIONALs echtes Bankett-Zubehör ist das Bankettsystem — ein Teller-Warmhalterack, das direkt im Gerät installiert wird und auf das Gerät abgestimmt ist (bis zu ca. 12¼″ Tellerdurchmesser). Die Kapazität skaliert mit der Gerätegröße, von etwa 26 Tellern bei einem 10-Grid bis zu 84–100 Tellern bei einem 20-Grid — genau dafür konzipiert: Warmhalten und Regenerieren angerichteter Bankettteller in großer Menge.",
  "What actually breaks if I hold food on Classic instead?": "Was geht tatsächlich schief, wenn ich Speisen stattdessen auf Classic warmhalte?",
  "You can hold food on either line, but Pro's climate control keeps humidity more stable over long holds, so food doesn't dry out or overcook at the edges.":
    "Sie können Speisen auf beiden Baureihen warmhalten, aber Pros Klimasteuerung hält die Feuchtigkeit über lange Warmhaltezeiten stabiler, sodass Speisen nicht austrocknen oder an den Rändern übergaren.",
  "How long can food safely hold this way?": "Wie lange lassen sich Speisen so sicher warmhalten?",
  "That depends on the dish and your local food-safety guidance — Zoe can flag the general holding-temperature ranges but always defer to your local regs.":
    "Das hängt vom Gericht und Ihren lokalen Lebensmittelsicherheitsvorschriften ab — Zoe kann allgemeine Warmhaltetemperaturbereiche nennen, maßgeblich sind aber immer Ihre örtlichen Vorschriften.",
  "Does this push me toward the 20-Grid?": "Tendiere ich dadurch eher zum 20-Grid?",
  "It nudges things that way — bulk service usually pairs with larger grids, though your Meals & Volume answer is still the main driver of size.":
    "Das spricht in diese Richtung — Großmengenservice geht meist mit größeren Geräten einher, wobei Ihre Antwort bei Mahlzeiten & Volumen weiterhin der Hauptfaktor für die Größe ist.",

  "Baking & pastry": "Backen & Patisserie",
  "Even proofing and bake results": "Gleichmäßiges Gären und Backergebnisse",
  "Bakery rack": "Bäckerei-Rack",
  "This is a real, distinct Rational variant of their mobile oven rack, spaced for bakery-standard 15¾\"×23⅝\" (400×600mm) trays instead of GN pans. It needs a different air baffle in the cooking cabinet than the GN version, which your service partner can supply.":
    "Dies ist eine reale, eigenständige RATIONAL-Variante des mobilen Ofenracks, mit einem Schienenabstand für bäckereiübliche 15¾″×23⅝″ (400×600 mm) Bleche statt GN-Behälter. Es benötigt ein anderes Luftleitblech im Garraum als die GN-Version, das Ihr Servicepartner liefern kann.",
  "Do I need Pro just for baking?": "Brauche ich Pro nur zum Backen?",
  "Not always — small-batch or occasional baking works fine on Classic. It's high-volume or exacting pastry work where Pro's tighter humidity control shows up in the results.":
    "Nicht immer — kleine Mengen oder gelegentliches Backen funktionieren gut auf Classic. Bei hohem Volumen oder anspruchsvoller Patisserie zeigt sich Pros präzisere Feuchtigkeitssteuerung im Ergebnis.",
  "What's different about the Bakery rack?": "Was ist am Bäckerei-Rack anders?",
  "It's spaced and coated for baking trays rather than gastronorm pans, so bake sheets sit level and airflow stays even.":
    "Es ist im Abstand und der Beschichtung auf Backbleche statt Gastronorm-Behälter ausgelegt, sodass Bleche eben liegen und die Luftzirkulation gleichmäßig bleibt.",
  "Can I proof dough in this oven too?": "Kann ich in diesem Gerät auch Teig gehen lassen?",
  "Yes — combi ovens with climate control can hold low-temperature, high-humidity settings suited to proofing, not just baking.":
    "Ja — Combi-Dämpfer mit Klimasteuerung können niedrige Temperaturen bei hoher Feuchtigkeit halten, die sich fürs Gären eignen, nicht nur zum Backen.",

  "Mixed / full menu": "Gemischt / volles Menü",
  "A bit of everything": "Ein bisschen von allem",
  "Standard GN rack": "Standard-GN-Rack",
  "This is Rational's real, standard mobile oven rack — stainless steel, holds 1/1 GN pans, sheet pans, or smaller containers. It comes in a few rail-spacing options per grid size (fewer, wider-spaced rails for bigger pans; more, closer rails for smaller ones), so it flexes across a mixed menu without needing a specialty rack.":
    "Dies ist RATIONALs reales Standard-Mobilrack — Edelstahl, für 1/1 GN-Behälter, Backbleche oder kleinere Behälter geeignet. Es gibt je Gerätegröße mehrere Schienenabstände (weniger, weiter auseinanderliegende Schienen für größere Behälter; mehr, engere Schienen für kleinere) — so passt es sich einem gemischten Menü an, ohne ein Spezialrack zu benötigen.",
  "What if banqueting becomes a bigger part of my business?": "Was, wenn Bankett ein größerer Teil meines Geschäfts wird?",
  "Easy to adjust — you can swap to the Banquet rack later, and if that volume grows, it's worth revisiting whether Pro's holding features make sense.":
    "Leicht anzupassen — Sie können später auf das Bankett-Rack wechseln, und wenn dieses Volumen wächst, lohnt sich ein erneuter Blick darauf, ob Pros Warmhaltefunktionen sinnvoll sind.",
  "Can I switch rack types later?": "Kann ich den Racktyp später wechseln?",
  "Yes — racks are swappable inserts, not fixed to the cabinet, so switching later is straightforward.":
    "Ja — Racks sind austauschbare Einsätze und nicht fest mit dem Gehäuse verbunden, ein späterer Wechsel ist also unkompliziert.",
  "Does mixed menu push me toward Pro or Classic?": "Tendiert ein gemischtes Menü eher zu Pro oder Classic?",
  "On its own, a modest nudge toward Pro (+1 point) — but volume and footprint usually matter more for that call.":
    "Für sich genommen ein leichter Ausschlag Richtung Pro (+1 Punkt) — aber Volumen und Stellfläche sind für diese Entscheidung meist wichtiger.",

  // ---- Step 3 — Space & Footprint ----
  "STEP 3 OF 6 — SPACE & FOOTPRINT": "SCHRITT 3 VON 6 — PLATZ & STELLFLÄCHE",
  "What's your kitchen footprint?": "Wie sieht die Stellfläche in Ihrer Küche aus?",
  "Where the oven lives determines which stand — and which grid sizes — are actually available to you.":
    "Wo das Gerät steht, bestimmt, welches Untergestell — und welche Gerätegrößen — für Sie überhaupt infrage kommen.",
  "Where the oven lives matters as much as what it cooks.": "Wo der Ofen steht, ist genauso wichtig wie das, was er kocht.",

  "Compact countertop": "Kompakte Arbeitsplatte",
  "Limited floor space": "Begrenzte Stellfläche",
  "Countertop mount": "Arbeitsplatten-Montage",
  "Rational's real tabletop stand is the Stand II \"MobilityLine\" — screw the oven straight onto it, with side handles and large casters so two people can move the whole thing together. It's only cataloged up to their 10-Grid ovens; 20-Grid units ship on a floor-standing mobile base instead, which is exactly why we cap the size here.":
    "RATIONALs reales Tischuntergestell ist das Stand II „MobilityLine“ — der Ofen wird direkt darauf verschraubt, mit Seitengriffen und großen Rollen, sodass zwei Personen das Ganze gemeinsam bewegen können. Es ist nur bis zum 10-Grid-Gerät gelistet; 20-Grid-Geräte werden stattdessen mit einem fahrbaren Standfuß ausgeliefert — genau deshalb begrenzen wir die Größe hier.",
  "Is a small oven a problem for growth?": "Ist ein kleines Gerät ein Problem fürs Wachstum?",
  "Not really — a 6 or 10-Grid covers most independent kitchens comfortably, and the settings carry over if you size up later.":
    "Eigentlich nicht — ein 6- oder 10-Grid deckt die meisten unabhängigen Küchen problemlos ab, und die Einstellungen lassen sich übernehmen, falls Sie später aufstocken.",
  "Does countertop limit ventilation options?": "Schränkt die Arbeitsplatten-Montage die Lüftungsoptionen ein?",
  "It works with any of the three ventilation answers from Step 4 — condensation and full extraction hoods both fit countertop installs.":
    "Sie funktioniert mit allen drei Lüftungsantworten aus Schritt 4 — sowohl Kondensations- als auch Vollabzugshauben passen zu Arbeitsplatten-Installationen.",
  "How much clearance do I need around it?": "Wie viel Abstand benötige ich rundherum?",
  "A bit of side and rear clearance for airflow and service access — your installer will confirm exact figures for your specific model.":
    "Etwas seitlichen und rückseitigen Abstand für Luftzirkulation und Servicezugang — Ihr Installateur bestätigt die genauen Maße für Ihr konkretes Modell.",

  "Standard floor space": "Standard-Stellfläche",
  "Room to reposition the unit": "Platz, um das Gerät zu versetzen",
  "Mobile stand": "Fahrbares Untergestell",
  "This is Rational's real caster-equipped stand — stainless steel, with height-adjustable, lockable wheels so you can roll the unit out for deep cleaning or repositioning. It's rated for real load: the equivalent fixed frame carries up to 600 kg, so it's built for the oven's full weight, not just a light base.":
    "Dies ist RATIONALs reales Untergestell mit Rollen — Edelstahl, mit höhenverstellbaren, feststellbaren Rollen, damit Sie das Gerät zur Grundreinigung oder zum Umstellen herausrollen können. Es ist für echte Lasten ausgelegt: Das entsprechende feste Gestell trägt bis zu 600 kg — es ist also für das volle Gewicht des Ofens gebaut, nicht nur für ein leichtes Fundament.",
  "Mobile or fixed — does it matter?": "Fahrbar oder fest — macht das einen Unterschied?",
  "Mobile is more flexible day-to-day (easier cleaning access, easier to reposition); fixed is sturdier for a line that never moves. Either handles a 10 or 20-Grid fine.":
    "Fahrbar ist im Alltag flexibler (leichterer Reinigungszugang, leichter zu versetzen); fest ist stabiler für eine Linie, die sich nie bewegt. Beide eignen sich gut für ein 10- oder 20-Grid.",
  "Do I need extra clearance around the unit?": "Brauche ich zusätzlichen Abstand rund um das Gerät?",
  "A little more than countertop installs, mainly so it can be rolled out for deep cleaning if you choose a mobile stand.":
    "Etwas mehr als bei Arbeitsplatten-Installationen, hauptsächlich damit es beim fahrbaren Untergestell zur Grundreinigung herausgerollt werden kann.",
  "Can I reposition it later if my layout changes?": "Kann ich es später versetzen, wenn sich mein Layout ändert?",
  "Yes, if you choose the mobile stand — that's exactly what it's designed for.":
    "Ja, wenn Sie das fahrbare Untergestell wählen — genau dafür ist es gemacht.",
  "What are the dimensions of this stand?": "Welche Maße hat dieses Untergestell?",
  "The castor version measures about 34¾\"W × 30″D × 27½\"H (883 × 760 × 699 mm) and weighs around 76 lb (34.4 kg) on its own — rated for up to 600 kg on the equivalent fixed frame, so it's built for the oven's full weight.":
    "Die Version mit Rollen misst etwa 34¾″ B × 30″ T × 27½″ H (883 × 760 × 699 mm) und wiegt allein rund 76 lb (34,4 kg) — ausgelegt für bis zu 600 kg beim entsprechenden festen Gestell, also für das volle Gewicht des Ofens gebaut.",

  "Generous / multi-unit line": "Großzügig / Mehrgeräte-Linie",
  "Part of a fixed service line": "Teil einer festen Servicelinie",
  "Fixed stand": "Festes Untergestell",
  "Rational's real fixed-mount option is their anchoring / \"MarineLine\" stand — bolted rather than wheeled, built for environments where the unit needs to stay put (their name for it comes from use on ships, where things need to be secured against motion, but it's the same real product used for any permanent built-in line).":
    "RATIONALs reale Festmontage-Option ist das Verankerungs- bzw. „MarineLine“-Untergestell — verschraubt statt fahrbar, gebaut für Umgebungen, in denen das Gerät fest stehen bleiben muss (der Name stammt vom Einsatz auf Schiffen, wo Dinge gegen Bewegung gesichert werden müssen — es ist aber dasselbe reale Produkt, das für jede dauerhaft eingebaute Linie verwendet wird).",
  "Why fixed instead of mobile at this size?": "Warum fest statt fahrbar bei dieser Größe?",
  "At larger scale, a fixed stand integrates more cleanly into a built service line — matched height, connected utilities — whereas mobile is more flexibility than a permanent line usually needs.":
    "In größerem Maßstab lässt sich ein festes Untergestell sauberer in eine feste Servicelinie integrieren — passende Höhe, angeschlossene Versorgung — während fahrbar mehr Flexibilität bietet, als eine dauerhafte Linie meist braucht.",
  "Does this affect my hood choice?": "Beeinflusst das meine Haubenwahl?",
  "Not directly — hood choice is still driven by your ventilation answer in Step 4, though a full built-in line often pairs with a full extraction hood.":
    "Nicht direkt — die Haubenwahl richtet sich weiterhin nach Ihrer Lüftungsantwort in Schritt 4, wobei eine vollständig eingebaute Linie oft mit einer Vollabzugshaube kombiniert wird.",
  "Can I still add another unit later?": "Kann ich später noch ein weiteres Gerät hinzufügen?",
  "Yes — a multi-unit line is designed to be extended; the current recommendation just reflects what you've told us so far.":
    "Ja — eine Mehrgeräte-Linie ist auf Erweiterung ausgelegt; die aktuelle Empfehlung spiegelt nur das wider, was Sie uns bisher mitgeteilt haben.",

  // ---- Step 4 — Installation & Operation ----
  "STEP 4 OF 6 — INSTALLATION & OPERATION": "SCHRITT 4 VON 6 — INSTALLATION & BETRIEB",
  "How does this connect to your kitchen?": "Wie wird das Gerät an Ihre Küche angeschlossen?",
  "Last piece — power connection and ventilation, so your quote reflects a real install.":
    "Letzter Baustein — Stromanschluss und Lüftung, damit Ihr Angebot eine reale Installation abbildet.",
  "Last piece — how this connects to your kitchen's utilities.": "Letzter Baustein — wie das Gerät an die Versorgung Ihrer Küche angeschlossen wird.",

  "Power connection": "Stromanschluss",
  Electric: "Elektrisch",
  "Standard 3-phase electric supply": "Standard-Drehstromanschluss",
  "Electric 3-phase keeps energy costs predictable and is the simpler install of the two — no gas line or flue to certify.":
    "Elektrischer Drehstrom hält die Energiekosten planbar und ist die einfachere der beiden Installationen — keine Gasleitung oder Abgasanlage muss abgenommen werden.",
  "Is electric slower to heat than gas?": "Heizt Elektro langsamer auf als Gas?",
  "No — modern electric combi units heat and recover just as fast as gas in practice.":
    "Nein — moderne elektrische Combi-Dämpfer heizen und regenerieren in der Praxis genauso schnell wie Gasgeräte.",
  "What if I don't have 3-phase power?": "Was, wenn ich keinen Drehstromanschluss habe?",
  "That's a conversation for your electrician and installer — it can sometimes be added, but it affects install cost and timeline.":
    "Das besprechen Sie am besten mit Ihrem Elektriker und Installateur — er kann manchmal nachgerüstet werden, beeinflusst aber Installationskosten und Zeitplan.",
  "Does electric cost more to run than gas?": "Kostet Elektro im Betrieb mehr als Gas?",
  "It depends on your local utility rates — worth comparing electric vs. gas tariffs for your specific site before deciding.":
    "Das hängt von Ihren lokalen Energiepreisen ab — vergleichen Sie vor der Entscheidung am besten Strom- und Gastarife für Ihren konkreten Standort.",

  Gas: "Gas",
  "Gas connection with electric ignition": "Gasanschluss mit elektrischer Zündung",
  "Gas draws far less electrical power than electric — about 0.6 kW vs. 10.8 kW at this grid size, since heat comes from the burner rather than electric elements — but the gas unit runs roughly 30 lb heavier and needs its own gas connection (typically 3/4\") alongside a certified gas-safe installer and compliant flue.":
    "Gas benötigt deutlich weniger elektrische Leistung als Elektro — etwa 0,6 kW gegenüber 10,8 kW bei dieser Gerätegröße, da die Wärme vom Brenner statt von elektrischen Heizelementen kommt — das Gasgerät ist jedoch rund 30 lb (14 kg) schwerer und braucht einen eigenen Gasanschluss (typischerweise ¾″) sowie einen zertifizierten Gas-Installateur und eine vorschriftsmäßige Abgasanlage.",
  "Do I need a professional installer for this?": "Brauche ich dafür einen Fachinstallateur?",
  "Yes — gas connections and flue work both require certified trades, same as the extraction hood if you need one.":
    "Ja — Gasanschlüsse und Abgasarbeiten erfordern beide zertifizierte Fachbetriebe, ebenso wie die Abzugshaube, falls Sie eine benötigen.",
  "Can I switch to electric to simplify the install?": "Kann ich zu Elektro wechseln, um die Installation zu vereinfachen?",
  "Yes — electric-only, hoodless installs are the fastest path if timeline matters more than fuel type.":
    "Ja — eine reine Elektro-Installation ohne Haube ist der schnellste Weg, wenn der Zeitplan wichtiger ist als die Energieart.",
  "How long does this kind of install usually take?": "Wie lange dauert eine solche Installation üblicherweise?",
  "Longer than an electric-only install, since it depends on scheduling certified gas and ductwork trades — your installer can give you a firm timeline.":
    "Länger als eine reine Elektro-Installation, da die Terminierung zertifizierter Gas- und Lüftungsbaufirmen eine Rolle spielt — Ihr Installateur kann Ihnen einen verbindlichen Zeitplan nennen.",

  Ventilation: "Lüftung",
  "I already have extraction": "Ich habe bereits eine Absaugung",
  "No hood needed": "Keine Haube nötig",
  None: "Keine",
  "Since you've already got extraction, we won't add a hood to the quote — that's a meaningful cost and install-time saving.":
    "Da Sie bereits über eine Absaugung verfügen, nehmen wir keine Haube ins Angebot auf — das spart spürbar Kosten und Installationszeit.",
  "How do I know my existing extraction is sufficient?": "Woher weiß ich, ob meine bestehende Absaugung ausreicht?",
  "It should match the unit's rated exhaust airflow — your installer can confirm against the spec sheet during a site visit.":
    "Sie sollte dem angegebenen Abluftvolumen des Geräts entsprechen — Ihr Installateur kann das bei einem Vor-Ort-Termin anhand des Datenblatts prüfen.",
  "What's left before I get a final quote?": "Was fehlt noch bis zum finalen Angebot?",
  "Just the Refine screen to confirm grid size, stand, and rack, then Summary.":
    "Nur noch der Feinabstimmungs-Bildschirm zur Bestätigung von Gerätegröße, Untergestell und Rack, dann die Zusammenfassung.",
  "Can I add a hood later if I need one?": "Kann ich später eine Haube ergänzen, falls nötig?",
  "Yes, though it's more disruptive once the kitchen is built out — most operators decide on ventilation before installation.":
    "Ja, allerdings ist das aufwendiger, sobald die Küche fertig eingerichtet ist — die meisten Betriebe entscheiden sich vor der Installation für eine Lüftungslösung.",

  "I need a condensation hood": "Ich brauche eine Kondensationshaube",
  "Compact, low-airflow kitchens": "Kompakte Küchen mit geringem Luftbedarf",
  "Condensation hood": "Kondensationshaube",
  "A condensation hood suits lower-airflow kitchens — smaller footprint and install than a full extraction hood.":
    "Eine Kondensationshaube eignet sich für Küchen mit geringerem Luftbedarf — kleinere Stellfläche und einfachere Installation als eine Vollabzugshaube.",
  "When is condensation not enough?": "Wann reicht eine Kondensationshaube nicht aus?",
  "If you're doing heavy grilling, searing, or high-smoke cooking alongside the combi oven, you'll likely need full extraction instead.":
    "Wenn Sie neben dem Combi-Dämpfer stark grillen, scharf anbraten oder stark rauchende Zubereitungen durchführen, benötigen Sie wahrscheinlich stattdessen einen Vollabzug.",
  "Is it a DIY install?": "Ist das eine Selbstinstallation?",
  "No — hood installs still need a qualified installer, just a less involved one than full extraction ductwork.":
    "Nein — auch Haubeninstallationen brauchen einen qualifizierten Installateur, nur einen weniger aufwendigen als bei einer vollständigen Abluftanlage.",
  "Does this work with any grid size?": "Funktioniert das mit jeder Gerätegröße?",
  "Yes — condensation hoods scale with the unit, so it works whether you land on a 6-Grid or a 20-Grid.":
    "Ja — Kondensationshauben skalieren mit dem Gerät, egal ob Sie bei einem 6-Grid oder einem 20-Grid landen.",

  "I need a full extraction hood": "Ich brauche eine Vollabzugshaube",
  "No existing canopy": "Keine vorhandene Haube",
  "Extraction hood": "Abzugshaube",
  "A full extraction hood is the more involved install, but it's the right call with no existing canopy — factor certified ductwork trades into your timeline.":
    "Eine Vollabzugshaube ist die aufwendigere Installation, aber bei fehlender vorhandener Haube die richtige Wahl — planen Sie zertifizierte Lüftungsbaufirmen in Ihren Zeitplan ein.",
  "Do I need a professional installer for all of this?": "Brauche ich dafür einen Fachinstallateur?",
  "Yes — hood ductwork needs certified trades, same as a gas connection if that's also part of your build.":
    "Ja — die Lüftungskanäle der Haube erfordern zertifizierte Fachbetriebe, ebenso wie ein Gasanschluss, falls dieser ebenfalls Teil Ihres Projekts ist.",
  "Can I add this later instead of now?": "Kann ich das auch später statt jetzt ergänzen?",
  "You can, but it's more disruptive once the kitchen is built out and running — most operators install the hood alongside the oven.":
    "Das ist möglich, aber aufwendiger, sobald die Küche fertig eingerichtet ist und läuft — die meisten Betriebe installieren die Haube zusammen mit dem Ofen.",
  "Plan for it to be the longest lead-time item in your install — your installer can give a firm timeline once they've seen the site.":
    "Planen Sie damit, dass dies der Posten mit der längsten Vorlaufzeit in Ihrer Installation ist — Ihr Installateur kann nach einer Besichtigung einen verbindlichen Zeitplan nennen.",

  // ---- knowledge.js — support topics & Pro vs Classic ----
  "How does installation work?": "Wie läuft die Installation ab?",
  "RATIONAL combi ovens are delivered and installed by certified RATIONAL Service Partners, including a free on-site Unit Introduction so your team is walked through the system before it's used commercially. If you don't have existing extraction, RATIONAL's UltraVent recirculating hoods use condensation technology to trap steam and vapors — no external ductwork required, and retrofitting is always possible.":
    "RATIONAL Combi-Dämpfer werden von zertifizierten RATIONAL Servicepartnern geliefert und installiert, inklusive einer kostenlosen Geräteeinweisung vor Ort, damit Ihr Team mit dem System vertraut gemacht wird, bevor es im laufenden Betrieb eingesetzt wird. Falls keine Absaugung vorhanden ist, nutzen RATIONALs UltraVent-Umlufthauben Kondensationstechnologie, um Dampf und Schwaden aufzufangen — keine externe Lüftungsleitung nötig, eine Nachrüstung ist jederzeit möglich.",
  "What's the warranty on this?": "Welche Garantie gilt hierfür?",
  "New RATIONAL units and accessories carry a 2-year manufacturer warranty (12 months on used, demo, or training units sold from RATIONAL's own stock). Registering your device with ConnectedCooking right after installation speeds up any warranty claim.":
    "Neue RATIONAL-Geräte und -Zubehörteile haben eine 2-jährige Herstellergarantie (12 Monate bei gebrauchten Geräten, Vorführ- oder Schulungsgeräten aus RATIONALs eigenem Bestand). Wird das Gerät direkt nach der Installation bei ConnectedCooking registriert, beschleunigt das jede Garantieabwicklung.",
  "Tell me more about service": "Erzählen Sie mir mehr über den Service",
  "Ongoing service runs through RATIONAL's network of 1,200+ certified Service Partners, with 24/7 coverage and re-audited every 18 months. ServicePlus also bundles free software updates, the ConnectedCooking remote-monitoring platform, and ChefLine — RATIONAL chefs on the phone 365 days a year for cooking questions.":
    "Der laufende Service läuft über RATIONALs Netzwerk von über 1.200 zertifizierten Servicepartnern, mit 24/7-Abdeckung und einer erneuten Prüfung alle 18 Monate. ServicePlus bündelt außerdem kostenlose Software-Updates, die Fernüberwachungsplattform ConnectedCooking und ChefLine — RATIONAL-Köche, die 365 Tage im Jahr telefonisch für Kochfragen zur Verfügung stehen.",
  "What about customer support?": "Wie sieht es mit dem Kundensupport aus?",
  "You can reach RATIONAL through ChefLine for cooking/application questions, a dedicated Technical Support form for equipment issues, or a general callback request — RATIONAL Service Partners also guarantee spare-parts supply and emergency coverage after hours and on weekends.":
    "Sie erreichen RATIONAL über ChefLine für Koch- und Anwendungsfragen, über ein spezielles Formular für den technischen Support bei Gerätefragen oder über eine allgemeine Rückrufanfrage — RATIONAL Servicepartner garantieren zudem die Ersatzteilversorgung und Notfallabdeckung außerhalb der Geschäftszeiten und am Wochenende.",
  "What's actually different between Classic and Pro day-to-day?": "Was ist im Alltag tatsächlich anders zwischen Classic und Pro?",
  "Classic runs a 4.3\" display with softkeys and a dial — no touchscreen — and stores up to 100 manual cooking programs, with humidity set in 10% steps (ClimaPlus). Pro adds a 10.1\" touchscreen, iCookingSuite's automated cooking-path suggestions, iProductionManager for multi-dish scheduling, and stores up to 1,200 programs. Both clean themselves automatically; Pro adds an optional AutoDose cartridge system on 10-Grid and up. Networking (Ethernet + WiFi) is standard on Pro, optional on Classic.":
    "Classic verfügt über ein 4,3″-Display mit Softkeys und Drehregler — kein Touchscreen — und speichert bis zu 100 manuelle Kochprogramme, mit Feuchtigkeitseinstellung in 10-%-Schritten (ClimaPlus). Pro ergänzt einen 10,1″-Touchscreen, die automatisierten Garvorschläge von iCookingSuite, iProductionManager für die Planung mehrerer Gerichte und speichert bis zu 1.200 Programme. Beide reinigen sich automatisch selbst; Pro bietet ab dem 10-Grid zusätzlich ein optionales AutoDose-Kartuschensystem. Netzwerkanbindung (Ethernet + WLAN) ist bei Pro Standard, bei Classic optional.",

  // ---- store.jsx — nudges, fallbacks, refine notes ----
  "Ready to select racks?": "Bereit, das Rack auszuwählen?",
  "Ready to talk about where this'll live in your kitchen?": "Bereit, darüber zu sprechen, wo das Gerät in Ihrer Küche stehen wird?",
  "Are you ready to move on to installation type?": "Bereit, mit der Installationsart weiterzumachen?",
  "Are you ready to refine your choice and check add-ons?": "Bereit, Ihre Auswahl zu verfeinern und Zubehör zu prüfen?",
  "Do you want me to summarize your choice?": "Möchten Sie, dass ich Ihre Auswahl zusammenfasse?",
  "Are you ready to move on to ventilation?": "Bereit, mit der Lüftung weiterzumachen?",
  "Yes, let's continue": "Ja, weiter geht's",
  "No rush — ask anything else, and just say the word when you're ready to move on.":
    "Kein Stress — fragen Sie gerne noch etwas, und sagen Sie einfach Bescheid, wenn Sie weitermachen möchten.",
  "Not yet — I have more questions": "Noch nicht — ich habe noch Fragen",
  "Good question — a Rational advisor can go deeper on that once you send this through, but broadly: it depends on your exact setup. Try one of the suggested questions above for a sharper answer.":
    "Gute Frage — ein RATIONAL Berater kann darauf eingehen, sobald Sie Ihre Anfrage abgeschickt haben, aber grundsätzlich gilt: Es hängt von Ihrem genauen Setup ab. Probieren Sie eine der vorgeschlagenen Fragen oben für eine genauere Antwort.",
  "Score check: your volume and menu style put you solidly in Pro territory — that's where the automation actually gets used.":
    "Score-Check: Ihr Volumen und Ihr Menüstil ordnen Sie klar im Pro-Bereich ein — genau dort kommt die Automatisierung wirklich zum Einsatz.",
  "Score check: your volume and menu style keep you comfortably in Classic territory, so you're not paying for automation you won't use yet.":
    "Score-Check: Ihr Volumen und Ihr Menüstil halten Sie komfortabel im Classic-Bereich, sodass Sie nicht für Automatisierung zahlen, die Sie noch nicht nutzen.",
  "Sizing up — good if you're planning for growth or want more buffer on peak days.":
    "Größer dimensioniert — gut, wenn Sie Wachstum einplanen oder mehr Puffer an Spitzentagen möchten.",
  "Sizing down — just confirm this still covers your peak-hour volume, not just your daily average.":
    "Kleiner dimensioniert — stellen Sie nur sicher, dass dies weiterhin Ihr Spitzenvolumen abdeckt, nicht nur Ihren Tagesdurchschnitt.",
  "That's a hard limit, not a preference — countertop mounts top out around 10-Grid. You'd need standard or generous floor space for this size.":
    "Das ist eine feste Grenze, keine Präferenz — Arbeitsplatten-Montagen enden beim 10-Grid. Für diese Größe bräuchten Sie eine Standard- oder großzügige Stellfläche.",
  "Updating the hood here overrides what you picked earlier — just make sure your installer quote reflects whichever one you land on.":
    "Die Haube hier zu ändern überschreibt Ihre frühere Auswahl — stellen Sie nur sicher, dass Ihr Installationsangebot die letztlich gewählte Haube berücksichtigt.",
  "Noted — that works fine here too, it's mainly about how often you'll want to reposition the unit versus keeping it permanently in place.":
    "Notiert — das funktioniert auch hier gut, es geht vor allem darum, wie oft Sie das Gerät versetzen möchten, statt es dauerhaft an einem Platz zu lassen.",
  "Switching racks — good if your menu mix is shifting toward that style of service.":
    "Rack-Wechsel — gut, wenn sich Ihr Menümix in Richtung dieses Servicestils verschiebt.",
  "That's about right": "Das passt ungefähr",
  "Actually, more like 80+ covers": "Eigentlich eher 80+ Gedecke",
  "What made you assume that?": "Wie kommen Sie darauf?",

  // ---- nlu.js — business labels & reasons (spliced into Zoe's free-text recap) ----
  steakhouse: "Steakhouse",
  "food truck": "Foodtruck",
  bakery: "Bäckerei",
  "banqueting / catering operation": "Bankett-/Catering-Betrieb",
  "hotel restaurant": "Hotelrestaurant",
  "busy diner": "stark frequentiertes Diner",
  "Low–medium": "niedrig–mittel",
  Medium: "mittel",
  Low: "niedrig",
  "Steakhouse kitchens are usually à la carte and compact by nature, and 'small' usually means a modest cover count":
    "Steakhouse-Küchen sind meist von Natur aus À la carte und kompakt, und „klein“ bedeutet in der Regel eine überschaubare Sitzplatzzahl",
  "Food trucks run tight, fast-turnaround menus in a very small footprint":
    "Foodtrucks fahren knapp kalkulierte, schnelle Menüs auf sehr kleiner Fläche",
  "Bakeries run steady batch volumes centered on proofing and bake consistency":
    "Bäckereien fahren gleichbleibende Chargenvolumen mit Fokus auf Gär- und Backkonsistenz",
  "Banquet and catering operations run large batches held at temperature for service":
    "Bankett- und Catering-Betriebe fahren große, für den Service warmgehaltene Chargen",
  "Hotels vary widely, so this is a soft default": "Hotels unterscheiden sich stark, daher ist dies eine vorsichtige Standardannahme",
  "Quick-service and diner locations run high turnover on a compact, fast menu":
    "Schnellrestaurants und Diner-Standorte fahren hohen Durchsatz mit einem kompakten, schnellen Menü",

  "20 × 1/1 GN, on a mobile rack": "20 × 1/1 GN, auf einem fahrbaren Rack",

  // ---- engine.js ----
  "This grid size is floor-standing only — there's no countertop mount at this size.":
    "Diese Gerätegröße ist ausschließlich als Standgerät erhältlich — bei dieser Größe gibt es keine Arbeitsplatten-Montage.",

  // ---- Shared UI chrome (desktop + mobile) ----
  Back: "Zurück",
  "Continue →": "Weiter →",
  "Grid size": "Gerätegröße",
  "Stand / mount": "Untergestell / Montage",
  "Rack insert": "Rack-Einsatz",
  "Ventilation hood": "Lüftungshaube",
  "STEP 5 OF 6 — REFINE": "SCHRITT 5 VON 6 — VERFEINERN",
  "Here's the full build — tweak anything that doesn't fit": "Hier ist die vollständige Konfiguration — passen Sie an, was nicht passt",
  "STEP 6 OF 6 — SUMMARY": "SCHRITT 6 VON 6 — ZUSAMMENFASSUNG",
  "Save as PDF": "Als PDF speichern",
  "Submit to sales": "An den Vertrieb senden",
  "Find your local dealer": "Händler in Ihrer Nähe finden",
  "Find a dealer": "Händler finden",
  "Find a local dealer": "Händler in der Nähe finden",
  "Sign up to a live event": "Für eine Live-Veranstaltung anmelden",
  "Back to Refine": "Zurück zur Verfeinerung",

  // ---- PDF export ----
  "Your configuration": "Ihre Konfiguration",
  "Technical specifications": "Technische Daten",
  "Dimensions (W×D×H):": "Abmessungen (B×T×H):",
  "Weight:": "Gewicht:",
  "Connected load:": "Anschlusswert:",
  "Pan capacity:": "Behälterkapazität:",
  "Generated by the RATIONAL guided-selling demo. Dimensions, weight, and power figures are sourced from RATIONAL's published datasheets. Final pricing, lead time, and installation details are confirmed by your RATIONAL advisor.":
    "Erstellt von der RATIONAL Guided-Selling-Demo. Abmessungen, Gewicht und Leistungsangaben stammen aus den veröffentlichten Datenblättern von RATIONAL. Endgültige Preise, Lieferzeit und Installationsdetails bestätigt Ihr RATIONAL-Berater.",

  // ---- XS add-on gate ("Step 1a") ----
  "STEP 1a OF 6 — ESSENTIAL ADD-ONS": "SCHRITT 1a VON 6 — WICHTIGE ZUBEHÖRTEILE",
  "ADD-ONS": "ZUBEHÖR",
  "Will you need any of these on your combi oven?": "Benötigen Sie eines der Folgenden an Ihrem Kombidämpfer?",
  "The XS is RATIONAL's smallest combi oven, so a few accessories only exist from 6-Grid and up: the integrated fat drain, an externally attachable core temperature probe, and a lockable control panel.":
    "Das XS ist RATIONALs kleinster Kombidämpfer, daher gibt es einige Zubehörteile erst ab dem 6-Grid: den integrierten Fettablauf, einen extern anbringbaren Kerntemperaturfühler und ein abschließbares Bedienfeld.",
  "No — none of these are essential": "Nein — keines davon ist notwendig",
  "The compact XS covers what I need": "Das kompakte XS deckt meinen Bedarf ab",
  "Yes — I need at least one of these": "Ja — ich benötige mindestens eines davon",
  "Show me a size that includes them": "Zeigen Sie mir eine Größe, die das enthält",
  "STEP 1a OF 6 — CHOOSE A SIZE": "SCHRITT 1a VON 6 — GRÖSSE WÄHLEN",
  "Which size works instead?": "Welche Größe passt stattdessen?",
  "The integrated fat drain, the externally attachable core probe, and the lockable control panel are all available from 6-Grid and up — pick whichever size fits your volume.":
    "Der integrierte Fettablauf, der extern anbringbare Kernfühler und das abschließbare Bedienfeld sind alle ab dem 6-Grid verfügbar — wählen Sie die Größe, die zu Ihrem Volumen passt.",
  Suggested: "Empfohlen",
  "Good — sticking with the XS keeps things simple and compact.": "Gut — beim XS zu bleiben hält alles einfach und kompakt.",
  gas: "Gas",
  electric: "Elektrisch",
  "power TBD": "Stromanschluss offen",
  "hood TBD": "Haube offen",
  "grid size TBD": "Gerätegröße offen",
  "stand TBD": "Untergestell offen",
  "rack TBD": "Rack offen",
  "no hood needed": "keine Haube nötig",
  "Model:": "Modell:",
  "Power:": "Strom:",
  "Hood:": "Haube:",
  "Stand:": "Untergestell:",
  "Rack:": "Rack:",
  "Your config:": "Ihre Konfiguration:",
  score: "Score",
  "Ask anything": "Fragen Sie mich etwas",
  "Tap an answer on the left, or tell Zoe about your kitchen here to skip straight ahead.":
    "Tippen Sie links eine Antwort an, oder erzählen Sie Zoe hier von Ihrer Küche, um direkt loszulegen.",
  "Zoe's notes for this step will appear here.": "Zoes Notizen zu diesem Schritt erscheinen hier.",
  "3D view": "3D-Ansicht",
  "Rack — pending": "Rack — ausstehend",
  Close: "Schließen",
  "Rational Combi Oven": "RATIONAL Combi-Dämpfer",
  "Source:": "Quelle:",

  // ---- LeadGenModal ----
  "First name": "Vorname",
  "Company name": "Firmenname",
  Email: "E-Mail",
  "Phone number": "Telefonnummer",
  Cancel: "Abbrechen",
  Submit: "Absenden",

  // ---- Mobile-only chrome ----
  "Guided selling": "Geführter Verkauf",
  "Talk about it": "Darüber sprechen",
  "ALL SET": "ALLES ERLEDIGT",
  "Sent to your Rational advisor": "An Ihren RATIONAL Berater gesendet",
  "A Rational advisor will reach out to confirm pricing, lead time, and installation logistics — nothing is ordered automatically.":
    "Ein RATIONAL Berater wird sich melden, um Preis, Lieferzeit und Installationsdetails zu bestätigen — es wird nichts automatisch bestellt.",
  "What's your power connection — electric or gas?": "Wie ist Ihr Stromanschluss — elektrisch oder Gas?",
  "And what about ventilation — do you already have extraction, or will you need a hood?":
    "Und wie sieht es mit der Lüftung aus — haben Sie bereits eine Absaugung, oder brauchen Sie eine Haube?",
  "Want to tweak anything before I send this to your advisor?": "Möchten Sie noch etwas anpassen, bevor ich das an Ihren Berater sende?",
  "grid size": "Gerätegröße",
  stand: "Untergestell",
  rack: "Rack",
  hood: "Haube",
  "That's perfect, send it →": "Perfekt, absenden →",
  "Ready to bring this all together?": "Bereit, das Ganze zusammenzuführen?",
  "Let me review my setup": "Ich möchte mein Setup überprüfen",
};

export function translate(text, lang) {
  if (lang === "de" && text && DE[text]) return DE[text];
  return text;
}

// Translates a suggestions array ({q, a, ...rest}) for the given language,
// preserving every other field (citation, action, topicId, hidden, etc).
export function tSuggestions(list, lang) {
  if (!list) return list;
  return list.map((s) => ({
    ...s,
    q: translate(s.q, lang),
    a: s.a ? translate(s.a, lang) : s.a,
  }));
}
