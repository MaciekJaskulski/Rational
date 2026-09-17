import { createContext, useContext, useReducer, useCallback } from "react";
import { STEPS } from "../data/steps";
import { findOption, computeRecommendation } from "../data/engine";
import { inferFromText } from "../data/nlu";
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
    mobileTab: "guided", // "guided" | "chat" — which tab MobileApp shows; lifted here (not local component
    // state) so any component (e.g. the mobile Path C demo's "Let me review my setup" action) can switch it.
    pathC: {
      active: false,
      stage: null, // 'confirm_business' | 'stepping' (walking through the real guided steps, chat-narrated)
      inference: null,
      ventilationAssumed: false,
      ventilationUnlocked: false, // mobile-only: gates the ventilation synthetic question behind an explicit "ready?" nudge
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

// Whatever decision is still open right now — attached to any Zoe response so
// the conversation never dead-ends, especially on mobile where chat is the
// only way to keep moving through guided selling. Only the refine screen has
// a fixed set of these left — everything else is handled by the step-aware
// "ready to continue" nudge below.
function getPendingSuggestions(state) {
  if (state.screen === "refine") {
    return [
      { q: "What's actually different between Classic and Pro day-to-day?", a: PRO_VS_CLASSIC },
      { q: "What's the warranty on this?", a: SUPPORT_TOPICS.find((t) => t.id === "warranty").answer, citation: SUPPORT_TOPICS.find((t) => t.id === "warranty").citation },
      { q: "How does installation work?", a: SUPPORT_TOPICS.find((t) => t.id === "installation").answer, citation: SUPPORT_TOPICS.find((t) => t.id === "installation").citation },
    ];
  }
  return null;
}

// Advances from the current guided step to the next one — shared by the
// physical Continue button (CONTINUE) and the chat-narrated Path C flow
// (PATHC_ADVANCE), so both produce the exact same result.
function advanceToNextStep(state) {
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

// True once the CURRENT step (or refine/summary) has its primary answer —
// gates the "ready to continue" nudge so it only appears once there's
// actually somewhere to advance TO. Step 4 only requires power (matches how
// far the chat-narrated flow gets before offering to move on to refine).
function currentStepAnswered(state) {
  if (state.screen === "refine" || state.screen === "summary") return true;
  if (state.screen !== "guided") return false;
  const step = STEPS.find((s) => s.id === state.currentStep);
  if (!step) return false;
  if (step.options) return !!state.answers[step.key];
  if (step.subQuestions) return !!state.answers.power;
  return false;
}

const NEXT_STEP_PROMPTS = {
  1: "Ready to select racks?",
  2: "Ready to talk about where this'll live in your kitchen?",
  3: "Are you ready to move on to installation type?",
  4: "Are you ready to refine your choice and check add-ons?",
};

// What to ask, and what "Yes" should do, given where the conversation
// currently sits — used to chain a step-aware "ready to continue" prompt
// onto any tangential answer once the current step is already answered.
function nudgeForState(state) {
  if (state.screen === "refine") {
    return { prompt: "Do you want me to summarize your choice?", yesAction: "pathc:summarize" };
  }
  if (state.screen !== "guided") return null;
  if (state.currentStep === 4 && state.answers.power && !state.answers.ventilation) {
    // Still within step 4 (installation) — this isn't a step-advance, just
    // unlocking the ventilation sub-question, which otherwise waits.
    return { prompt: "Are you ready to move on to ventilation?", yesAction: "pathc:unlock_ventilation" };
  }
  const prompt = NEXT_STEP_PROMPTS[state.currentStep];
  return prompt ? { prompt, yesAction: "pathc:advance" } : null;
}

function nudgeSuggestions(nudge) {
  if (!nudge) return null;
  return [
    { q: "Yes, let's continue", a: null, action: nudge.yesAction },
    { q: "Not yet — I have more questions", a: "No rush — ask anything else, and just say the word when you're ready to move on.", action: null },
  ];
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
        citation: option.citation || null,
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

      if (state.pathC.active && currentStepAnswered(state)) {
        // Chat-narrated Path C flow, current step already answered — chain
        // the same step-aware "ready to continue" prompt tapping a curated
        // question gets, same as typing one would.
        const nudge = nudgeForState(state);
        list.push({
          type: "qa",
          q: s.q,
          a: nudge ? `${s.a} ${nudge.prompt}` : s.a,
          citation: s.citation || null,
          suggestions: nudge ? nudgeSuggestions(nudge) : s.topicId ? supportFollowUps(s.topicId) : null,
        });
        return { ...state, chatByStep: { ...state.chatByStep, [stepKey]: list } };
      }

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
        // it and check whether they're ready to move on to the real next
        // step (culinary focus / racks). Kept as ONE message (not two) so
        // the answer is never scrolled out of view by a second bubble
        // arriving right after it, and so only one StreamedText streams at
        // a time. "Yes" reuses pathc:confirm — same "the estimate's right,
        // let's move on" meaning as the original confirm chip.
        list.push({
          type: "assistant",
          text: `${answerText} ${NEXT_STEP_PROMPTS[1]}`,
          citation,
          suggestions: [
            { q: "Yes, let's continue", a: null, action: "pathc:confirm" },
            { q: "Not yet — I have more questions", a: "No rush — ask anything else, and just say the word when you're ready to move on.", action: null },
          ],
        });
      } else if (state.pathC.active && currentStepAnswered(state)) {
        // Chat-narrated Path C flow, current step already answered — chain
        // a step-aware "ready to continue" prompt onto the answer so the
        // conversation keeps advancing through the real guided steps.
        const nudge = nudgeForState(state);
        list.push({
          type: "assistant",
          text: nudge ? `${answerText} ${nudge.prompt}` : answerText,
          citation,
          suggestions: nudge ? nudgeSuggestions(nudge) : matchedTopicId ? supportFollowUps(matchedTopicId) : null,
        });
      } else {
        // Plain guided flow (no Path C), or the refine screen reached
        // without Path C — offer logically related follow-ups: other
        // support topics when the question matched one, otherwise
        // whatever's still open (refine's own follow-ups) or a generic,
        // still-grounded set of topics.
        const suggestions = matchedTopicId ? supportFollowUps(matchedTopicId) : getPendingSuggestions(state) || supportFollowUps(null);
        list.push({ type: "assistant", text: answerText, citation, suggestions });
      }

      return { ...state, chatByStep: { ...state.chatByStep, [stepKey]: list } };
    }

    case "CONTINUE":
      return advanceToNextStep(state);

    case "PATHC_ADVANCE":
      return advanceToNextStep(state);

    case "PATHC_UNLOCK_VENTILATION":
      return { ...state, pathC: { ...state.pathC, ventilationUnlocked: true } };

    case "SET_MOBILE_TAB":
      return { ...state, mobileTab: action.tab };

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
        if (state.pathC.active) {
          const nudge = nudgeForState(state);
          chatByStep = pushChat(chatByStep, "refine", {
            type: "fact",
            text: nudge ? `${text} ${nudge.prompt}` : text,
            suggestions: nudge ? nudgeSuggestions(nudge) : null,
          });
        } else {
          chatByStep = pushChat(chatByStep, "refine", { type: "fact", text });
        }
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
      // Only meals is actually applied — focus/footprint stay unanswered so
      // steps 2/3 still ask for real, explicit confirmation via the normal
      // synthetic-question flow (their real content is what informs the
      // inference `reason`, not a silent pre-fill).
      const answers = { ...state.answers, meals: inference.meals };
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
      // "The estimate's right" — hand off from Path C's own business-type
      // inference into the real guided steps, exactly like clicking
      // Continue would. From here on, steps 2-5 are answered for real (real
      // option cards / sub-questions), with the "ready to continue" nudge
      // (ASK_ANYTHING / TAP_SUGGESTION / SET_OVERRIDE, above) carrying the
      // chat narration forward after any tangential question.
      return { ...advanceToNextStep(state), pathC: { ...state.pathC, stage: "stepping" } };
    }

    case "PATHC_UPSIZE": {
      const answers = { ...state.answers, meals: "80_150" };
      const rec = computeRecommendation(answers);
      const chatByStep = pushChat(state.chatByStep, "meals", {
        type: "assistant",
        text: `Got it, bumping you to a ${rec.gridSize} ${rec.line} — that extra volume is exactly where Pro's sensor-adjusted cooking and automated cleaning earn their keep.`,
      });
      const advanced = advanceToNextStep({ ...state, answers, chatByStep });
      return { ...advanced, pathC: { ...state.pathC, stage: "stepping" } };
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
