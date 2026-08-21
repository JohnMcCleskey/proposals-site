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
  "Customer/pricing workbook or share link — customer price, size/UOM, default ship-to, and AP contact if it is more current than the CSV",
  "Vendor or mill cost list — cost by size/UOM and effective date, if available",
  "Tax status or exemption documentation for active customers, if available",
  "One current QuickBooks PO and one customer invoice screenshot/export — fields visible, no login needed",
  "Two real sent examples each: customer invoice email, vendor PO email, and freight/packing message",
  "A short note from Brittany on any must-check exception or who gives final approval",
];

const GUIDANCE = [
  "We have enough orders to test. The items below close the remaining pricing, cost, tax, QuickBooks-field, and email-draft gaps.",
  "Use a share link or Excel/CSV for current master data. Screenshots or exports are enough for QuickBooks mapping — do not send a login.",
  "If a file shows a cloud icon in OneDrive, double-click it first. The browser cannot upload a placeholder.",
  "Drop or select a file once; it uploads automatically and shows Received. Paste an order or Brittany's exception note if that is easier.",
];

export default function UploadWorkspace({ sessionId }: { sessionId: string }) {
  return (
    <DiscoveryUploadWorkspace
      sessionId={sessionId}
      pathPrefix="supply-pointe"
      handleUploadUrl="/api/supply-pointe/upload"
      shareLinkUrl="/api/supply-pointe/share-link"
      noteUrl="/api/supply-pointe/note"
      noteLabel="Paste an order or Brittany's review note"
      notePlaceholder="Order email, or: Customer · what must be checked · who approves · any exception to the usual rule…"
      materials={STILL_HELPFUL}
      received={RECEIVED}
      guidance={GUIDANCE}
    />
  );
}
