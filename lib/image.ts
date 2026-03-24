import { CompatibilityResult, UserProfile } from "./types";

export function renderShareCardPNG(opts: {
  title: string;
  subtitle: string;
  footer: string;
}): string {
  const w = 1080;
  const h = 1920;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;

  // bg gradient
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, "#0B0F14");
  g.addColorStop(0.4, "#1a1433");
  g.addColorStop(1, "#0B0F14");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  // card
  ctx.fillStyle = "rgba(255,255,255,0.06)";
  roundRect(ctx, 80, 140, w - 160, h - 280, 48);
  ctx.fill();

  // text
  ctx.fillStyle = "rgba(255,255,255,0.92)";
  ctx.font = "bold 72px system-ui, -apple-system, Segoe UI";
  wrapText(ctx, opts.title, 140, 280, w - 280, 90);

  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.font = "600 48px system-ui, -apple-system, Segoe UI";
  wrapText(ctx, opts.subtitle, 140, 520, w - 280, 70);

  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.font = "500 34px system-ui, -apple-system, Segoe UI";
  ctx.fillText(opts.footer, 140, h - 220);

  return c.toDataURL("image/png");
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(" ");
  let line = "";
  let yy = y;
  for (const w of words) {
    const test = line ? line + " " + w : w;
    if (ctx.measureText(test).width > maxWidth) {
      ctx.fillText(line, x, yy);
      line = w;
      yy += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, yy);
}
