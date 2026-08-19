"use client";

import DiscoveryUploadWorkspace from "@/components/DiscoveryUploadWorkspace";

const RECEIVED = [
  "Walkthrough video",
  "Google share link",
  "Ledger CSV",
  "Packing slip (Word and PDF)",
  "Sample POs: Nifco 1156072, 5100468954, and 348996",
  "Pallets and freight email",
  "Several pasted order emails",
];

const STILL_HELPFUL = [
  "Pricing workbook Excel if it is different from the ledger CSV",
  "Route Planner — Build Prompt (Word)",
  "May meeting notes (Word)",
  "Claude training handout — open it first so OneDrive downloads it, then drop it",
  "A few more messy order emails, if they are handy",
];

const GUIDANCE = [
  "We have enough to start reading orders against the ledger. Extra files make the draft closer to Brittany's desk.",
  "If a file shows a cloud icon in OneDrive, double-click it first. The browser cannot upload a placeholder.",
  "Refresh this page, then drop or paste. You should see a green Received line.",
  "Skip passwords, QuickBooks logins, and API keys.",
];

export default function UploadWorkspace({ sessionId }: { sessionId: string }) {
  return (
    <DiscoveryUploadWorkspace
      sessionId={sessionId}
      pathPrefix="supply-pointe"
      handleUploadUrl="/api/supply-pointe/upload"
      shareLinkUrl="/api/supply-pointe/share-link"
      noteUrl="/api/supply-pointe/note"
      materials={STILL_HELPFUL}
      received={RECEIVED}
      guidance={GUIDANCE}
    />
  );
}
