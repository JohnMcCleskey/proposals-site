import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import {
  isCheckoutSessionId,
  requirePaidSupplyPointeSession,
  SupplyPointeSessionError,
} from "@/lib/supply-pointe-session";

const MAX_NOTE_CHARS = 40_000;

export async function POST(request: Request) {
  let body: { sessionId?: unknown; note?: unknown };

  try {
    body = (await request.json()) as { sessionId?: unknown; note?: unknown };
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const sessionId = typeof body.sessionId === "string" ? body.sessionId : "";
  const note = typeof body.note === "string" ? body.note.trim() : "";

  if (!isCheckoutSessionId(sessionId) || note.length < 20) {
    return NextResponse.json(
      { error: "Paste the full order email, at least a couple of sentences." },
      { status: 400 },
    );
  }

  if (note.length > MAX_NOTE_CHARS) {
    return NextResponse.json({ error: "That paste is too long. Split it into a few orders." }, { status: 400 });
  }

  try {
    const verifiedSessionId = await requirePaidSupplyPointeSession(sessionId);
    const pathname = `supply-pointe/${verifiedSessionId}/${crypto.randomUUID()}-order-email.txt`;

    await put(pathname, `Supply Pointe pasted order\n\n${note}\n`, {
      access: "private",
      addRandomSuffix: true,
      contentType: "text/plain; charset=utf-8",
    });

    return NextResponse.json({ status: "received" });
  } catch (error) {
    if (error instanceof SupplyPointeSessionError) {
      return NextResponse.json({ error: "Payment is not confirmed for this session." }, { status: 403 });
    }

    return NextResponse.json({ error: "The email could not be saved." }, { status: 400 });
  }
}
