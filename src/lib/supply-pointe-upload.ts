export const SUPPLY_POINTE_ALLOWED_EXTENSIONS = new Set([
  "xlsx",
  "xlsm",
  "xlsb",
  "xls",
  "ods",
  "csv",
  "tsv",
  "txt",
  "pdf",
  "docx",
  "doc",
  "zip",
  "mp4",
  "mov",
  "m4v",
  "webm",
  "jpg",
  "jpeg",
  "png",
  "gif",
  "webp",
  "heic",
  "heif",
  "tif",
  "tiff",
  "bmp",
]);

export const SUPPLY_POINTE_ALLOWED_CONTENT_TYPES = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
  "application/vnd.ms-excel.sheet.macroEnabled.12",
  "application/vnd.ms-excel.sheet.binary.macroEnabled.12",
  "application/vnd.oasis.opendocument.spreadsheet",
  "text/csv",
  "text/tab-separated-values",
  "text/plain",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
  "application/zip",
  "application/octet-stream",
  "video/mp4",
  "video/quicktime",
  "video/x-m4v",
  "video/webm",
  "image/*",
];

const SHARE_HOSTS = new Set([
  "docs.google.com",
  "drive.google.com",
  "sheets.google.com",
]);

export function getUploadSessionId(clientPayload: string | null): string {
  if (!clientPayload) throw new Error("Invalid upload authorization");

  try {
    const payload: unknown = JSON.parse(clientPayload);
    if (
      !payload ||
      typeof payload !== "object" ||
      !Object.hasOwn(payload, "sessionId") ||
      typeof (payload as { sessionId?: unknown }).sessionId !== "string"
    ) {
      throw new Error("Invalid upload authorization");
    }

    return (payload as { sessionId: string }).sessionId;
  } catch {
    throw new Error("Invalid upload authorization");
  }
}

export function isAllowedUploadPathname(pathname: string, sessionId: string): boolean {
  const prefix = `supply-pointe/${sessionId}/`;
  if (!pathname.startsWith(prefix)) return false;

  const filename = pathname.slice(prefix.length);
  if (filename.length === 0) return false;
  if (/[\u0000-\u001f\\/]/.test(filename)) return false;

  const lastDot = filename.lastIndexOf(".");
  if (lastDot <= 0 || lastDot === filename.length - 1) return false;

  const name = filename.slice(0, lastDot);
  const extension = filename.slice(lastDot + 1).toLowerCase();

  if (name.length === 0 || !/^[a-zA-Z0-9_-]+$/.test(name)) return false;
  return SUPPLY_POINTE_ALLOWED_EXTENSIONS.has(extension);
}

export function isGoogleShareLink(value: string): boolean {
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:") return false;
    return SHARE_HOSTS.has(url.hostname);
  } catch {
    return false;
  }
}
