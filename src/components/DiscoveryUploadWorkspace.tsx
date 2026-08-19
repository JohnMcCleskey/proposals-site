"use client";

import { upload } from "@vercel/blob/client";
import { useRef, useState } from "react";
import styles from "./DiscoveryUploadWorkspace.module.css";

type UploadState = "ready" | "uploading" | "received" | "error";

type LocalFile = {
  id: string;
  file: File;
  status: UploadState;
  detail?: string;
};

export const DEFAULT_ACCEPTED_FILES = ".xlsx,.xlsm,.xlsb,.xls,.ods,.csv,.tsv,.txt,.rtf,.pdf,.docx,.doc,.docm,.dot,.dotx,.odt,.pages,.pptx,.ppt,.zip,.eml,.msg,.mbox,.mp4,.mov,.m4v,.webm,.jpg,.jpeg,.png,.gif,.webp,.heic,.heif,.tif,.tiff,.bmp";
const GOOGLE_SHEET_HINT = "Google Sheets files cannot upload directly. Export as Excel or CSV, or paste the share link below.";

export type DiscoveryUploadWorkspaceProps = {
  sessionId: string;
  pathPrefix: string;
  handleUploadUrl: string;
  shareLinkUrl: string;
  noteUrl?: string;
  materials: string[];
  guidance?: string[];
};

function uploadPath(pathPrefix: string, sessionId: string, file: File) {
  const lastDot = file.name.lastIndexOf(".");
  const rawBase = lastDot > 0 ? file.name.slice(0, lastDot) : file.name;
  const extension = lastDot > 0 ? file.name.slice(lastDot + 1).toLowerCase() : "invalid";
  const base = rawBase
    .replace(/[^A-Za-z0-9_-]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80) || "material";

  return `${pathPrefix}/${sessionId}/${crypto.randomUUID()}-${base}.${extension}`;
}

function isVideo(file: File) {
  return /\.(mp4|mov|m4v|webm)$/i.test(file.name);
}

function fileHint(file: File) {
  if (/\.g(sheet|doc|slink)$/i.test(file.name)) return GOOGLE_SHEET_HINT;
  return "";
}

function normalizeDroppedFile(file: File) {
  if (/\.[A-Za-z0-9]+$/.test(file.name)) return file;

  const type = file.type.toLowerCase();
  const ext = type.includes("outlook") || type.includes("ms-tnef")
    ? "msg"
    : type.includes("rfc822") || type.includes("message")
      ? "eml"
      : type.startsWith("image/")
        ? "png"
        : type === "application/pdf"
          ? "pdf"
          : "eml";

  return new File([file], `${file.name || "order"}.${ext}`, { type: file.type || "message/rfc822" });
}

export default function DiscoveryUploadWorkspace({
  sessionId,
  pathPrefix,
  handleUploadUrl,
  shareLinkUrl,
  noteUrl,
  materials,
  guidance,
}: DiscoveryUploadWorkspaceProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<LocalFile[]>([]);
  const [shareUrl, setShareUrl] = useState("");
  const [shareStatus, setShareStatus] = useState<"idle" | "saving" | "received" | "error">("idle");
  const [shareDetail, setShareDetail] = useState("");
  const [note, setNote] = useState("");
  const [noteStatus, setNoteStatus] = useState<"idle" | "saving" | "received" | "error">("idle");
  const [noteDetail, setNoteDetail] = useState("");
  const [dragging, setDragging] = useState(false);
  const [dropNotice, setDropNotice] = useState("");
  const listRef = useRef<HTMLUListElement>(null);

  function addFiles(selected: FileList | File[] | null) {
    if (!selected) return;
    const incoming = Array.from(selected).map(normalizeDroppedFile).map((file) => {
      const hint = fileHint(file);
      return {
        id: crypto.randomUUID(),
        file,
        status: hint ? "error" as const : "ready" as const,
        detail: hint || undefined,
      };
    });

    setFiles((current) => [...current, ...incoming]);
    setDropNotice(
      incoming.length === 1
        ? `Got it: ${incoming[0].file.name}. Uploading now.`
        : `Got ${incoming.length} files. Uploading now.`,
    );
    requestAnimationFrame(() => listRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }));
    void uploadEntries(incoming.filter((entry) => entry.status === "ready"));
  }

  async function uploadEntries(readyFiles: LocalFile[]) {
    await Promise.all(
      readyFiles.map(async ({ id, file }) => {
        setFiles((current) =>
          current.map((entry) =>
            entry.id === id ? { ...entry, status: "uploading", detail: undefined } : entry,
          ),
        );

        try {
          await upload(uploadPath(pathPrefix, sessionId, file), file, {
            access: "private",
            handleUploadUrl,
            clientPayload: JSON.stringify({ sessionId }),
            multipart: isVideo(file) || file.size > 4 * 1024 * 1024,
          });
          setFiles((current) =>
            current.map((entry) =>
              entry.id === id ? { ...entry, status: "received" } : entry,
            ),
          );
          setDropNotice(`Received: ${file.name}`);
        } catch (error) {
          const detail = error instanceof Error && error.message
            ? error.message
            : "Upload failed. Try Word/PDF, or paste the text in the email box.";
          setFiles((current) =>
            current.map((entry) =>
              entry.id === id ? { ...entry, status: "error", detail } : entry,
            ),
          );
        }
      }),
    );
  }

  async function uploadReadyFiles() {
    await uploadEntries(files.filter(({ status }) => status === "ready"));
  }

  async function saveShareLink() {
    setShareStatus("saving");
    setShareDetail("");

    try {
      const response = await fetch(shareLinkUrl, {
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

  async function saveNote(nextNote?: string) {
    if (!noteUrl) return;
    const bodyNote = (nextNote ?? note).trim();
    setNoteStatus("saving");
    setNoteDetail("");

    try {
      const response = await fetch(noteUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sessionId, note: bodyNote }),
      });
      const result = (await response.json()) as { status?: string; error?: string };
      if (!response.ok || result.status !== "received") {
        throw new Error(result.error || "The email could not be saved.");
      }
      setNoteStatus("received");
      setNote("");
    } catch (error) {
      setNoteStatus("error");
      setNoteDetail(error instanceof Error ? error.message : "The email could not be saved.");
    }
  }

  async function handleDrop(event: React.DragEvent<HTMLElement>) {
    event.preventDefault();
    setDragging(false);

    const droppedFiles = Array.from(event.dataTransfer.files || []);
    if (droppedFiles.length > 0) {
      addFiles(droppedFiles);
      return;
    }

    const text = event.dataTransfer.getData("text/plain")
      || event.dataTransfer.getData("text")
      || event.dataTransfer.getData("text/html");
    const cleaned = text.replace(/<[^>]+>/g, " ").replace(/\s+\n/g, "\n").trim();
    if (cleaned.length >= 20 && noteUrl) {
      setNote(cleaned);
      setDropNotice("Got the email text. Saving it now.");
      await saveNote(cleaned);
      setDropNotice("Email received.");
      return;
    }

    setDropNotice("That drop did not include a file. Paste the email above, or use Select files.");
  }

  function statusLabel(status: UploadState) {
    if (status === "ready") return "Queued";
    if (status === "uploading") return "Uploading";
    if (status === "received") return "Received";
    return "Could not save";
  }

  const receivedCount = files.filter(({ status }) => status === "received").length;
  const hasReadyFiles = files.some(({ status }) => status === "ready");
  const isUploading = files.some(({ status }) => status === "uploading");

  return (
    <section
      className={`${styles.workspace}${dragging ? ` ${styles.dragging}` : ""}`}
      aria-labelledby="materials-heading"
      onDragEnter={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragOver={(event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
      }}
      onDragLeave={(event) => {
        if (event.currentTarget.contains(event.relatedTarget as Node)) return;
        setDragging(false);
      }}
      onDrop={(event) => void handleDrop(event)}
    >
      <div className={styles.intro}>
        <div>
          <p className={styles.label}>Private material workspace</p>
          <h2 id="materials-heading">Share the working source material.</h2>
        </div>
        <p>
          Files stay private to this diagnostic. Paste a Google Sheet link, drop Excel or CSV,
          or paste a real order email. Please do not upload passwords or API keys.
        </p>
      </div>

      {guidance && guidance.length > 0 ? (
        <div className={styles.requested}>
          <h3>What helps most</h3>
          <ul>{guidance.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      ) : null}

      <div className={styles.requested}>
        <h3>Requested materials</h3>
        <ul>{materials.map((material) => <li key={material}>{material}</li>)}</ul>
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

      {noteUrl ? (
        <>
          <label className={styles.shareLabel} htmlFor="order-email">
            Paste a real order email
            <textarea
              id="order-email"
              className={styles.shareInput}
              rows={8}
              placeholder="From: customer@…&#10;Need 12 small furniture pallets to the usual dock…"
              value={note}
              onChange={(event) => {
                setNote(event.target.value);
                if (noteStatus !== "idle") setNoteStatus("idle");
              }}
            />
          </label>
          <button
            className={styles.selectButton}
            type="button"
            disabled={note.trim().length < 20 || noteStatus === "saving"}
            onClick={() => void saveNote()}
          >
            {noteStatus === "saving" ? "Saving email" : "Save pasted email"}
          </button>
          {noteStatus === "received" ? <p className={styles.supporting}>Email received. Paste another if you have more.</p> : null}
          {noteStatus === "error" ? <p className={styles.errorText}>{noteDetail}</p> : null}
        </>
      ) : null}

      <div
        className={styles.dropZone}
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") inputRef.current?.click();
        }}
      >
        <strong>{dragging ? "Release to add this file" : "Drop emails or files here"}</strong>
        <span>Drop Word, Excel, PDF, or a saved email. If Outlook will not drop a file, paste the email above and save it.</span>
      </div>
      {dropNotice ? (
        <p
          className={dropNotice.startsWith("That drop") ? styles.errorBanner : styles.notice}
          role="status"
        >
          {dropNotice}
        </p>
      ) : null}
      {files.length > 0 ? (
        <ul className={styles.fileList} aria-live="polite" ref={listRef}>
          {files.map(({ id, file, status, detail }) => (
            <li key={id}>
              <span>
                {file.name}
                {detail ? <em className={styles.errorText}>{detail}</em> : null}
              </span>
              <strong data-status={status}>{statusLabel(status)}</strong>
            </li>
          ))}
        </ul>
      ) : null}
      {receivedCount > 0 ? (
        <p className={styles.notice}>{receivedCount === 1 ? "1 file received." : `${receivedCount} files received.`}</p>
      ) : null}
      <div className={styles.actions}>
        <input
          ref={inputRef}
          className={styles.fileInput}
          type="file"
          accept={DEFAULT_ACCEPTED_FILES}
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

      <p className={styles.supporting}>Accepted files: Excel, CSV, PDF, Word, zip, Outlook/Apple Mail (.eml or .msg), video, and images. Native Google Sheet files need a share link or an export. The safest path for an email is paste it above, or save it as PDF.</p>
    </section>
  );
}
