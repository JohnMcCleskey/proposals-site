"use client";

import { useReveal } from "@/lib/useReveal";

export default function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section";
}) {
  const ref = useReveal<HTMLDivElement>(delay);
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
