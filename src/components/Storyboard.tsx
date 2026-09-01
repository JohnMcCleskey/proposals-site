"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

/**
 * The centerpiece. A scroll-pinned, film-paced storyboard telling one
 * arc: diagnosis, ranked recommendations, measured gains. Eight beats.
 *
 * Mechanics: GSAP ScrollTrigger pin + scrub, transform/opacity only.
 * Server-rendered as a static stacked storyboard (readable without JS
 * and under prefers-reduced-motion); upgraded to the pinned sequence
 * after mount when motion is allowed. A plain-text version of the arc
 * sits below the section for anyone who wants it as prose.
 */

type Beat = {
  id: string;
  label: string;
  title: string;
  line: string;
  visual: React.ReactNode;
};

/* ————————————————————————— vignettes (pure DOM, no images) */

function El({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`sb-el ${className}`}>{children}</div>;
}

function VignetteMess() {
  const notes = [
    { t: "any update on the Hartley quote?", r: "-3deg", x: "0%" },
    { t: "resending the PDF, third time", r: "2deg", x: "34%" },
    { t: "who owns this now?", r: "-1.5deg", x: "6%" },
    { t: "found it in my spam", r: "3deg", x: "40%" },
    { t: "call me, easier to explain", r: "-2.5deg", x: "10%" },
  ];
  return (
    <div className="relative h-[16.5rem] w-full max-w-[24rem] sm:h-[18rem]">
      {notes.map((n, i) => (
        <El key={n.t} className="absolute w-[13rem] sm:w-[14.5rem]" >
          <div
            className="rounded-xl border border-paper/15 bg-ink-raise px-3.5 py-2.5 text-[0.8rem] text-paper/75 shadow-ink-card"
            style={{
              transform: `rotate(${n.r})`,
              // Never lets a note's right edge escape the column.
              marginLeft: `min(${n.x}, calc(100% - 14.6rem))`,
              marginTop: `${i * 3.1}rem`,
              position: "absolute",
              top: 0,
            }}
          >
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-ember/80 align-middle" />
            {n.t}
          </div>
        </El>
      ))}
    </div>
  );
}

function VignetteDiagnostic() {
  return (
    <div className="w-full max-w-[22rem]">
      <El>
        <div className="bezel-ink p-5">
          <p className="eyebrow text-paper/60">Diagnostic · 4 of 11</p>
          <p className="mt-3 text-[1.02rem] leading-snug text-paper">
            When a new job comes in, where does it land first?
          </p>
          <div className="mt-4 space-y-2">
            {["A shared inbox", "One person's phone", "Depends who's in"].map(
              (o, i) => (
                <div
                  key={o}
                  className={`rounded-lg border px-3.5 py-2 text-[0.85rem] ${
                    i === 1
                      ? "border-ember/60 bg-ember/10 text-paper"
                      : "border-paper/12 text-paper/60"
                  }`}
                >
                  {o}
                </div>
              ),
            )}
          </div>
        </div>
      </El>
      <El>
        <p className="mt-3 text-center font-mono text-[0.68rem] uppercase tracking-[0.14em] text-paper/60">
          8 to 12 minutes · private · no purchase
        </p>
      </El>
    </div>
  );
}

function VignetteBrief() {
  const findings = [
    { n: "01", t: "Quote follow-up has no owner", chip: "Ready now", hot: true },
    { n: "02", t: "Invoicing waits for month-end", chip: "Ready now", hot: true },
    { n: "03", t: "Job data retyped three times", chip: "Needs owner", hot: false },
  ];
  return (
    <div className="w-full max-w-[24rem]">
      <El>
        <p className="eyebrow mb-3 text-paper/60">Opportunity brief · ranked</p>
      </El>
      <div className="space-y-2.5">
        {findings.map((f) => (
          <El key={f.n}>
            <div className="flex items-center gap-3.5 rounded-xl border border-paper/12 bg-ink-raise/70 px-4 py-3">
              <span className="ledger-num text-[0.8rem] text-ember">{f.n}</span>
              <span className="flex-1 text-[0.88rem] text-paper/85">{f.t}</span>
              <span
                className={`rounded-md px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.08em] ${
                  f.hot
                    ? "bg-proof/25 text-[#9fceb2]"
                    : "bg-paper/10 text-paper/55"
                }`}
              >
                {f.chip}
              </span>
            </div>
          </El>
        ))}
      </div>
      <El>
        <p className="mt-3 text-[0.78rem] italic text-paper/50">
          Both top findings start without buying anything.
        </p>
      </El>
    </div>
  );
}

function VignetteRecs() {
  const lanes = [
    { t: "Do it yourselves", d: "The playbook is in the brief." },
    { t: "We implement", d: "Scoped separately. Optional." },
    { t: "Add a tool", d: "Only where process alone stalls." },
  ];
  return (
    <div className="w-full max-w-[24rem]">
      <div className="space-y-2.5">
        {lanes.map((l, i) => (
          <El key={l.t}>
            <div className="flex items-baseline justify-between gap-4 rounded-xl border border-paper/12 bg-ink-raise/70 px-4 py-3.5">
              <span className="text-[0.92rem] font-medium text-paper">
                {l.t}
              </span>
              <span className="text-right text-[0.78rem] text-paper/55">
                {l.d}
              </span>
            </div>
          </El>
        ))}
      </div>
      <El>
        <p className="mt-3.5 border-l-2 border-ember/70 pl-3 text-[0.82rem] text-paper/65">
          The ranking is the same whichever lane you pick. That is the point.
        </p>
      </El>
    </div>
  );
}

function VignetteAdoption() {
  const items = [
    "Quote queue owned by one person",
    "Intake form replaces the relay",
    "Invoice drafted on delivery day",
  ];
  return (
    <div className="w-full max-w-[22rem]">
      <El>
        <p className="eyebrow mb-3 text-paper/60">Adoption log · week 3</p>
      </El>
      <div className="space-y-2.5">
        {items.map((t) => (
          <El key={t}>
            <div className="flex items-center gap-3 rounded-xl border border-paper/12 bg-ink-raise/70 px-4 py-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-proof/30">
                <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                  <path
                    d="M1.5 5.5 L4 8 L8.5 2.5"
                    fill="none"
                    stroke="#9fceb2"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-[0.88rem] text-paper/85">{t}</span>
            </div>
          </El>
        ))}
      </div>
      <El>
        <p className="mt-3 text-[0.78rem] text-paper/50">
          The retest only counts what was actually adopted.
        </p>
      </El>
    </div>
  );
}

function VignetteRetest() {
  const rows = [
    { m: "Same-day follow-up", b: "31%", r: "74%", d: "+43 pts" },
    { m: "Owner hours in handoffs", b: "11.5 h", r: "7.2 h", d: "-4.3 h" },
    { m: "Invoice to cash", b: "38 d", r: "29 d", d: "-9 d" },
  ];
  return (
    <div className="w-full max-w-[24rem]">
      <El>
        <div className="mb-2.5 flex items-center justify-between">
          <p className="eyebrow text-paper/60">Retest vs baseline</p>
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.1em] text-paper/60">
            Illustrative scenario
          </p>
        </div>
      </El>
      <div className="overflow-hidden rounded-xl border border-paper/12">
        {rows.map((r, i) => (
          <El key={r.m}>
            <div
              className={`grid grid-cols-[1fr_auto_auto] items-center gap-2 bg-ink-raise/70 px-4 py-3 sm:grid-cols-[1fr_auto_auto_auto] sm:gap-3 ${
                i > 0 ? "border-t border-paper/10" : ""
              }`}
            >
              <span className="text-[0.82rem] text-paper/80">{r.m}</span>
              <span className="ledger-num text-[0.8rem] text-paper/60">
                {r.b}
              </span>
              <span aria-hidden="true" className="hidden text-paper/35 sm:inline">&rarr;</span>
              <span className="ledger-num text-[0.86rem] font-semibold text-[#9fceb2]">
                {r.r}
                <span className="ml-2 rounded bg-proof/25 px-1.5 py-0.5 text-[0.62rem]">
                  {r.d}
                </span>
              </span>
            </div>
          </El>
        ))}
      </div>
    </div>
  );
}

function VignetteApproval() {
  return (
    <div className="w-full max-w-[22rem]">
      <El>
        <div className="bezel-ink p-5">
          <div className="flex items-center justify-between">
            <p className="eyebrow text-paper/60">Awaiting review</p>
            <span className="rounded-md bg-ember/25 px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.08em] text-paper/85">
              Draft
            </span>
          </div>
          <p className="mt-3 text-[0.92rem] font-medium text-paper">
            Renewal email to Hartley Construction
          </p>
          <p className="mt-1.5 text-[0.8rem] leading-relaxed text-paper/55">
            Hi Sam, your service agreement lapses on the 14th. Same terms as
            last year, one price adjustment flagged below.
          </p>
          <div className="mt-4 flex gap-2">
            <span className="rounded-lg bg-proof px-3.5 py-1.5 text-[0.78rem] font-medium text-paper-bright">
              Approve
            </span>
            <span className="rounded-lg border border-paper/20 px-3.5 py-1.5 text-[0.78rem] text-paper/70">
              Edit
            </span>
            <span className="rounded-lg border border-paper/20 px-3.5 py-1.5 text-[0.78rem] text-paper/70">
              Hold
            </span>
          </div>
        </div>
      </El>
      <El>
        <p className="mt-3 text-center text-[0.8rem] text-paper/55">
          Nothing sends itself. A person signs off, every time.
        </p>
        <p className="mt-1.5 text-center font-mono text-[0.6rem] uppercase tracking-[0.12em] text-paper/60">
          Illustrative example
        </p>
      </El>
    </div>
  );
}

function VignettePayoff() {
  const wins = [
    { k: "4+ hrs", v: "back in the owner's week" },
    { k: "1 page", v: "of proof for a partner or board" },
    { k: "0 tools", v: "bought before they earned their place" },
  ];
  return (
    <div className="w-full max-w-[22rem] space-y-2.5">
      {wins.map((w) => (
        <El key={w.k}>
          <div className="flex items-baseline gap-4 rounded-xl border border-paper/12 bg-ink-raise/70 px-4 py-3.5">
            <span className="ledger-num min-w-[4.2rem] text-[1.2rem] font-semibold text-ember">
              {w.k}
            </span>
            <span className="text-[0.88rem] text-paper/80">{w.v}</span>
          </div>
        </El>
      ))}
      <El>
        <p className="pt-1 text-center font-mono text-[0.6rem] uppercase tracking-[0.12em] text-paper/60">
          Illustrative scenario
        </p>
      </El>
    </div>
  );
}

/* ————————————————————————— beats */

const BEATS: Beat[] = [
  {
    id: "mess",
    label: "The week now",
    title: "Everything still waits on you.",
    line:
      "Same facts live in a form, a thread, a spreadsheet. Friday only works if you are around.",
    visual: <VignetteMess />,
  },
  {
    id: "diagnostic",
    label: "A quiet look",
    title: "A few plain questions about where work actually gets stuck.",
    line: "Private. Nothing to buy.",
    visual: <VignetteDiagnostic />,
  },
  {
    id: "brief",
    label: "What is worth touching",
    title: "Two or three drains, not a list of everything wrong.",
    line: "Most first changes do not require buying anything.",
    visual: <VignetteBrief />,
  },
  {
    id: "recs",
    label: "Your call on how",
    title: "You can do it, we can put help under it, or a tool can come in only if it earns its place.",
    line: "The ranking does not change with the invoice.",
    visual: <VignetteRecs />,
  },
  {
    id: "adoption",
    label: "What actually stuck",
    title: "Small changes, named people, in the routine.",
    line: "We only count what lasted.",
    visual: <VignetteAdoption />,
  },
  {
    id: "retest",
    label: "The week again",
    title: "Same questions as the start.",
    line: "Did it still need you to remember?",
    visual: <VignetteRetest />,
  },
  {
    id: "gate",
    label: "You still decide",
    title: "Nothing sends or spends without you.",
    line: "That does not change.",
    visual: <VignetteApproval />,
  },
  {
    id: "payoff",
    label: "More of you left",
    title: "More of the week for judgment and relationships.",
    line: "Less for chasing and retyping.",
    visual: <VignettePayoff />,
  },
];

/* ————————————————————————— component */

export default function Storyboard() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLSpanElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let mm:
      | {
          add: (
            query: string,
            callback: () => void | (() => void),
          ) => unknown;
          revert: () => void;
        }
      | undefined;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !wrapRef.current || !stageRef.current) return;

      gsap.registerPlugin(ScrollTrigger);
      // Mobile URL-bar show/hide must not re-measure the pin distance.
      ScrollTrigger.config({ ignoreMobileResize: true });

      mm = gsap.matchMedia();
      // Pin only when motion is allowed AND the viewport is tall enough
      // to hold the fixed stage; short viewports (landscape phones,
      // squat laptops) keep the static stacked storyboard instead of a
      // pinned stage that would clip its own content.
      mm.add(
        "(prefers-reduced-motion: no-preference) and (min-height: 40rem)",
        () => {
          if (cancelled || !wrapRef.current || !stageRef.current) return;

          // Commit the pinned layout synchronously so GSAP never
          // measures the static fallback (that race pins the wrong
          // height).
          flushSync(() => setPinned(true));

          const scenes = gsap.utils.toArray<HTMLElement>(
            ".scene",
            wrapRef.current,
          );
          const SCENE = 3.2; // timeline units per beat
          const TOTAL = BEATS.length * SCENE;
          const tl = gsap.timeline({
            defaults: { ease: "power2.out" },
            scrollTrigger: {
              trigger: wrapRef.current,
              start: "top top",
              end: `+=${BEATS.length * 92}%`,
              pin: stageRef.current,
              scrub: 0.65,
              anticipatePin: 1,
              onUpdate: (self) => {
                const idx = Math.max(
                  0,
                  Math.min(
                    BEATS.length - 1,
                    Math.floor(self.progress * BEATS.length + 0.05),
                  ),
                );
                // Only the on-screen beat accepts pointer interaction.
                scenes.forEach((s, n) =>
                  s.classList.toggle("scene-active", n === idx),
                );
                if (counterRef.current) {
                  counterRef.current.textContent = `0${idx + 1} / 0${BEATS.length}`;
                }
                if (barRef.current) {
                  barRef.current.style.transform = `scaleX(${self.progress})`;
                }
              },
            },
          });

          scenes.forEach((scene, i) => {
            const pos = i * SCENE;
            const els = scene.querySelectorAll(".sb-el");

            if (i === 0) {
              gsap.set(scene, { opacity: 1 });
              tl.fromTo(
                els,
                { opacity: 0, y: 26 },
                { opacity: 1, y: 0, stagger: 0.14, duration: 0.7 },
                pos,
              );
            } else {
              // Incoming starts the moment the outgoing begins its exit,
              // so their alpha curves cross above half strength and the
              // stage never reads as empty.
              tl.fromTo(
                scene,
                { opacity: 0, y: 46, scale: 0.985 },
                { opacity: 1, y: 0, scale: 1, duration: 0.9 },
                pos - 0.55,
              );
              tl.fromTo(
                els,
                { opacity: 0, y: 26 },
                { opacity: 1, y: 0, stagger: 0.12, duration: 0.6 },
                pos - 0.25,
              );
            }
            if (i < scenes.length - 1) {
              tl.to(
                scene,
                { opacity: 0, y: -42, scale: 0.99, duration: 0.55 },
                pos + SCENE - 0.55,
              );
            }
          });

          // Pad to exactly TOTAL so scroll progress maps linearly onto
          // beat indices for the counter.
          tl.to({}, { duration: 0.001 }, TOTAL - 0.001);

          ScrollTrigger.refresh();
          // Re-measure once web fonts settle so pin distances stay exact.
          document.fonts?.ready.then(() => {
            if (!cancelled) ScrollTrigger.refresh();
          });

          return () => {
            // Condition stopped matching: back to the static stack.
            if (!cancelled) setPinned(false);
          };
        },
      );
    })();

    return () => {
      cancelled = true;
      mm?.revert();
    };
  }, []);

  return (
    <section id="story" aria-label="How the week can change" className="ink-surface relative">
      <div ref={wrapRef} className={pinned ? "" : "storyboard-static"}>
        <div
          ref={stageRef}
          className={
            pinned
              ? "relative flex h-[100svh] min-h-[38rem] flex-col overflow-hidden"
              : "relative flex flex-col"
          }
        >
          {/* section header */}
          <div className="mx-auto w-full max-w-wrap px-5 pt-20 sm:px-8 lg:pt-24">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="eyebrow text-ember">The week, after</p>
                <h2 className="font-display mt-4 max-w-[28ch] text-balance text-[1.9rem] font-medium leading-[1.12] text-paper sm:text-[2.5rem]">
                  Here is what that looks like when the week is no longer waiting on you to remember.
                </h2>
              </div>
              {pinned && (
                <div className="hidden shrink-0 items-center gap-4 pb-1 sm:flex">
                  <span
                    ref={counterRef}
                    className="ledger-num text-[0.8rem] text-paper/50"
                  >
                    01 / 0{BEATS.length}
                  </span>
                  <div className="h-px w-28 overflow-hidden bg-paper/15">
                    <div
                      ref={barRef}
                      className="h-full w-full origin-left bg-ember"
                      style={{ transform: "scaleX(0)" }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* scenes */}
          <div className="relative mx-auto w-full max-w-wrap flex-1 px-5 sm:px-8">
            {BEATS.map((b, i) => (
              <article
                key={b.id}
                className="scene"
                aria-label={`Beat ${i + 1}: ${b.label}`}
              >
                <div className="grid w-full items-center gap-6 px-5 py-8 sm:gap-8 sm:px-8 sm:py-12 md:grid-cols-2 md:gap-14">
                  <div className="order-2 md:order-1">
                    <El>
                      <p className="eyebrow flex items-center gap-2.5 text-paper/60">
                        <span className="ledger-num text-ember">
                          0{i + 1}
                        </span>
                        {b.label}
                      </p>
                    </El>
                    <El>
                      <h3 className="font-display mt-4 text-balance text-[1.6rem] font-medium leading-[1.15] text-paper sm:text-[2.05rem]">
                        {b.title}
                      </h3>
                    </El>
                    <El>
                      <p className="mt-4 max-w-[24rem] text-pretty text-[0.98rem] leading-relaxed text-paper/60">
                        {b.line}
                      </p>
                    </El>
                  </div>
                  <div className="order-1 flex justify-center md:order-2 md:justify-end">
                    {b.visual}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* prose alternative, always present */}
      <div className="relative border-t border-paper/10">
        <div className="mx-auto w-full max-w-wrap px-5 py-8 sm:px-8">
          <p className="eyebrow mb-3 text-paper/55">The story in one paragraph</p>
          <p className="max-w-[62ch] text-[0.9rem] leading-relaxed text-paper/55">
            The company still lives in one head. A short private diagnostic
            finds the repeatable drains. You get two or three things worth
            touching, and you choose whether to do them yourself, have us put
            help under them, or add a tool only if it earns its place. What
            lasts gets counted. You still approve anything that sends or
            spends. The point is more of you left for judgment and
            relationships.
          </p>
        </div>
      </div>
    </section>
  );
}
