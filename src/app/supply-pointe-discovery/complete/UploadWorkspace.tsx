"use client";

import { upload } from "@vercel/blob/client";
import { useRef, useState } from "react";
import styles from "./upload-workspace.module.css";

type UploadState = "ready" | "uploading" | "received" | "error";

type LocalFile = {
  id: string;
  file: File;
  status: UploadState;
  detail?: string;
};

const MATERIALS = [
  "Franchisee walkthrough video",
  "Google Sheets: paste a view link, or export Excel/CSV",
  "Five to ten varied order examples",
  "Purchase-order and packing-slip templates",
  "QuickBooks screenshots or agreed sandbox/read-only references",
];

const ACCEPTED_FILES = ".xlsx,.xlsm,.xlsb,.xls,.ods,.csv,.tsv,.txt,.pdf,.docx,.doc,.zip,.mp4,.mov,.m4v,.webm,.jpg,.jpeg,.png,.gif,.webp,.heic,.heif,.tif,.tiff,.bmp";
const GOOGLE_SHEET_HINT = "Google Sheets files cannot upload directly. Export as Excel or CSV, or paste the share link below.";

function uploadPath(sessionId: string, file: File) {
  const lastDot = file.name.lastIndexOf(".");
  const rawBase = lastDot > 0 ? file.name.slice(0, lastDot) : file.name;
  const extension = lastDot > 0 ? file.name.slice(lastDot + 1).toLowerCase() : "invalid";
  const base = rawBase
    .replace(/[^A-Za-z0-9_-]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80) || "material";

  return `supply-pointe/${sessionId}/${crypto.randomUUID()}-${base}.${extension}`;
}

function isVideo(file: File) {
  return /\.(mp4|mov|m4v|webm)$/i.test(file.name);
}

function fileHint(file: File) {
  if (/\.g(sheet|doc|slink)$/i.test(file.name)) return GOOGLE_SHEET_HINT;
  return "";
}

export default function UploadWorkspace({ sessionId }: { sessionId: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<LocalFile[]>([]);
  const [shareUrl, setShareUrl] = useState("");
  const [shareStatus, setShareStatus] = useState<"idle" | "saving" | "received" | "error">("idle");
  const [shareDetail, setShareDetail] = useState("");

  function addFiles(selected: FileList | null) {
    if (!selected) return;

    setFiles((current) => [
      ...current,
      ...Array.from(selected).map((file) => {
        const hint = fileHint(file);
        return {
          id: crypto.randomUUID(),
          file,
          status: hint ? "error" as const : "ready" as const,
          detail: hint || undefined,
        };
      }),
    ]);
  }

  async function uploadReadyFiles() {
    const readyFiles = files.filter(({ status }) => status === "ready");

    await Promise.all(
      readyFiles.map(async ({ id, file }) => {
        setFiles((current) =>
          current.map((entry) =>
            entry.id === id ? { ...entry, status: "uploading", detail: undefined } : entry,
          ),
        );

        try {
          await upload(uploadPath(sessionId, file), file, {
            access: "private",
            handleUploadUrl: "/api/supply-pointe/upload",
            clientPayload: JSON.stringify({ sessionId }),
            multipart: isVideo(file) || file.size > 4 * 1024 * 1024,
          });
          setFiles((current) =>
            current.map((entry) =>
              entry.id === id ? { ...entry, status: "received" } : entry,
            ),
          );
        } catch (error) {
          const detail = error instanceof Error && error.message
            ? error.message
            : "Upload failed. Export the sheet as Excel/CSV or paste a share link.";
          setFiles((current) =>
            current.map((entry) =>
              entry.id === id ? { ...entry, status: "error", detail } : entry,
            ),
          );
        }
      }),
    );
  }

  async function saveShareLink() {
    setShareStatus("saving");
    setShareDetail("");

    try {
      const response = await fetch("/api/supply-pointe/share-link", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sessionId, url: shareUrl }),
      });
      const result = (await response.json()) as { status?: string; error?: string };
      if (!response.ok || result.status !== "received") {
        throw new Error(result.error || "The share link could not be saved.");
      }
      setShareStatus("received");
      setShareUrl("");
    } catch (error) {
      setShareStatus("error");
      setShareDetail(error instanceof Error ? error.message : "The share link could not be saved.");
    }
  }

  const hasReadyFiles = files.some(({ status }) => status === "ready");
  const isUploading = files.some(({ status }) => status === "uploading");

  return (
    <section className={styles.workspace} aria-labelledby="materials-heading">
      <div className={styles.intro}>
        <div>
          <p className={styles.label}>Private material workspace</p>
          <h2 id="materials-heading">Share the working source material.</h2>
        </div>
        <p>
          Files stay private to this diagnostic. Google Sheets work best as a view-only
          share link, or as an Excel/CSV export. Please do not upload passwords or API keys.
        </p>
      </div>

      <div className={styles.requested}>
        <h3>Requested materials</h3>
        <ul>{MATERIALS.map((material) => <li key={material}>{material}</li>)}</ul>
      </div>

      <label className={styles.shareLabel} htmlFor="sheet-link">
        Google Sheet or Drive link
        <input
          id="sheet-link"
          className={styles.shareInput}
          type="url"
          inputMode="url"
          placeholder="https://docs.google.com/spreadsheets/..."
          value={shareUrl}
          onChange={(event) => {
            setShareUrl(event.target.value);
            if (shareStatus !== "idle") setShareStatus("idle");
          }}
        />
      </label>
      <button
        className={styles.selectButton}
        type="button"
        disabled={!shareUrl.trim() || shareStatus === "saving"}
        onClick={() => void saveShareLink()}
      >
        {shareStatus === "saving" ? "Saving link" : "Save share link"}
      </button>
      {shareStatus === "received" ? <p className={styles.supporting}>Link received. We can work from that.</p> : null}
      {shareStatus === "error" ? <p className={styles.errorText}>{shareDetail}</p> : null}

      <div className={styles.actions}>
        <input
          ref={inputRef}
          className={styles.fileInput}
          type="file"
          accept={ACCEPTED_FILES}
          multiple
          onChange={(event) => {
            addFiles(event.target.files);
            event.target.value = "";
          }}
        />
        <button className={styles.selectButton} type="button" onClick={() => inputRef.current?.click()}>
          Select files
        </button>
        <button
          className={styles.uploadButton}
          type="button"
          disabled={!hasReadyFiles || isUploading}
          onClick={() => void uploadReadyFiles()}
        >
          {isUploading ? "Uploading materials" : "Upload selected files"}
        </button>
      </div>

      <p className={styles.supporting}>Accepted files: Excel, CSV, PDF, Word, zip, video, and common images. Native Google Sheet files need a share link or an export.</p>

      {files.length > 0 ? (
        <ul className={styles.fileList} aria-live="polite">
          {files.map(({ id, file, status, detail }) => (
            <li key={id}>
              <span>
                {file.name}
                {detail ? <em className={styles.errorText}>{detail}</em> : null}
              </span>
              <strong data-status={status}>{status}</strong>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
