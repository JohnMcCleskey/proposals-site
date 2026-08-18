import { describe, expect, it } from "vitest";
import {
  getUploadSessionId,
  isAllowedUploadPathname,
  isGoogleShareLink,
} from "./supply-pointe-upload";

const sessionId = "cs_live_a1fTwWmgulJXHhEWpj7jk1wK8OMjtGckWfHatncGP4t48FUMQxts3iNRjc";

describe("supply pointe upload helpers", () => {
  it("accepts a uuid-prefixed spreadsheet path", () => {
    expect(
      isAllowedUploadPathname(
        `supply-pointe/${sessionId}/66b0b4ef-bc4f-4606-a4b1-6451de725eaa-pricing.xlsx`,
        sessionId,
      ),
    ).toBe(true);
  });

  it("accepts xlsm and zip exports that operators actually send", () => {
    expect(
      isAllowedUploadPathname(
        `supply-pointe/${sessionId}/abc-customers.xlsm`,
        sessionId,
      ),
    ).toBe(true);
    expect(
      isAllowedUploadPathname(
        `supply-pointe/${sessionId}/abc-exports.zip`,
        sessionId,
      ),
    ).toBe(true);
  });

  it("accepts saved Outlook and Apple Mail emails", () => {
    expect(
      isAllowedUploadPathname(
        `supply-pointe/${sessionId}/abc-order.eml`,
        sessionId,
      ),
    ).toBe(true);
    expect(
      isAllowedUploadPathname(
        `supply-pointe/${sessionId}/abc-order.msg`,
        sessionId,
      ),
    ).toBe(true);
  });

  it("rejects a native Google Sheet shortcut", () => {
    expect(
      isAllowedUploadPathname(
        `supply-pointe/${sessionId}/abc-pricing.gsheet`,
        sessionId,
      ),
    ).toBe(false);
  });

  it("reads the session id from the client payload", () => {
    expect(getUploadSessionId(JSON.stringify({ sessionId }))).toBe(sessionId);
  });

  it("accepts only https Google Drive and Sheets hosts", () => {
    expect(isGoogleShareLink("https://docs.google.com/spreadsheets/d/abc/edit")).toBe(true);
    expect(isGoogleShareLink("https://drive.google.com/file/d/abc/view")).toBe(true);
    expect(isGoogleShareLink("http://docs.google.com/spreadsheets/d/abc")).toBe(false);
    expect(isGoogleShareLink("https://evil.example/docs.google.com")).toBe(false);
  });
});
