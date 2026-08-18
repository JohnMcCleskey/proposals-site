import Stripe from "stripe";
import { NextResponse } from "next/server";
import { sendGraphEmail } from "@/lib/graph-email";

const DEFAULT_SITE_URL = "https://www.stonewave.life";
const ENGAGEMENT = "supplypointe_discovery";

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("Stripe is not configured");
  }
  return new Stripe(secretKey);
}

function siteBaseUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
}

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ received: true });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      await request.text(),
      signature,
      webhookSecret,
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Only act on our Supply Pointe engagement.
    if (session.metadata?.engagement !== ENGAGEMENT) {
      return NextResponse.json({ received: true });
    }

    const sessionId = session.id;
    const customerEmail =
      session.customer_details?.email || session.customer_email || "";

    if (sessionId && customerEmail) {
      const uploadUrl = `${siteBaseUrl()}/supply-pointe-discovery/complete?session_id=${sessionId}`;
      const subject = "Supply Pointe diagnostic - payment received";
      const body = [
        "<p>Hi Brian,</p>",
        "<p>Your payment for the Supply Pointe Paid Discovery &amp; Working Diagnostic has been received. Thank you.</p>",
        `<p>The next step is to <a href="${uploadUrl}">share the working source material</a>. You can paste Google Sheet links or upload Excel/CSV and the walkthrough video from any device, whenever you're ready.</p>`,
        "<p>Once those are in, we'll start building against your real data. If anything is unclear, just reply to this email.</p>",
        "<p>John<br>StoneWave</p>",
      ].join("");

      await sendGraphEmail(customerEmail, subject, body, { html: true });
    }
  }

  return NextResponse.json({ received: true });
}
