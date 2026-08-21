import { describe, expect, it } from "vitest";
import { createProposalChatRateLimiter } from "./proposal-chat-rate-limit";

describe("proposal chat rate limiter", () => {
  it("allows a bounded number of requests per visitor in a time window", () => {
    const limit = createProposalChatRateLimiter({ maxRequests: 2, windowMs: 60_000 });

    expect(limit.check("198.51.100.25", 1_000)).toEqual({ allowed: true });
    expect(limit.check("198.51.100.25", 2_000)).toEqual({ allowed: true });
    expect(limit.check("198.51.100.25", 3_000)).toEqual({ allowed: false, retryAfterSeconds: 58 });
  });

  it("expires the visitor window rather than retaining it indefinitely", () => {
    const limit = createProposalChatRateLimiter({ maxRequests: 1, windowMs: 60_000 });

    expect(limit.check("198.51.100.25", 1_000).allowed).toBe(true);
    expect(limit.check("198.51.100.25", 61_001).allowed).toBe(true);
  });
});
