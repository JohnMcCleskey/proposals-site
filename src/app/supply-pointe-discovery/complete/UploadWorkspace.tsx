"use client";

import DiscoveryUploadWorkspace from "@/components/DiscoveryUploadWorkspace";

const MATERIALS = [
  "Pricing and customer Google Sheet (view link is enough)",
  "Five to ten real order emails: paste them, or save as PDF / .eml",
  "One packing slip and one PO Brittany would call correct",
  "Walkthrough video (already received)",
];

const GUIDANCE = [
  "The sheet Brittany prices from is the one item we cannot start without.",
  "Messy emails are better than tidy ones. Casual, formal, and texted orders all help.",
  "If Outlook will not export, paste the email or print it to PDF. Do not send a .gsheet shortcut.",
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
      materials={MATERIALS}
      guidance={GUIDANCE}
    />
  );
}
