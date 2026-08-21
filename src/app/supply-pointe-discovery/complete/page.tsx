import type { Metadata } from "next";
import { Suspense } from "react";
import CompletionStatus from "./CompletionStatus";

export const metadata: Metadata = {
  title: "Supply Pointe Discovery | StoneWave",
  robots: { index: false, follow: false },
};

export default function CompletionPage() {
  return (
    <Suspense fallback={null}>
      <CompletionStatus />
    </Suspense>
  );
}
