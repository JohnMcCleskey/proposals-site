"use client";

import { useId, useState, type ReactNode } from "react";

export type DetailTab = {
  id: string;
  label: string;
  content: ReactNode;
};

export default function DetailsTabs({ tabs }: { tabs: DetailTab[] }) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");
  const baseId = useId();
  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  if (!current) return null;

  return (
    <section id="details" className="bg-paper" aria-label="If you want the details">
      <div className="mx-auto w-full max-w-wrap px-5 py-16 sm:px-8 lg:py-20">
        <p className="eyebrow text-ember-ink">If you want the details</p>
        <h2 className="font-display mt-4 max-w-[24ch] text-balance text-[1.7rem] font-medium leading-[1.15] text-ink sm:text-[2.1rem]">
          Stay here if the first screen was enough. Open a tab only if you have the capacity.
        </h2>

        <div
          role="tablist"
          aria-label="Further detail"
          className="mt-10 flex flex-wrap gap-2"
        >
          {tabs.map((tab) => {
            const selected = tab.id === current.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`${baseId}-${tab.id}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab.id)}
                className={`rounded-full border px-4 py-2 text-[0.88rem] transition-colors ${
                  selected
                    ? "border-ink/20 bg-ink text-paper"
                    : "border-ink/10 bg-paper-bright text-ink/70 hover:border-ink/20 hover:text-ink"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel-${current.id}`}
        aria-labelledby={`${baseId}-${current.id}`}
      >
        {current.content}
      </div>
    </section>
  );
}
