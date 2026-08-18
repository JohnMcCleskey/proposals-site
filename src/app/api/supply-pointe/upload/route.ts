import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { requirePaidSupplyPointeSession } from "@/lib/supply-pointe-session";
import {
  getUploadSessionId,
  isAllowedUploadPathname,
  SUPPLY_POINTE_ALLOWED_CONTENT_TYPES,
} from "@/lib/supply-pointe-upload";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as HandleUploadBody;

    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        const suppliedSessionId = getUploadSessionId(clientPayload);
        const sessionId = await requirePaidSupplyPointeSession(suppliedSessionId);

        if (!isAllowedUploadPathname(pathname, sessionId)) {
          throw new Error("That file type is not accepted. Export Google Sheets as Excel or CSV, or paste a share link.");
        }

        return {
          allowedContentTypes: SUPPLY_POINTE_ALLOWED_CONTENT_TYPES,
          addRandomSuffix: true,
          allowOverwrite: false,
          maximumSizeInBytes: 500 * 1024 * 1024,
        };
      },
      onUploadCompleted: async () => {
        // The diagnostic workspace intentionally does not create a separate
        // application record for uploads.
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload authorization unavailable.";
    return NextResponse.json(
      { error: message || "Upload authorization unavailable." },
      { status: 400 },
    );
  }
}
