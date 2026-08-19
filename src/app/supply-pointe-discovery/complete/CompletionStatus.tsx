"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "../proposal.module.css";
import UploadWorkspace from "./UploadWorkspace";

type State = "checking" | "paid" | "unpaid" | "unverifiable";

export default function CompletionStatus() {
  const searchParams = useSearchParams();
  const [state, setState] = useState<State>("checking");
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) { setState("unverifiable"); return; }

    fetch(`/api/supply-pointe/session?session_id=${encodeURIComponent(sessionId)}`)
      .then(async (response) => {
        if (!response.ok) throw new Error("unverifiable");
        return response.json() as Promise<{ status?: string }>;
      })
      .then((result) => setState(result.status === "paid" ? "paid" : "unpaid"))
      .catch(() => setState("unverifiable"));
  }, [sessionId]);

  const paid = state === "paid";

  return (
    <main className={styles.page}>
      <div className={styles.topline}><span>StoneWave</span><span>Supply Pointe Discovery</span></div>
      <section className={styles.hero}>
        {state === "checking" ? <><p className={styles.meta}>Confirming payment</p><h1 className="font-display">Checking your payment status.</h1><p className={styles.lede}>Please keep this page open while we confirm the Checkout Session.</p></> : null}
        {paid ? <><p className={styles.meta}>Payment confirmed</p><h1 className="font-display">We have your first materials.</h1><p className={styles.lede}>The video, ledger CSV, packing slip, sample POs, and several emails are in. If anything is still sitting in OneDrive, open it so it downloads, then drop it here. The original discovery proposal is still available below.</p><p className={styles.lede} style={{ marginTop: 18 }}><a href="/supply-pointe-discovery">Review the original discovery proposal</a></p></> : null}
        {state === "unpaid" ? <><p className={styles.meta}>Payment not confirmed</p><h1 className="font-display">We could not confirm a completed payment.</h1><p className={styles.lede}>No upload access has been enabled. You can return to the proposal to review the scope or complete payment.</p></> : null}
        {state === "unverifiable" ? <><p className={styles.meta}>Status unavailable</p><h1 className="font-display">We could not verify this payment session.</h1><p className={styles.lede}>No upload access has been enabled. Please return to the proposal if you need to review or restart checkout.</p></> : null}
      </section>
      {paid && sessionId ? <UploadWorkspace sessionId={sessionId} /> : null}
      {paid ? <p style={{ maxWidth: 700, margin: "32px auto 0" }}><a href="/supply-pointe-discovery">Open the original discovery proposal</a></p> : null}
      {!paid && state !== "checking" ? <p style={{ maxWidth: 700, margin: "48px auto 0" }}><a href="/supply-pointe-discovery">Return to the proposal</a></p> : null}
      <footer className={styles.footer}>StoneWave · Supply Pointe Paid Discovery &amp; Working Diagnostic</footer>
    </main>
  );
}
