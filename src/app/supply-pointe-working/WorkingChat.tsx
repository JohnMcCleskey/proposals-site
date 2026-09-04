"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import styles from "../supply-pointe-discovery/proposal.module.css";

type ChatTurn = {
  role: "user" | "assistant";
  text: string;
};

const suggestedQuestions = [
  "Why the founding rate?",
  "How do I see time saved?",
  "Could this help me get more customers?",
  "What stays under human control?",
];

export default function WorkingChat() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [conversation, setConversation] = useState<ChatTurn[]>([]);
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const questionRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    questionRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  function closeChat() {
    setOpen(false);
    launcherRef.current?.focus();
  }

  async function submitQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion || isSending) return;
    setIsSending(true);
    setError("");

    try {
      const response = await fetch("/api/supply-pointe-working/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question: trimmedQuestion, history: conversation }),
        cache: "no-store",
      });
      const result: unknown = await response.json();
      if (
        !response.ok ||
        !result ||
        typeof result !== "object" ||
        !("answer" in result) ||
        typeof result.answer !== "string"
      ) {
        const message =
          result && typeof result === "object" && "error" in result && typeof result.error === "string"
            ? result.error
            : "Chat is unavailable. Please try again later.";
        setError(message);
        return;
      }

      const answer = result.answer;
      setConversation((currentConversation) =>
        [
          ...currentConversation,
          { role: "user" as const, text: trimmedQuestion },
          { role: "assistant" as const, text: answer },
        ].slice(-4),
      );
      setQuestion("");
    } catch {
      setError("Chat is unavailable. Please try again later.");
    } finally {
      setIsSending(false);
    }
  }

  function chooseSuggestedQuestion(suggestedQuestion: string) {
    setQuestion(suggestedQuestion);
    setError("");
    questionRef.current?.focus();
  }

  return (
    <div className={styles.floatingChat}>
      {open ? (
        <section className={styles.floatingChatPanel} id="sp-working-chat-panel" aria-labelledby="sp-working-chat-heading">
          <header className={styles.chatHeader}>
            <div>
              <p className={styles.chatEyebrow}>Supply Pointe hosted desk</p>
              <h2 id="sp-working-chat-heading">Ask about this review</h2>
            </div>
            <button aria-label="Close review chat" className={styles.chatClose} onClick={closeChat} type="button">
              <span aria-hidden="true">×</span>
            </button>
          </header>
          <p className={styles.chatIntro}>
            I can explain founding rates, hosting tools, how measurement works, and what is not in this desk yet.
            Answers stay inside this page. No invented hours or new customers.
          </p>
          {conversation.length === 0 ? (
            <div className={styles.suggestedQuestions} aria-label="Suggested questions">
              {suggestedQuestions.map((suggestedQuestion) => (
                <button
                  className={styles.suggestedQuestion}
                  key={suggestedQuestion}
                  onClick={() => chooseSuggestedQuestion(suggestedQuestion)}
                  type="button"
                >
                  {suggestedQuestion}
                </button>
              ))}
            </div>
          ) : (
            <div className={styles.chatConversation} aria-label="Review chat conversation">
              {conversation.map((turn, index) => (
                <p className={turn.role === "user" ? styles.chatQuestion : styles.chatAnswer} key={`${turn.role}-${index}`}>
                  {turn.text}
                </p>
              ))}
            </div>
          )}
          <form className={styles.chatForm} onSubmit={submitQuestion}>
            <label htmlFor="sp-working-question">Your question</label>
            <textarea
              id="sp-working-question"
              maxLength={1_000}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask about rates, tools, measurement, or later ideas."
              ref={questionRef}
              required
              rows={3}
              value={question}
            />
            <button className={styles.chatSubmit} disabled={isSending || !question.trim()} type="submit">
              {isSending ? "Checking this page…" : "Ask a question"}
            </button>
          </form>
          <p className={styles.chatPrivacy}>
            Don&apos;t paste credentials, files, or confidential information. Your question is sent to an AI
            service and answered from this review page only.
          </p>
          <div aria-live="polite" className={styles.chatStatus} role="status">
            {error ? <p className={styles.chatError}>{error}</p> : null}
          </div>
        </section>
      ) : null}
      <button
        aria-controls="sp-working-chat-panel"
        aria-expanded={open}
        className={styles.chatLauncher}
        onClick={() => setOpen(true)}
        ref={launcherRef}
        type="button"
      >
        <span className={styles.chatLauncherMark} aria-hidden="true">
          ?
        </span>
        <span>Ask a question about this review</span>
      </button>
    </div>
  );
}
