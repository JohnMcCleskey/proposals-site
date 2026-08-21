import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

const { createInteraction } = vi.hoisted(() => ({
  createInteraction: vi.fn(),
}));

vi.mock("@google/genai", () => ({
  GoogleGenAI: vi.fn(function GoogleGenAI() {
    return { interactions: { create: createInteraction } };
  }),
}));

import { POST } from "./route";

describe("POST /api/proposal-chat", () => {
  const originalApiKey = process.env.GEMINI_API_KEY;

  beforeEach(() => {
    createInteraction.mockReset();
    process.env.GEMINI_API_KEY = "test-key";
  });

  it("rejects an invalid question without calling Gemini", async () => {
    const response = await POST(
      new Request("http://localhost/api/proposal-chat", {
        method: "POST",
        body: JSON.stringify({ question: "   " }),
      }),
    );

    expect(response.status).toBe(400);
    expect(createInteraction).not.toHaveBeenCalled();
  });

  it("reports configuration problems without revealing credentials", async () => {
    delete process.env.GEMINI_API_KEY;

    const response = await POST(
      new Request("http://localhost/api/proposal-chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question: "What materials are needed to begin?" }),
      }),
    );

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({ error: "Chat is unavailable. Please try again later." });
    expect(createInteraction).not.toHaveBeenCalled();
  });

  it("returns the concrete post-payment path without calling Gemini", async () => {
    const response = await POST(
      new Request("http://localhost/api/proposal-chat", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.2" },
        body: JSON.stringify({ question: "What happens after payment?" }),
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      answer: expect.stringContaining("7–10 business-day diagnostic"),
    });
    expect(createInteraction).not.toHaveBeenCalled();
  });

  it("sends only the bounded proposal request and returns an answer with no-store caching", async () => {
    createInteraction.mockResolvedValue({
      output_text: "The diagnostic is expected to take 7–10 business days. Source: Timing and commercial path",
    });

    const response = await POST(
      new Request("http://localhost/api/proposal-chat", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.1" },
        body: JSON.stringify({ question: "How long does the diagnostic take?" }),
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      answer: "The diagnostic is expected to take 7–10 business days. Source: Timing and commercial path",
    });
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(createInteraction).toHaveBeenCalledWith(
      expect.objectContaining({ input: "How long does the diagnostic take?" }),
    );
  });

  afterAll(() => {
    if (originalApiKey === undefined) delete process.env.GEMINI_API_KEY;
    else process.env.GEMINI_API_KEY = originalApiKey;
  });
});
