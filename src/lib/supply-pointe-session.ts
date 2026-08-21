import "server-only";

import Stripe from "stripe";

const SUPPLY_POINTE_ENGAGEMENT = "supplypointe_discovery";

export class SupplyPointeSessionError extends Error {}

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("Stripe is not configured");
  }

  return new Stripe(secretKey);
}

export function isCheckoutSessionId(value: string | null): value is string {
  return Boolean(value && /^cs_[A-Za-z0-9_]+$/.test(value));
}

/**
 * Confirms that an ID belongs to the paid Supply Pointe Discovery checkout.
 * Keep the Stripe response server-side; callers receive only the verified ID.
 */
export async function requirePaidSupplyPointeSession(sessionId: string): Promise<string> {
  if (!isCheckoutSessionId(sessionId)) {
    throw new SupplyPointeSessionError("Invalid session");
  }

  const session = await getStripe().checkout.sessions.retrieve(sessionId);

  if (
    session.metadata?.engagement !== SUPPLY_POINTE_ENGAGEMENT ||
    session.payment_status !== "paid"
  ) {
    throw new SupplyPointeSessionError("Session is not paid for this engagement");
  }

  return session.id;
}
