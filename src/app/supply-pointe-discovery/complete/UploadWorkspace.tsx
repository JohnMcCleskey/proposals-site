"use client";

import DiscoveryUploadWorkspace from "@/components/DiscoveryUploadWorkspace";

const MATERIALS = [
  "Franchisee walkthrough video",
  "Google Sheets: paste a view link, or export Excel/CSV",
  "Five to ten varied order examples",
  "Purchase-order and packing-slip templates",
  "QuickBooks screenshots or agreed sandbox/read-only references",
];

export default function UploadWorkspace({ sessionId }: { sessionId: string }) {
  return (
    <DiscoveryUploadWorkspace
      sessionId={sessionId}
      pathPrefix="supply-pointe"
      handleUploadUrl="/api/supply-pointe/upload"
      shareLinkUrl="/api/supply-pointe/share-link"
      materials={MATERIALS}
    />
  );
}
