import { describe, expect, it } from "vitest";
import {
  GEMINI_FLASH_MODEL,
  OUT_OF_SCOPE_REPLY,
  buildWorkingChatRequest,
  extractWorkingReply,
  getDirectWorkingAnswer,
  normalizeWorkingQuestion,
} from "./supply-pointe-working-chat";

describe("supply-pointe working chat", () => {
  it("confines Gemini to the hosted-desk pack and has no tools", () => {
    const request = buildWorkingChatRequest("Why the founding rate?");
    expect(request.model).toBe(GEMINI_FLASH_MODEL);
    expect(request.system_instruction).toContain("hosted desk");
    expect(request.system_instruction).toContain(OUT_OF_SCOPE_REPLY);
    expect(request).not.toHaveProperty("tools");
  });

  it("answers discount without Gemini", () => {
    const answer = getDirectWorkingAnswer("Why is there a discount?");
    expect(answer).toContain("$6,000");
    expect(answer).toContain("$7,500");
    expect(answer).toContain("Source: Founding rates");
  });

  it("refuses customer-acquisition as in-scope value", () => {
    const answer = getDirectWorkingAnswer("Could this also help me acquire additional customers?");
    expect(answer).toContain("not part of the $6,000");
    expect(answer).toContain("No dollar projection");
  });

  it("refuses meeting scheduling as this desk", () => {
    const answer = getDirectWorkingAnswer("Could it schedule meetings?");
    expect(answer).toContain("not part of this desk");
  });

  it("does not invent hours saved", () => {
    const answer = getDirectWorkingAnswer("How do I see time saved?");
    expect(answer).toContain("will not invent hours saved");
    expect(answer).toContain("pending");
  });

  it("rejects oversized questions", () => {
    expect(normalizeWorkingQuestion("x".repeat(1_001))).toBeNull();
  });

  it("returns out of scope when Gemini omits Source", () => {
    expect(extractWorkingReply({ output_text: "Sure, this will 10x revenue." })).toBe(
      OUT_OF_SCOPE_REPLY,
    );
  });
});
