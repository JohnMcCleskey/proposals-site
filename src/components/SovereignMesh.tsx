"use client";

/**
 * Hero background: a live rendering of the thing we actually sell.
 * An intent enters at the left, fans out to Sovereign Roles, each role
 * emits a claim toward the Guardian, and the Guardian either seals it
 * (verified) or drops it (refuted). Purely decorative — no data, no claims —
 * but it is a faithful diagram of the pipeline, not generic particle noise.
 */

import { useEffect, useRef } from "react";

const ROLES = [
  "Treasury",
  "Supply Chain",
  "Compliance",
  "Tax",
  "Crisis",
  "Deals",
  "Intelligence",
  "Talent",
];

type Packet = {
  role: number;
  /** 0 → 1 across the intent→role leg, then 1 → 2 across the role→guardian leg */
  t: number;
  speed: number;
  verified: boolean;
  sealed: number; // 0 → 1 flash on arrival
};

export default function SovereignMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let frame = 0;

    const packets: Packet[] = [];
    // Deterministic pseudo-random so the mesh looks the same shape every load.
    let seed = 20260805;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // The hero copy sits dead centre, so the mesh is laid out as a ring
    // *around* it: intent enters at 9 o'clock, roles sit on the rim, the
    // Guardian collects at 3 o'clock. Nothing important lands under the words.
    const occlusion = (x: number, y: number) => {
      const hw = Math.min(width * 0.3, 400);
      const hh = Math.min(height * 0.26, 230);
      const d = Math.max(Math.abs(x - width / 2) / hw, Math.abs(y - height / 2) / hh);
      if (d >= 1.3) return 1;
      if (d <= 1) return 0.16;
      return 0.16 + ((d - 1) / 0.3) * 0.84;
    };

    const layout = () => {
      const cx = width / 2;
      const cy = height / 2;
      const rx = Math.min(width * 0.4, 640);
      const ry = Math.min(height * 0.4, 370);

      const intent = { x: cx - rx, y: cy };
      const guardian = { x: cx + rx, y: cy };

      // Four roles across the top arc, four across the bottom, leaving the
      // 9 and 3 o'clock positions to intent and Guardian.
      const half = ROLES.length / 2;
      const roleNodes = ROLES.map((name, i) => {
        const top = i < half;
        const k = top ? i : i - half;
        const spanStart = top ? 165 : 195;
        const spanEnd = top ? 15 : 345;
        const deg = spanStart + ((spanEnd - spanStart) * k) / (half - 1);
        const rad = (deg * Math.PI) / 180;
        return {
          name,
          top,
          x: cx + Math.cos(rad) * rx,
          y: cy - Math.sin(rad) * ry,
        };
      });

      return { intent, guardian, roleNodes };
    };

    const spawn = () => {
      packets.push({
        role: Math.floor(rand() * ROLES.length),
        t: 0,
        speed: 0.0055 + rand() * 0.0045,
        // Roughly one in six claims fails verification. The Guardian visibly
        // drops those — that honesty is the point of the animation.
        verified: rand() > 0.17,
        sealed: 0,
      });
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const draw = () => {
      frame += 1;
      const { intent, guardian, roleNodes } = layout();
      ctx.clearRect(0, 0, width, height);

      const pulse = reduced ? 0.5 : (Math.sin(frame * 0.02) + 1) / 2;

      // ── edges ───────────────────────────────────────────────────────────
      roleNodes.forEach((node, i) => {
        const phase = reduced ? 0.5 : (Math.sin(frame * 0.015 + i) + 1) / 2;
        ctx.strokeStyle = `rgba(197,165,90,${0.05 + phase * 0.05})`;
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(intent.x, intent.y);
        ctx.bezierCurveTo(
          lerp(intent.x, node.x, 0.5), intent.y,
          lerp(intent.x, node.x, 0.5), node.y,
          node.x, node.y
        );
        ctx.stroke();

        ctx.strokeStyle = `rgba(96,197,182,${0.05 + phase * 0.05})`;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.bezierCurveTo(
          lerp(node.x, guardian.x, 0.5), node.y,
          lerp(node.x, guardian.x, 0.5), guardian.y,
          guardian.x, guardian.y
        );
        ctx.stroke();
      });

      // ── packets ─────────────────────────────────────────────────────────
      for (let i = packets.length - 1; i >= 0; i -= 1) {
        const p = packets[i];
        p.t += reduced ? p.speed * 0.35 : p.speed;
        const node = roleNodes[p.role];

        let x: number;
        let y: number;
        let color: string;

        if (p.t <= 1) {
          const t = p.t;
          const mx = lerp(intent.x, node.x, 0.5);
          x = bez(intent.x, mx, mx, node.x, t);
          y = bez(intent.y, intent.y, node.y, node.y, t);
          color = "197,165,90";
        } else if (p.t <= 2) {
          const t = p.t - 1;
          const mx = lerp(node.x, guardian.x, 0.5);
          x = bez(node.x, mx, mx, guardian.x, t);
          y = bez(node.y, node.y, guardian.y, guardian.y, t);
          color = p.verified ? "96,197,182" : "214,106,92";
        } else {
          p.sealed += 0.06;
          if (p.sealed >= 1) packets.splice(i, 1);
          continue;
        }

        const o = occlusion(x, y);
        ctx.fillStyle = `rgba(${color},${0.9 * o})`;
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${color},${0.14 * o})`;
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── nodes ───────────────────────────────────────────────────────────
      roleNodes.forEach((node, i) => {
        const active = packets.some(
          (p) => p.role === i && p.t > 0.85 && p.t < 1.25
        );
        const o = occlusion(node.x, node.y);
        ctx.fillStyle = `rgba(197,165,90,${(active ? 0.95 : 0.35) * o})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, active ? 4 : 2.6, 0, Math.PI * 2);
        ctx.fill();

        if (width > 760 && o > 0.4) {
          ctx.font =
            '500 10px ui-monospace, SFMono-Regular, "JetBrains Mono", monospace';
          ctx.fillStyle = `rgba(230,214,178,${(active ? 0.9 : 0.34) * o})`;
          ctx.textAlign = "center";
          ctx.fillText(
            node.name.toUpperCase(),
            node.x,
            node.y + (node.top ? -14 : 20)
          );
        }
      });

      drawHub(ctx, intent.x, intent.y, "197,165,90", 0.35 + pulse * 0.25, "INTENT", width);
      drawHub(
        ctx,
        guardian.x,
        guardian.y,
        "96,197,182",
        0.4 + pulse * 0.3,
        "GUARDIAN",
        width
      );

      if (!reduced && frame % 26 === 0) spawn();
      if (reduced && frame % 90 === 0 && packets.length < 3) spawn();

      raf = requestAnimationFrame(draw);
    };

    resize();
    // Seed the mesh so the first paint is already alive.
    for (let i = 0; i < 6; i += 1) spawn();
    packets.forEach((p, i) => {
      p.t = (i / 6) * 1.8;
    });
    raf = requestAnimationFrame(draw);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="mesh-canvas" aria-hidden="true" />;
}

function bez(p0: number, p1: number, p2: number, p3: number, t: number) {
  const u = 1 - t;
  return (
    u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3
  );
}

function drawHub(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  rgb: string,
  alpha: number,
  label: string,
  width: number
) {
  const grad = ctx.createRadialGradient(x, y, 0, x, y, 46);
  grad.addColorStop(0, `rgba(${rgb},${alpha * 0.5})`);
  grad.addColorStop(1, `rgba(${rgb},0)`);
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(x, y, 46, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = `rgba(${rgb},${alpha + 0.25})`;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(x, y, 13, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = `rgba(${rgb},0.9)`;
  ctx.beginPath();
  ctx.arc(x, y, 4, 0, Math.PI * 2);
  ctx.fill();

  if (width > 640) {
    ctx.font = '600 9px ui-monospace, SFMono-Regular, "JetBrains Mono", monospace';
    ctx.fillStyle = `rgba(${rgb},0.75)`;
    ctx.textAlign = "center";
    ctx.fillText(label, x, y + 30);
  }
}
