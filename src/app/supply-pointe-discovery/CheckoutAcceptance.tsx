"use client";

import { FormEvent, useState } from "react";
import styles from "./proposal.module.css";

const SUPPLY_POINTE_PRICE_USD = 1500;

export default function CheckoutAcceptance() {
  const [accepted, setAccepted] = useState(false);
  const [acceptedBy, setAcceptedBy] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function startCheckout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!accepted || !acceptedBy.trim()) return;

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/supply-pointe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accepted: true, acceptedBy: acceptedBy.trim() }),
      });
      const result = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !result.url) {
        throw new Error(result.error || "Checkout could not be started.");
      }

      window.location.assign(result.url);
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error ? checkoutError.message : "Checkout could not be started.",
      );
      setSubmitting(false);
    }
  }

  return (
    <form className={styles.acceptanceForm} onSubmit={startCheckout}>
      <div className={styles.scopeChecklist}>
        <p>I have reviewed that this engagement includes:</p>
        <ul>
          <li>7-10 business day working diagnostic built around your real order flow</li>
          <li>Customer, quantity, pricing, and ship-to detail pulled from a real order</li>
          <li>Draft purchase order and packing slip prepared for human review</li>
          <li>No live QuickBooks write, no live inbox connection, nothing sent to a customer automatically</li>
        </ul>
      </div>
      <p className={styles.price}>
        {`$${SUPPLY_POINTE_PRICE_USD.toLocaleString()}`}
        <span> USD · one-time diagnostic</span>
      </p>
      <label className={styles.nameLabel}>
        Name of payer
        <input
          value={acceptedBy}
          onChange={(event) => setAcceptedBy(event.target.value)}
          placeholder="Brian Haverkos"
          required
        />
      </label>
      <label className={styles.checkLabel}>
        <input
          type="checkbox"
          checked={accepted}
          onChange={(event) => setAccepted(event.target.checked)}
        />
        I have read the scope above and want to proceed.
      </label>
      <button
        type="submit"
        className={styles.checkoutButton}
        disabled={!accepted || !acceptedBy.trim() || submitting}
      >
        {submitting ? "Starting checkout…" : "Accept scope and pay"}
      </button>
      {error ? <p className={styles.formError}>{error}</p> : null}
      <p className={styles.formNote}>Secure checkout via Stripe. No card details touch this page.</p>
    </form>
  );
}
