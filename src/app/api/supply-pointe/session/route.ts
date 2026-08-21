import { NextResponse } from "next/server";
import {
  isCheckoutSessionId,
  requirePaidSupplyPointeSession,
  SupplyPointeSessionError,
} from "@/lib/supply-pointe-session";

export async function GET(request: Request) {
  const sessionId = new URL(request.url).searchParams.get("session_id");

  if (!isCheckoutSessionId(sessionId)) {
    return NextResponse.json({ error: "Invalid session." }, { status: 400 });
  }

  try {
    await requirePaidSupplyPointeSession(sessionId);
    return NextResponse.json({ status: "paid" });
  } catch (error) {
    if (error instanceof SupplyPointeSessionError) {
      return NextResponse.json({ status: "unpaid" });
    }

    return NextResponse.json({ error: "Unable to verify session." }, { status: 400 });
  }
}
