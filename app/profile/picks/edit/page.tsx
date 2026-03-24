"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Track = { id: string; title: string; artist: string };

const STORAGE_KEY = "musicapp:picks:v1";

const CATALOG: Track[] = [
  { id: "c1", title: "言って。", artist: "ヨルシカ" },
  { id: "c2", title: "晴る", artist: "ヨルシカ" },
  { id: "c3", title: "Ref:rain", artist: "Aimer" },
  { id: "c4", title: "怪獣の花唄", artist: "Vaundy" },
  { id: "c5", title: "裸の心", artist: "あいみょん" },
  { id: "c6", title: "Pretender", artist: "Official髭男dism" },
  { id: "c7", title: "踊り子", artist: "Vaundy" },
  { id: "c8", title: "レオ", artist: "優里" },
  { id: "c9", title: "KICK BACK", artist: "米津玄師" },
  { id: "c10", title: "花束", artist: "back number" },
];

function loadPicks(): Track[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(Boolean);
  } catch {
    return [];
  }
}

function savePicks(picks: Track[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(picks));
}

export default function PicksEditPage() {
  const [query, setQuery] = useState("");
  const [picks, setPicks] = useState<Track[]>([]);

  useEffect(() => {
    setPicks(loadPicks());
  }, []);

  const filteredCatalog = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CATALOG;
    return CATALOG.filter(
      (t) =>
        t.title.toLowerCase().includes(q) || t.artist.toLowerCase().includes(q)
    );
  }, [query]);

  const pickIds = useMemo(() => new Set(picks.map((p) => p.id)), [picks]);

  function addTrack(t: Track) {
    if (picks.length >= 30) return;
    if (pickIds.has(t.id)) return;
    setPicks((prev) => [...prev, t]);
  }

  function removeTrack(id: string) {
    setPicks((prev) => prev.filter((p) => p.id !== id));
  }

  function moveUp(index: number) {
    if (index <= 0) return;
    setPicks((prev) => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  }

  function moveDown(index: number) {
    if (index >= picks.length - 1) return;
    setPicks((prev) => {
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next;
    });
  }

  function onSave() {
    savePicks(picks);
    alert("保存しました！");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-md px-5 pt-7 pb-10">
        <header className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-xl font-bold">自選ベスト30 編集</h1>
            <p className="text-sm text-slate-400 mt-1">
              追加・削除・並べ替え（↑↓）して保存
            </p>
          </div>
          <Link
            href="/profile"
            className="text-sm text-slate-200 underline underline-offset-4"
          >
            戻る
          </Link>
        </header>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 mb-5">
          <div className="flex items-center justify-between mb-3">
            <p className="font-semibold">あなたのベスト30</p>
            <p className="text-xs text-slate-400">{picks.length} / 30</p>
          </div>

          {picks.length === 0 ? (
            <p className="text-sm text-slate-400">
              まだ0曲です。下の検索から追加してください。
            </p>
          ) : (
            <div className="space-y-2">
              {picks.map((t, i) => (
                <div
                  key={t.id}
                  className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/30 p-3"
                >
                  <div className="w-7 text-center text-xs text-slate-300">
                    {i + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold truncate">{t.title}</p>
                    <p className="text-xs text-slate-400 truncate">{t.artist}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveUp(i)}
                      className="rounded-lg border border-slate-800 px-2 py-1 text-xs"
                      title="上へ"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveDown(i)}
                      className="rounded-lg border border-slate-800 px-2 py-1 text-xs"
                      title="下へ"
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => removeTrack(t.id)}
                      className="rounded-lg border border-slate-800 px-2 py-1 text-xs text-rose-300"
                      title="削除"
                    >
                      削除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={onSave}
            className="mt-4 w-full rounded-xl bg-slate-100 text-slate-950 py-2.5 font-semibold"
          >
            保存
          </button>
          <p className="text-[11px] text-slate-500 mt-2">
            ※いまは端末内（localStorage）に保存。後でアカウント/DBに移行できます。
          </p>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
          <p className="font-semibold mb-3">追加（検索）</p>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="曲名 / アーティストで検索"
            className="w-full rounded-xl border border-slate-800 bg-slate-950/40 px-3 py-2 text-sm outline-none"
          />

          <div className="mt-3 space-y-2">
            {filteredCatalog.map((t) => {
              const disabled = pickIds.has(t.id) || picks.length >= 30;
              return (
                <button
                  key={t.id}
                  onClick={() => addTrack(t)}
                  disabled={disabled}
                  className={`w-full text-left rounded-xl border px-3 py-3 ${
                    disabled
                      ? "border-slate-900 bg-slate-950/20 text-slate-600"
                      : "border-slate-800 bg-slate-950/30 hover:bg-slate-950/40"
                  }`}
                >
                  <p className="font-semibold truncate">{t.title}</p>
                  <p className="text-xs text-slate-400 truncate">{t.artist}</p>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}