import { createContext, useContext, useReducer, useCallback } from "react";
import { STEPS } from "../data/steps";
import { findOption, computeRecommendation } from "../data/engine";
import { inferFromText, detectPower, detectVentilation } from "../data/nlu";
import { ACCESSORIES_BY_FOCUS, UPSELL_INTRO } from "../data/accessories";
import { matchSupportTopic, isCompareQuery, buildComparison, supportFollowUps, PRO_VS_CLASSIC, SUPPORT_TOPICS } from "../data/knowledge";

const STEP4 = STEPS[3];

function initialState() {
  return {
    screen: "guided", // guided | refine | summary
    currentStep: 1,
    furthestStep: 1,
    lang: "en",
    langExpanded: false,
    answers: { meals: null, focus: null, footprint: null, power: null, ventilation: null },
    overrides: {}, // { gridSize, rack, hood, stand }
    accessories: [], // [{id,label}]
    chatByStep: { meals: [{ type: "transition", text: STEPS[0].transition }] }, // stepKey -> [{type:'transition'|'fact'|'qa'|'user'|'assistant', ...}]
    tappedSuggestions: {}, // `${stepKey}:${optionId}` -> Set of indices tapped (serialized as array)
    productPreviewShown: false,
    checklistAdded: false,
    sentToAdvisor: false,
    pathC: {
      active: false,
      stage: null, // 'confirm_business' | 'power' | 'ventilation' | 'upsell' | 'done'
      inference: null,
      ventilationAssumed: false,
    },
  };
}

function stepKeyFor(stepId) {
  return STEPS.find((s) => s.id === stepId)?.key;
}

function pushChat(chatByStep, stepKey, entry) {
  const list = chatByStep[stepKey] ? [...chatByStep[stepKey]] : [];
  list.push(entry);
  return { ...chatByStep, [stepKey]: list };
}

const CONTINUE_TO_REFINE_SUGGESTION = { q: "Continue to Refine & Accessories", a: null, action: "pathc:finish" };

// Whatever decision is still open right now — attached to any Zoe response so
// the conversation never dead-ends, especially on mobile where chat is the
// only way to keep moving through guided selling.
function getPendingSuggestions(state) {
  if (state.pathC.active) {
    const stage = state.pathC.stage;
    if (stage === "power") {
      return STEP4.subQuestions[0].options.map((o) => ({ q: o.label, a: null, action: `power:${o.id}` }));
    }
    if (stage === "ventilation") {
      return STEP4.subQuestions[1].options
        .map((o) => ({ q: o.label, a: null, action: `vent:${o.id}` }))
        .concat([{ q: "Not sure yet", a: null, action: "vent:unsure" }]);
    }
    if (stage === "upsell") {
      const focusId = state.answers.focus;
      return (ACCESSORIES_BY_FOCUS[focusId] || [])
        .map((a) => ({ q: `Add ${a.label}`, a: null, action: `accessory:${a.id}` }))
        .concat([{ q: "No thanks", a: null, action: "accessory:none" }]);
    }
    if (stage === "done" && state.screen === "guided") {
      return [CONTINUE_TO_REFINE_SUGGESTION];
    }
  }
  if (state.screen === "refine") {
    return [
      { q: "What's actually different between Classic and Pro day-to-day?", a: PRO_VS_CLASSIC },
      { q: "What's the warranty on this?", a: SUPPORT_TOPICS.find((t) => t.id === "warranty").answer, citation: SUPPORT_TOPICS.find((t) => t.id === "warranty").citation },
      { q: "How does installation work?", a: SUPPORT_TOPICS.find((t) => t.id === "installation").answer, citation: SUPPORT_TOPICS.find((t) => t.id === "installation").citation },
    ];
  }
  return null;
}

function reducer(state, action) {
  switch (action.type) {
    case "RESTART":
      return initialState();

    case "TOGGLE_LANG_EXPAND":
      return { ...state, langExpanded: !state.langExpanded };

    case "CLOSE_LANG":
      return state.langExpanded ? { ...state, langExpanded: false } : state;

    case "SET_LANG":
      return { ...state, lang: action.lang, langExpanded: false };

    case "GOTO_STEP": {
      // step indicator: backwards only, only within already-visited territory
      const displayCurrent = state.screen === "refine" ? 5 : state.screen === "summary" ? 6 : state.currentStep;
      if (action.step >= displayCurrent) return state;
      if (action.step > state.furthestStep) return state;
      if (action.step <= 4) return { ...state, screen: "guided", currentStep: action.step };
      if (action.step === 5) return { ...state, screen: "refine" };
      return state;
    }

    case "BACK": {
      if (state.screen === "summary") return { ...state, screen: "refine" };
      if (state.screen === "refine") return { ...state, screen: "guided", currentStep: 4 };
      if (state.currentStep > 1) return { ...state, currentStep: state.currentStep - 1 };
      return state;
    }

    case "SELECT_OPTION": {
      const { stepId, optionId } = action;
      const stepKey = stepKeyFor(stepId);
      const step = STEPS.find((s) => s.id === stepId);
      const option = step.options.find((o) => o.id === optionId);
      const answers = { ...state.answers, [stepKey]: optionId };
      const productPreviewShown = state.productPreviewShown || stepKey === "meals";

      let chatByStep = pushChat(state.chatByStep, stepKey, {
        type: "fact",
        optionId,
        text: option.factBubble,
        citation: option.citation || null,
        suggestions: option.suggestions,
      });

      return { ...state, answers, chatByStep, productPreviewShown };
    }

    case "SELECT_SUBOPTION": {
      const { subKey, optionId } = action; // subKey: 'power' | 'ventilation'
      const sub = STEP4.subQuestions.find((s) => s.id === subKey);
      const option = sub.options.find((o) => o.id === optionId);
      const answers = { ...state.answers, [subKey]: optionId };
      const chatByStep = pushChat(state.chatByStep, "installation", {
        type: "fact",
        optionId: `${subKey}:${optionId}`,
        text: option.factBubble,
        suggestions: option.suggestions,
      });
      return { ...state, answers, chatByStep };
    }

    case "ECHO_USER": {
      const chatByStep = pushChat(state.chatByStep, action.stepKey, { type: "user", text: action.text });
      return { ...state, chatByStep };
    }

    case "TAP_SUGGESTION": {
      const { stepKey, msgIndex, suggestionIndex } = action;
      const list = [...(state.chatByStep[stepKey] || [])];
      const msg = list[msgIndex];
      if (!msg || !msg.suggestions) return state;
      const s = msg.suggestions[suggestionIndex];
      // Support-topic suggestions chain into the OTHER topics, so browsing
      // installation/warranty/service/support doesn't dead-end after one tap.
      const followUps = s.topicId ? supportFollowUps(s.topicId) : null;
      list.push({ type: "qa", q: s.q, a: s.a, citation: s.citation || null, suggestions: followUps });
      return { ...state, chatByStep: { ...state.chatByStep, [stepKey]: list } };
    }

    case "ASK_ANYTHING": {
      const { stepKey, text } = action;
      const rec = computeRecommendation(state.answers, state.overrides);
      let answerText =
        "Good question — a Rational advisor can go deeper on that once you send this through, but broadly: it depends on your exact setup. Try one of the suggested questions above for a sharper answer.";
      let citation = null;
      let matchedTopicId = null;

      const supportTopic = matchSupportTopic(text);
      if (isCompareQuery(text)) {
        answerText = buildComparison(text, rec);
      } else if (supportTopic) {
        answerText = supportTopic.answer;
        citation = supportTopic.citation;
        matchedTopicId = supportTopic.id;
      } else {
        const list0 = state.chatByStep[stepKey] || [];
        for (let i = list0.length - 1; i >= 0; i -= 1) {
          const msg = list0[i];
          if (msg.suggestions) {
            const match = msg.suggestions.find((s) => s.q.toLowerCase().includes(text.toLowerCase().slice(0, 8)) || text.toLowerCase().includes(s.q.toLowerCase().split(" ")[0]));
            if (match) {
              answerText = match.a;
              citation = match.citation || null;
              break;
            }
          }
        }
      }

      const list = [...(state.chatByStep[stepKey] || [])];
      list.push({ type: "user", text });

      const pathCStage = state.pathC.active ? state.pathC.stage : null;
      if (pathCStage === "confirm_business") {
        // Still deciding whether to confirm the inferred business type — a
        // detour question shouldn't re-litigate that decision, just answer
        // it and gently check whether they're ready to move on. Kept as ONE
        // message (not two) so the answer is never scrolled out of view by
        // a second bubble arriving right after it, and so only one
        // StreamedText streams at a time.
        list.push({
          type: "assistant",
          text: `${answerText} Are you ready to move on to installation type?`,
          citation,
          suggestions: [
            { q: "Yes, let's continue", a: null, action: "pathc:confirm" },
            { q: "Not yet — I have more questions", a: "No rush — ask anything else, and just say the word when you're ready to move on to installation.", action: null },
          ],
        });
      } else if (pathCStage) {
        // Path C is mid-flow (power/ventilation/upsell/done) — keep steering
        // back to whatever question is actually still pending, rather than
        // sidetracking into unrelated topics.
        list.push({ type: "assistant", text: answerText, citation, suggestions: getPendingSuggestions(state) });
      } else {
        // Plain guided flow (no Path C), or the refine screen — offer
        // logically related follow-ups: other support topics when the
        // question matched one, otherwise whatever's still open (refine's
        // own follow-ups) or a generic, still-grounded set of topics.
        const suggestions = matchedTopicId ? supportFollowUps(matchedTopicId) : getPendingSuggestions(state) || supportFollowUps(null);
        list.push({ type: "assistant", text: answerText, citation, suggestions });
      }

      return { ...state, chatByStep: { ...state.chatByStep, [stepKey]: list } };
    }

    case "CONTINUE": {
      const nextStep = state.currentStep + 1;
      if (nextStep > 4) {
        return { ...state, screen: "refine", furthestStep: Math.max(state.furthestStep, 5) };
      }
      const nextKey = stepKeyFor(nextStep);
      let chatByStep = state.chatByStep;
      if (!chatByStep[nextKey] || chatByStep[nextKey].length === 0) {
        chatByStep = pushChat(chatByStep, nextKey, {
          type: "transition",
          text: STEPS.find((s) => s.id === nextStep).transition,
        });
      }
      return {
        ...state,
        currentStep: nextStep,
        furthestStep: Math.max(state.furthestStep, nextStep),
        chatByStep,
      };
    }

    case "SEED_REFINE": {
      if (state.chatByStep.refine && state.chatByStep.refine.length > 0) return state;
      const rec = computeRecommendation(state.answers, state.overrides);
      const text =
        rec.line === "iCombi Pro"
          ? "Score check: your volume and menu style put you solidly in Pro territory — that's where the automation actually gets used."
          : "Score check: your volume and menu style keep you comfortably in Classic territory, so you're not paying for automation you won't use yet.";
      const chatByStep = pushChat(state.chatByStep, "refine", {
        type: "fact",
        text,
        suggestions: [
          { q: "What's actually different between Classic and Pro day-to-day?", a: PRO_VS_CLASSIC },
          { q: "What's the warranty on this?", a: SUPPORT_TOPICS.find((t) => t.id === "warranty").answer, citation: SUPPORT_TOPICS.find((t) => t.id === "warranty").citation },
          { q: "How does installation work?", a: SUPPORT_TOPICS.find((t) => t.id === "installation").answer, citation: SUPPORT_TOPICS.find((t) => t.id === "installation").citation },
        ],
      });
      return { ...state, chatByStep };
    }

    case "GO_REFINE":
      return { ...state, screen: "refine", furthestStep: Math.max(state.furthestStep, 5) };

    case "GO_SUMMARY":
      return { ...state, screen: "summary", furthestStep: Math.max(state.furthestStep, 6) };

    case "SET_OVERRIDE": {
      const overrides = { ...state.overrides, [action.field]: action.value };
      let text = null;
      if (action.field === "gridSize") {
        const order = ["6-Grid", "10-Grid", "20-Grid"];
        const prevSize = state.overrides.gridSize || computeRecommendation(state.answers).gridSize;
        const prevIdx = order.indexOf(prevSize);
        const nextIdx = order.indexOf(action.value);
        if (nextIdx > prevIdx) {
          text = "Sizing up — good if you're planning for growth or want more buffer on peak days.";
        } else if (nextIdx < prevIdx) {
          text = "Sizing down — just confirm this still covers your peak-hour volume, not just your daily average.";
        }
        const standResult = computeRecommendation(state.answers, overrides);
        if (standResult.standWarning) {
          text =
            "That's a hard limit, not a preference — countertop mounts top out around 10-Grid. You'd need standard or generous floor space for this size.";
        }
      } else if (action.field === "hood") {
        text = "Updating the hood here overrides what you picked earlier — just make sure your installer quote reflects whichever one you land on.";
      } else if (action.field === "stand") {
        text = "Noted — that works fine here too, it's mainly about how often you'll want to reposition the unit versus keeping it permanently in place.";
      } else if (action.field === "rack") {
        text = "Switching racks — good if your menu mix is shifting toward that style of service.";
      }
      let chatByStep = state.chatByStep;
      if (text) {
        chatByStep = pushChat(chatByStep, "refine", { type: "fact", text });
      }
      return { ...state, overrides, chatByStep };
    }

    case "TOGGLE_ACCESSORY": {
      const exists = state.accessories.find((a) => a.id === action.accessory.id);
      const accessories = exists
        ? state.accessories.filter((a) => a.id !== action.accessory.id)
        : [...state.accessories, action.accessory];
      return { ...state, accessories };
    }

    case "ADD_CHECKLIST":
      return { ...state, checklistAdded: true };

    case "SEND_TO_ADVISOR":
      return { ...state, sentToAdvisor: true };

    case "START_FREE_TEXT": {
      const { text } = action;
      const inference = inferFromText(text);
      if (!inference) {
        return {
          ...state,
          chatByStep: pushChat(state.chatByStep, "meals", { type: "user", text }),
        };
      }
      const answers = {
        ...state.answers,
        meals: inference.meals,
        focus: inference.focus,
        footprint: inference.footprint,
      };
      const mealsOpt = findOption("meals", inference.meals);
      const gridWord = mealsOpt.gridSize;
      const rec = computeRecommendation(answers);
      let chatByStep = pushChat(state.chatByStep, "meals", { type: "user", text });
      chatByStep = pushChat(chatByStep, "meals", {
        type: "assistant",
        text: `Got it — sounds like a ${inference.businessLabel} doing a ${inference.confidence.toLowerCase()}-confidence estimate around ${mealsOpt.label.toLowerCase()}. I've started you off with an ${rec.line} ${gridWord} based on that — say the word if any of this is off.`,
        suggestions: [
          { q: "That's about right", a: null, action: "pathc:confirm" },
          { q: "Actually, more like 80+ covers", a: null, action: "pathc:upsize" },
          { q: "What made you assume that?", a: null, action: "pathc:why" },
        ],
        isPathCRecap: true,
      });
      return {
        ...state,
        answers,
        productPreviewShown: true,
        chatByStep,
        pathC: { active: true, stage: "confirm_business", inference, ventilationAssumed: false },
      };
    }

    case "PATHC_CONFIRM": {
      let chatByStep = pushChat(state.chatByStep, "meals", {
        type: "assistant",
        text: "Good — two quick things I can't guess from a description: what's your power connection, electric or gas?",
        suggestions: [
          { q: "Electric", a: null, action: "power:electric" },
          { q: "Gas", a: null, action: "power:gas" },
        ],
      });
      return { ...state, chatByStep, pathC: { ...state.pathC, stage: "power" } };
    }

    case "PATHC_UPSIZE": {
      const answers = { ...state.answers, meals: "80_150" };
      const rec = computeRecommendation(answers);
      const chatByStep = pushChat(state.chatByStep, "meals", {
        type: "assistant",
        text: `Got it, bumping you to a ${rec.gridSize} ${rec.line} — that extra volume is exactly where Pro's sensor-adjusted cooking and automated cleaning earn their keep. Two quick things I can't guess from a description: what's your power connection, electric or gas?`,
        suggestions: [
          { q: "Electric", a: null, action: "power:electric" },
          { q: "Gas", a: null, action: "power:gas" },
        ],
      });
      return { ...state, answers, chatByStep, pathC: { ...state.pathC, stage: "power" } };
    }

    case "PATHC_WHY": {
      const inference = state.pathC.inference;
      let chatByStep = pushChat(state.chatByStep, "meals", {
        type: "assistant",
        text: inference.reason + " — but tell me if your setup's bigger and I'll adjust.",
        suggestions: [
          { q: "That's about right", a: null, action: "pathc:confirm" },
          { q: "Actually, more like 80+ covers", a: null, action: "pathc:upsize" },
        ],
      });
      return { ...state, chatByStep };
    }

    case "PATHC_SET_POWER": {
      const power = action.power;
      const opt = findOption("power", power);
      const answers = { ...state.answers, power };
      const chatByStep = pushChat(state.chatByStep, "meals", {
        type: "fact",
        text: `${opt.factBubble} And is there anything required for ventilation — do you already have extraction in place, or will you need a hood?`,
        suggestions: [
          { q: "I already have extraction", a: null, action: "vent:have_extraction" },
          { q: "I need a condensation hood", a: null, action: "vent:condensation" },
          { q: "I need a full extraction hood", a: null, action: "vent:extraction" },
          { q: "Not sure yet", a: null, action: "vent:unsure" },
        ],
      });
      return { ...state, answers, chatByStep, pathC: { ...state.pathC, stage: "ventilation" } };
    }

    case "PATHC_SET_VENTILATION": {
      const { ventilation, unsure } = action;
      const focusId = state.answers.focus;
      const upsellText = UPSELL_INTRO[focusId] || "a couple of accessories tailored to your kitchen";
      let answers = state.answers;
      let ventilationText;
      if (unsure) {
        answers = { ...answers, ventilation: "extraction" };
        ventilationText =
          "No problem — I'll assume you'll need a full extraction hood for now, based on typical smoke/grease output for this kind of kitchen. Your installer can confirm on-site and we'll adjust if needed.";
      } else {
        answers = { ...answers, ventilation };
        ventilationText = findOption("ventilation", ventilation).factBubble;
      }
      const chatByStep = pushChat(state.chatByStep, "meals", {
        type: "assistant",
        text: `${ventilationText} Since you're running this kind of kitchen, a lot of operators pair this build with ${upsellText}. Want to add either?`,
        suggestions: (ACCESSORIES_BY_FOCUS[focusId] || []).map((a) => ({ q: `Add ${a.label}`, a: null, action: `accessory:${a.id}` })).concat([{ q: "No thanks", a: null, action: "accessory:none" }]),
      });
      return { ...state, answers, chatByStep, pathC: { ...state.pathC, stage: "upsell", ventilationAssumed: !!unsure } };
    }

    case "PATHC_ADD_ACCESSORY": {
      const focusId = state.answers.focus;
      const list = ACCESSORIES_BY_FOCUS[focusId] || [];
      const acc = list.find((a) => a.id === action.accessoryId);
      if (!acc) {
        const chatByStep = pushChat(state.chatByStep, "meals", {
          type: "assistant",
          text: "No problem — you can always add accessories later from the Refine & Accessories screen.",
          suggestions: [CONTINUE_TO_REFINE_SUGGESTION],
        });
        return { ...state, chatByStep, pathC: { ...state.pathC, stage: "done" } };
      }
      const accessories = state.accessories.find((a) => a.id === acc.id) ? state.accessories : [...state.accessories, acc];
      const chatByStep = pushChat(state.chatByStep, "meals", {
        type: "assistant",
        text: `Added — ${acc.detail}`,
        suggestions: [CONTINUE_TO_REFINE_SUGGESTION],
      });
      return { ...state, accessories, chatByStep, pathC: { ...state.pathC, stage: "done" } };
    }

    case "PATHC_FINISH": {
      return {
        ...state,
        currentStep: 5,
        furthestStep: Math.max(state.furthestStep, 5),
        screen: action.target === "summary" ? "summary" : "refine",
      };
    }

    default:
      return state;
  }
}

const StateCtx = createContext(null);
const DispatchCtx = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  return (
    <StateCtx.Provider value={state}>
      <DispatchCtx.Provider value={dispatch}>{children}</DispatchCtx.Provider>
    </StateCtx.Provider>
  );
}

export function useAppState() {
  return useContext(StateCtx);
}

export function useAppDispatch() {
  return useContext(DispatchCtx);
}

export function useRecommendation() {
  const state = useAppState();
  return computeRecommendation(state.answers, state.overrides);
}
