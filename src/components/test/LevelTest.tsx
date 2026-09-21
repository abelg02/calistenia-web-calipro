"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowCounterClockwise, ArrowLeft, ArrowRight, Check, Circle, WhatsappLogo } from "@phosphor-icons/react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { BASICS, QUESTIONS, evaluate, type Answers, type QuestionId, type Result } from "@/content/level-test";
import { waHref } from "@/lib/contact";

export type SkillInfo = { name: string; levelLabel: string; time: string; image: string; imageAlt: string; href: string };

type Props = {
  t: Dictionary["test"];
  skills: Record<string, SkillInfo>;
  skillsHref: string;
};

// One question per screen, then a result: the basics still to close, or the skill to start with.
// The WhatsApp message carries every answer so the coach gets context from the first message.
export function LevelTest({ t, skills, skillsHref }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const headingRef = useRef<HTMLHeadingElement>(null);
  const total = QUESTIONS.length;
  const done = step >= total;
  const result: Result | null = done ? evaluate(answers as Answers) : null;

  // Move focus to the new question/result so keyboard and screen-reader users follow along.
  useEffect(() => {
    if (step > 0) headingRef.current?.focus();
  }, [step]);

  const choose = (q: QuestionId, value: number) => {
    setAnswers((a) => ({ ...a, [q]: value }));
    setStep((s) => s + 1);
  };
  const restart = () => {
    setAnswers({});
    setStep(0);
  };

  const label = (q: QuestionId) => t.questions[q].options[answers[q] ?? 0];

  return (
    <div className="border border-granite bg-slate">
      {/* progress */}
      <div className="flex gap-1.5 p-5 sm:p-8 sm:pb-0" aria-hidden>
        {QUESTIONS.map((q, i) => (
          <span key={q} className={`h-1 flex-1 transition-colors duration-500 ${i < step ? "bg-gold" : "bg-granite"}`} />
        ))}
      </div>

      <div className="p-5 pt-6 sm:p-8">
        <AnimatePresence mode="wait" initial={false}>
          {!done ? (
            <motion.div
              key={`q-${step}`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-mono text-xs tracking-[0.16em] text-pumice">
                {t.question.replace("{n}", String(step + 1)).replace("{total}", String(total))}
              </p>
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="font-display mt-3 text-balance text-[clamp(2rem,5vw,3.2rem)] text-travertine outline-none"
              >
                {t.questions[QUESTIONS[step]].title}
              </h2>
              <ul className="mt-8 flex flex-col gap-2">
                {t.questions[QUESTIONS[step]].options.map((opt, i) => {
                  const selected = answers[QUESTIONS[step]] === i;
                  return (
                    <li key={opt}>
                      <button
                        type="button"
                        onClick={() => choose(QUESTIONS[step], i)}
                        className={`group flex min-h-14 w-full items-center justify-between gap-4 border px-5 text-left text-base transition-colors active:translate-y-px ${
                          selected ? "border-gold text-gold" : "border-flint text-travertine hover:border-gold hover:text-gold"
                        }`}
                      >
                        {opt}
                        <ArrowRight size={18} aria-hidden className="shrink-0 opacity-50 transition-opacity group-hover:opacity-100" />
                      </button>
                    </li>
                  );
                })}
              </ul>
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold uppercase tracking-[0.1em] text-pumice hover:text-gold"
                >
                  <ArrowLeft size={16} aria-hidden /> {t.back}
                </button>
              )}
            </motion.div>
          ) : (
            result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                aria-live="polite"
              >
                <ResultView
                  result={result}
                  t={t}
                  skills={skills}
                  skillsHref={skillsHref}
                  headingRef={headingRef}
                  onRestart={restart}
                  answerLabel={label}
                />
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ResultView({
  result,
  t,
  skills,
  skillsHref,
  headingRef,
  onRestart,
  answerLabel,
}: {
  result: Result;
  t: Dictionary["test"];
  skills: Record<string, SkillInfo>;
  skillsHref: string;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  onRestart: () => void;
  answerLabel: (q: QuestionId) => string;
}) {
  const skill = result.kind === "skill" ? skills[result.skill] : null;
  const level = skill ? skill.levelLabel : t.base.level;
  const title = skill ? t.skillTitle.replace("{skill}", skill.name) : t.base.title;
  const body = skill
    ? t.reasons[result.kind === "skill" ? result.skill : "front-lever"].replace("{time}", skill.time)
    : t.base.body;
  const blocked = result.kind === "skill" && result.blockedGoal ? t.blocked[result.blockedGoal] : null;

  const message = t.wa
    .replace("{result}", skill ? skill.name : `${t.base.level}. ${t.notMet}: ${BASICS.filter((b) => !result.met[b]).map((b) => t.basics[b]).join(", ")}`)
    .replace("{pullups}", answerLabel("pullups"))
    .replace("{dips}", answerLabel("dips"))
    .replace("{pushups}", answerLabel("pushups"))
    .replace("{handstand}", answerLabel("handstand"))
    .replace("{experience}", answerLabel("experience"))
    .replace("{goal}", answerLabel("goal"));

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_16rem]">
      <div>
        <p className="font-mono text-xs tracking-[0.16em] text-pumice">
          {t.resultLabel} · <span className="text-gold">{level.toUpperCase()}</span>
        </p>
        <h2 ref={headingRef} tabIndex={-1} className="font-display mt-3 text-balance text-[clamp(2.4rem,6vw,4rem)] text-travertine outline-none">
          {title}
        </h2>
        <p className="mt-4 max-w-[52ch] leading-relaxed text-travertine/85">{body}</p>
        {result.kind === "base" && result.missingCount === 1 && <p className="mt-3 text-gold">{t.base.almost}</p>}
        {blocked && <p className="mt-3 border-l-2 border-gold pl-4 text-sm text-pumice">{blocked}</p>}

        <div className="mt-8">
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-pumice">{t.basicsTitle}</h3>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {BASICS.map((b) => {
              const ok = result.met[b];
              return (
                <li key={b} className={`flex items-center gap-3 border px-4 py-3 text-sm ${ok ? "border-granite text-travertine" : "border-gold/60 text-gold"}`}>
                  {ok ? <Check size={18} weight="bold" aria-hidden className="text-gold" /> : <Circle size={18} aria-hidden />}
                  <span>{t.basics[b]}</span>
                  <span className="sr-only">: {ok ? t.met : t.notMet}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={waHref(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2.5 bg-gold px-6 text-sm font-semibold uppercase tracking-[0.08em] text-basalt transition-colors hover:bg-gold-soft active:translate-y-px"
          >
            <WhatsappLogo size={20} weight="fill" aria-hidden />
            {t.waCta}
          </a>
          <Link
            href={skill ? skill.href : skillsHref}
            className="inline-flex min-h-12 items-center justify-center gap-2.5 border border-travertine/70 px-6 text-sm font-semibold uppercase tracking-[0.08em] text-travertine transition-colors hover:border-gold hover:text-gold"
          >
            {skill ? t.seeRoute : t.seeSkills}
            <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
        <button
          type="button"
          onClick={onRestart}
          className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold uppercase tracking-[0.1em] text-pumice hover:text-gold"
        >
          <ArrowCounterClockwise size={16} aria-hidden /> {t.retake}
        </button>
      </div>

      {skill && (
        <div className="relative hidden aspect-[4/5] overflow-hidden border border-granite lg:block">
          <Image src={skill.image} alt={skill.imageAlt} fill sizes="256px" className="object-cover" />
        </div>
      )}
    </div>
  );
}
