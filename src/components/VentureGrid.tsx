"use client";

import { VENTURES } from "@/lib/ventures";
import { useReveal } from "@/lib/useReveal";

export default function VentureGrid() {
  return (
    <div className="venture-grid">
      {VENTURES.map((v, i) => (
        <VentureCard key={v.slug} index={i} venture={v} />
      ))}
    </div>
  );
}

function VentureCard({
  venture,
  index,
}: {
  venture: (typeof VENTURES)[number];
  index: number;
}) {
  const ref = useReveal<HTMLElement>(index * 60);
  const live = venture.status === "live";

  const inner = (
    <>
      <div className="venture-top">
        <span className="venture-cat">{venture.category}</span>
        <span className={`venture-status ${live ? "is-live" : "is-soon"}`}>
          <i />
          {live ? "Live" : "Soon"}
        </span>
      </div>

      <h3 className="venture-name">{venture.name}</h3>
      <p className="venture-one">{venture.oneLiner}</p>
      <p className="venture-body">{venture.body}</p>

      <ul className="venture-proof">
        {venture.proof.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>

      <span className="venture-link">
        {live ? (
          <>
            {hostOf(venture.url)} <span aria-hidden="true">↗</span>
          </>
        ) : (
          "In build"
        )}
      </span>
    </>
  );

  const className = `venture-card accent-${venture.accent} ${
    live ? "" : "is-soon"
  }`;

  if (live && venture.url) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={className}
        href={venture.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {inner}
      </a>
    );
  }

  return (
    <div ref={ref as React.Ref<HTMLDivElement>} className={className}>
      {inner}
    </div>
  );
}

function hostOf(url: string | null) {
  if (!url) return "";
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
