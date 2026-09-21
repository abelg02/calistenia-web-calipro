// Level test logic. Copy lives in the dictionaries (test.questions / test.results).
// The four "basics" targets are a proposal based on the skill prerequisites in content/skills.ts
// (front lever asks for 10 clean pull-ups). Confirm them with the coach before launch.

export const QUESTIONS = ["pullups", "dips", "pushups", "handstand", "experience", "goal"] as const;
export type QuestionId = (typeof QUESTIONS)[number];
export type Answers = Record<QuestionId, number>;

/** Option count per question; must match the dictionary option lists. */
export const OPTION_COUNT: Record<QuestionId, number> = {
  pullups: 5, // none, 1-4, 5-9, 10-14, 15+
  dips: 4, // none, 1-9, 10-19, 20+
  pushups: 3, // <10, 10-29, 30+
  handstand: 5, // no, wall 30s+, free <20s, free 20-60s, free >60s
  experience: 4, // <3m, 3-12m, 1-3y, 3y+
  goal: 5, // planche, front lever, OAH, flag, not sure
};

export type Basic = "pullups" | "dips" | "pushups" | "handstand";
/** Minimum option index that meets each basic target. */
const BASIC_TARGET: Record<Basic, number> = { pullups: 3, dips: 3, pushups: 2, handstand: 1 };
export const BASICS = Object.keys(BASIC_TARGET) as Basic[];

const GOAL_SKILL = ["planche", "front-lever", "pino-una-mano", "bandera-humana", null] as const;
type SkillGoal = Exclude<(typeof GOAL_SKILL)[number], null>;
type Blockable = "planche" | "pino-una-mano";

/** Which goal is not reachable yet (key into dictionary test.blocked). */
function blocker(skill: SkillGoal, a: Answers): Blockable | null {
  if (skill === "planche" && a.experience < 2) return "planche";
  if (skill === "pino-una-mano" && a.handstand < 4) return "pino-una-mano";
  return null;
}

export type Result =
  | { kind: "base"; met: Record<Basic, boolean>; missingCount: number }
  | { kind: "skill"; skill: SkillGoal; met: Record<Basic, boolean>; blockedGoal: Blockable | null };

export function evaluate(a: Answers): Result {
  const met = Object.fromEntries(BASICS.map((b) => [b, a[b] >= BASIC_TARGET[b]])) as Record<Basic, boolean>;
  const missingCount = BASICS.filter((b) => !met[b]).length;
  if (missingCount > 0) return { kind: "base", met, missingCount };

  const goal = GOAL_SKILL[a.goal];
  if (goal) {
    const blocked = blocker(goal, a);
    if (!blocked) return { kind: "skill", skill: goal, met, blockedGoal: null };
  }
  // No goal, or the goal is not reachable yet: best available option for this profile.
  // (Only planche and the one-arm handstand can be blocked, and neither is picked as a fallback then.)
  const fallback: SkillGoal =
    a.handstand >= 4 && a.experience >= 3 ? "pino-una-mano" : a.experience >= 2 ? "front-lever" : "bandera-humana";
  return { kind: "skill", skill: fallback, met, blockedGoal: goal ? blocker(goal, a) : null };
}
