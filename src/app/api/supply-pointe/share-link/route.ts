import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { sendGraphEmail } from "@/lib/graph-email";
import {
  isCheckoutSessionId,
  requirePaidSupplyPointeSession,
  SupplyPointeSessionError,
} from "@/lib/supply-pointe-session";
import { isGoogleShareLink } from "@/lib/supply-pointe-upload";

export async function POST(request: Request) {
  let body: { sessionId?: unknown; url?: unknown };

  try {
    body = (await request.json()) as { sessionId?: unknown; url?: unknown };
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const sessionId = typeof body.sessionId === "string" ? body.sessionId : "";
  const url = typeof body.url === "string" ? body.url.trim() : "";

  if (!isCheckoutSessionId(sessionId) || !isGoogleShareLink(url)) {
    return NextResponse.json(
      { error: "Use a Google Drive or Google Sheets https link." },
      { status: 400 },
    );
  }

  try {
    const verifiedSessionId = await requirePaidSupplyPointeSession(sessionId);
    const pathname = `supply-pointe/${verifiedSessionId}/${crypto.randomUUID()}-shared-link.txt`;

    await put(pathname, `Supply Pointe shared material\n${url}\n`, {
      access: "private",
      addRandomSuffix: true,
      contentType: "text/plain",
    });

    await sendGraphEmail(
      "john@stonewave.life",
      "Supply Pointe material link received",
      `Brian shared a Drive/Sheets link for the paid diagnostic.\n\n${url}\n`,
    );

    return NextResponse.json({ status: "received" });
  } catch (error) {
    if (error instanceof SupplyPointeSessionError) {
      return NextResponse.json({ error: "Payment is not confirmed for this session." }, { status: 403 });
    }

    return NextResponse.json({ error: "The share link could not be saved." }, { status: 400 });
  }
}
