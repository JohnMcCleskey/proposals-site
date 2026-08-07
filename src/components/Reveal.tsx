"use client";

import { useReveal } from "@/lib/useReveal";

export default function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "figure";
}) {
  const ref = useReveal<HTMLDivElement>(delay);
  return (
    // @ts-expect-error dynamic tag shares the div ref shape we need
    <Tag ref={ref} className={`rv ${className}`}>
      {children}
    </Tag>
  );
}
