import { translate } from "./dictionary";

// A handful of Zoe's messages splice several data-driven values into a
// sentence whose word order actually differs between English and German —
// a flat find/replace dictionary can't handle that, so these get their own
// small per-language templates. Everything spliced in (business label, meals
// label, confidence, reason) is first run through the flat dictionary so the
// pieces are already localized before they're combined.

export function freeTextRecapMessage(lang, { businessLabel, confidence, mealsLabel, line, gridWord }) {
  const bl = translate(businessLabel, lang);
  const conf = translate(confidence, lang);
  const ml = translate(mealsLabel, lang);
  if (lang === "de") {
    return `Verstanden — klingt nach einem Betrieb im Bereich ${bl}, geschätzt mit ${conf}er Konfidenz rund um ${ml}. Ich habe Sie darauf basierend vorerst mit einem ${line} ${gridWord} eingeordnet — sagen Sie Bescheid, falls etwas davon nicht passt.`;
  }
  return `Got it — sounds like a ${bl} doing a ${conf.toLowerCase()}-confidence estimate around ${ml.toLowerCase()}. I've started you off with an ${line} ${gridWord} based on that — say the word if any of this is off.`;
}

export function upsizeMessage(lang, { gridSize, line }) {
  if (lang === "de") {
    return `Verstanden, ich stufe Sie auf ein ${gridSize} ${line} hoch — genau bei diesem zusätzlichen Volumen zahlen sich Pros sensorgesteuertes Garen und die automatische Reinigung aus.`;
  }
  return `Got it, bumping you to a ${gridSize} ${line} — that extra volume is exactly where Pro's sensor-adjusted cooking and automated cleaning earn their keep.`;
}

export function whyMessage(lang, reason) {
  const r = translate(reason, lang);
  if (lang === "de") {
    return `${r} — sagen Sie mir aber Bescheid, falls Ihr Betrieb größer ist, dann passe ich das an.`;
  }
  return `${r} — but tell me if your setup's bigger and I'll adjust.`;
}

// XS add-on gate confirmation — splices a data-driven gridSize into the
// sentence, so it gets its own per-language template like the others above.
export function xsGateSwitchText(lang, gridSize) {
  const gs = translate(gridSize, lang);
  if (lang === "de") {
    return `Umgestellt auf ein iCombi Pro ${gs} — damit sind der integrierte Fettablauf, der extern anbringbare Kernfühler und das abschließbare Bedienfeld wieder dabei.`;
  }
  return `Switched to iCombi Pro ${gs} — that brings back the integrated fat drain, the externally attachable core probe, and the lockable control panel.`;
}
