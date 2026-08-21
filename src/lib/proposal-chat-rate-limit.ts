type RateLimitConfig = {
  maxRequests: number;
  windowMs: number;
};

type RateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterSeconds: number };

type VisitorWindow = {
  startedAt: number;
  requests: number;
};

export function createProposalChatRateLimiter({
  maxRequests,
  windowMs,
}: RateLimitConfig): { check: (visitorId: string, now?: number) => RateLimitResult } {
  const visitors = new Map<string, VisitorWindow>();

  return {
    check(visitorId: string, now = Date.now()): RateLimitResult {
      visitors.forEach((window, id) => {
        if (now - window.startedAt >= windowMs) visitors.delete(id);
      });

      const current = visitors.get(visitorId);
      if (!current) {
        visitors.set(visitorId, { startedAt: now, requests: 1 });
        return { allowed: true };
      }

      if (current.requests >= maxRequests) {
        return {
          allowed: false,
          retryAfterSeconds: Math.ceil((current.startedAt + windowMs - now) / 1_000),
        };
      }

      current.requests += 1;
      return { allowed: true };
    },
  };
}

export const proposalChatRateLimiter = createProposalChatRateLimiter({
  maxRequests: 8,
  windowMs: 10 * 60 * 1_000,
});
