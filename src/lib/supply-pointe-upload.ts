export const SUPPLY_POINTE_ALLOWED_EXTENSIONS = new Set([
  "xlsx",
  "xlsm",
  "xlsb",
  "xls",
  "xltx",
  "ods",
  "csv",
  "tsv",
  "txt",
  "rtf",
  "pdf",
  "docx",
  "doc",
  "docm",
  "dot",
  "dotx",
  "dotm",
  "odt",
  "pages",
  "pptx",
  "ppt",
  "pptm",
  "key",
  "zip",
  "eml",
  "msg",
  "mbox",
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
  "htm",
  "html",
]);

const BLOCKED_EXTENSIONS = new Set([
  "exe",
  "bat",
  "cmd",
  "com",
  "scr",
  "ps1",
  "sh",
  "msi",
  "dll",
  "js",
  "mjs",
  "svg",
  "gsheet",
  "gdoc",
  "gslides",
  "slink",
]);

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
  if (BLOCKED_EXTENSIONS.has(extension)) return false;
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
