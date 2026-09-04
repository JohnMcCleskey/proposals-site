import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { proposalChatRateLimiter } from "@/lib/proposal-chat-rate-limit";
import {
  buildWorkingChatRequest,
  extractWorkingReply,
  getDirectWorkingAnswer,
  normalizeWorkingHistory,
  normalizeWorkingQuestion,
} from "@/lib/supply-pointe-working-chat";

export const runtime = "nodejs";

function json(body: Record<string, string>, status: number) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function visitorId(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "anonymous";
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return json({ error: "Please enter a question about this review page." }, 400);
  }

  const payload: Record<string, unknown> =
    body && typeof body === "object" && !Array.isArray(body) ? (body as Record<string, unknown>) : {};
  const question = normalizeWorkingQuestion(payload?.question);
  if (!question) return json({ error: "Please enter a question of up to 1,000 characters." }, 400);
  const history = normalizeWorkingHistory(payload?.history);

  const rateLimit = proposalChatRateLimiter.check(visitorId(request));
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Please wait a few minutes before asking another question." },
      {
        status: 429,
        headers: {
          "Cache-Control": "no-store",
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
      },
    );
  }

  const directAnswer = getDirectWorkingAnswer(question);
  if (directAnswer) return json({ answer: directAnswer }, 200);

  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) return json({ error: "Chat is unavailable. Please try again later." }, 503);

  try {
    const client = new GoogleGenAI({ apiKey });
    const interaction = await client.interactions.create(buildWorkingChatRequest(question, history));
    return json({ answer: extractWorkingReply(interaction) }, 200);
  } catch {
    return json({ error: "Chat is unavailable. Please try again later." }, 502);
  }
}
