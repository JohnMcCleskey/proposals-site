import Stripe from "stripe";
import { NextResponse } from "next/server";

const DEFAULT_SITE_URL = "https://www.stonewave.life";
const SCOPE_VERSION = "2026-08-14";

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("Stripe is not configured");
  }

  return new Stripe(secretKey);
}

function checkoutBaseUrl(request: Request) {
  const configured = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
  const fallback = new URL(configured).origin;
  const requestOrigin = request.headers.get("origin");

  if (!requestOrigin) return fallback;

  try {
    return new URL(requestOrigin).origin === fallback
      ? new URL(requestOrigin).origin
      : fallback;
  } catch {
    return fallback;
  }
}

export async function POST(request: Request) {
  let body: { accepted?: unknown; acceptedBy?: unknown };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const acceptedBy =
    typeof body.acceptedBy === "string" ? body.acceptedBy.trim() : "";

  if (body.accepted !== true || !acceptedBy || acceptedBy.length > 120) {
    return NextResponse.json(
      { error: "Scope acceptance and a name are required." },
      { status: 400 },
    );
  }

  const priceId = process.env.SUPPLYPOINTE_DISCOVERY_PRICE_ID;
  if (!priceId) {
    return NextResponse.json(
      { error: "Checkout is not available." },
      { status: 503 },
    );
  }

  try {
    const baseUrl = checkoutBaseUrl(request);
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: "brian.haverkos@supplypointe.com",
      success_url: `${baseUrl}/supply-pointe-discovery/complete?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/supply-pointe-discovery?payment=cancelled`,
      metadata: {
        engagement: "supplypointe_discovery",
        scope_version: SCOPE_VERSION,
        scope_accepted: "true",
        scope_accepted_by: acceptedBy,
        scope_accepted_at: new Date().toISOString(),
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Checkout is not available." },
        { status: 503 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json(
      { error: "Checkout is not available." },
      { status: 503 },
    );
  }
}
