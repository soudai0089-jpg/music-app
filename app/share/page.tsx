"use client";

import { useEffect, useMemo, useState } from "react";
import { loadLastCompat } from "../../lib/storage";
import { renderShareCardPNG } from "../../lib/image";

export default function SharePage() {
  const [png, setPng] = useState<string | null>(null);

  const payload = useMemo(() => loadLastCompat<any>(), []);

  useEffect(() => {
    const title = payload?.title ?? "🎧 音楽プロフィール";
    const subtitle = payload?.subtitle ?? "相性結果をシェア";
    const footer = payload?.footer ?? "music app (beta)";
    setPng(renderShareCardPNG({ title, subtitle, footer }));
  }, [payload]);

  const shareLink = async () => {
    const url = payload?.url ?? window.location.origin + "/profile";
    const text = payload?.text ?? "相性結果見て！";
    if (navigator.share) {
      await navigator.share({ title: "music", text, url });
      return;
    }
    await navigator.clipboard.writeText(`${text}\n${url}`);
    alert("リンクをコピーしました");
  };

  const download = () => {
    if (!png) return;
    const a = document.createElement("a");
    a.href = png;
    a.download = "share.png";
    a.click();
  };

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white px-4 py-8">
      <div className="mx-auto max-w-md">
        <h1 className="text-xl font-bold">共有</h1>
        <p className="text-sm text-white/60 mt-1">リンク共有 or 画像で共有</p>

        <div className="mt-4 rounded-2xl border border-white/10 overflow-hidden bg-white/5">
          {png ? <img src={png} alt="share" /> : <div className="p-8">生成中…</div>}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button onClick={shareLink} className="rounded-2xl bg-green-500 py-3 font-semibold">
            リンク共有
          </button>
          <button onClick={download} className="rounded-2xl bg-white/10 py-3">
            画像保存
          </button>
        </div>
      </div>
    </main>
  );
}
