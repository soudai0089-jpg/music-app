"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAppData, initData } from "../lib/store";

export default function HomePage() {
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    initData();
    setData(getAppData());
  }, []);

  if (!data) {
    return (
      <main className="min-h-screen bg-[#0B0F14] text-white flex items-center justify-center">
        読み込み中...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      {/* 上ヘッダー */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0B0F14]/95 backdrop-blur">
        <div className="mx-auto flex max-w-md items-center justify-between px-4 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm">
            🎵
          </div>

          <div className="text-base font-semibold tracking-wide">
            Music App
          </div>

          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm">
            ⚙️
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-md px-4 pb-28">
        {/* ストーリー */}
        <section className="pt-4">
          <div className="flex items-start gap-3 overflow-x-auto no-scrollbar pb-2">
            {/* 自分 */}
            <Link href="/profile" className="shrink-0">
              <div className="flex w-[74px] flex-col items-center">
                <div className="relative rounded-full bg-gradient-to-tr from-pink-500 via-orange-400 to-yellow-400 p-[2px]">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#151A22] text-xl">
                    {data.me.avatar}
                  </div>

                  <div className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-[12px] text-black border border-[#0B0F14]">
                    +
                  </div>
                </div>

                <div className="mt-2 truncate text-center text-[11px] text-white/85">
                  {data.me.username}
                </div>
              </div>
            </Link>

            {/* 友達 */}
            {data.friends.map((friend: any) => (
              <Link
                key={friend.id}
                href={`/u/${friend.id}`}
                className="shrink-0"
              >
                <div className="flex w-[74px] flex-col items-center">
                  <div className="rounded-full bg-gradient-to-tr from-pink-500 via-orange-400 to-yellow-400 p-[2px]">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#151A22] text-xl">
                      {friend.avatar || "👤"}
                    </div>
                  </div>

                  <div className="mt-2 truncate text-center text-[11px] text-white/85">
                    {friend.username}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* おすすめリール風 */}
        <section className="mt-5 space-y-5">
          {(data.recommended || []).map((track: any, i: number) => (
            <article
              key={track.id || i}
              className="overflow-hidden rounded-[28px] border border-white/10 bg-[#151A22]"
            >
              {/* 上の投稿者っぽい帯 */}
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm">
                  🎧
                </div>

                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">
                    Recommended
                  </div>
                  <div className="truncate text-xs text-white/55">
                    あなた向けの1曲
                  </div>
                </div>

                <button className="text-white/60">⋯</button>
              </div>

              {/* ジャケット */}
              <div className="px-4">
                <img
                  src={track.coverUrl || "https://placehold.co/600x600/png"}
                  alt={track.title}
                  className="aspect-square w-full rounded-[24px] object-cover"
                />
              </div>

              {/* 曲情報 */}
              <div className="px-4 pb-4 pt-4">
                <div className="flex items-center gap-3">
                  <button className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-black">
                    ▶
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="truncate font-semibold">{track.title}</div>
                    <div className="truncate text-sm text-white/60">
                      {track.artist}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex gap-4 text-xl">
                  <button>♡</button>
                  <button>💬</button>
                  <button>✈️</button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>

      {/* 下ナビ */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#0B0F14]/95 backdrop-blur">
        <div className="mx-auto flex max-w-md items-center justify-between px-6 py-3">
          <Link href="/" className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black text-xl">
            ⌂
          </Link>

          <Link
            href="/search"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-lg"
          >
            🔍
          </Link>

          <Link
            href="/post"
            className="flex h-16 w-16 -translate-y-2 items-center justify-center rounded-full bg-green-500 text-2xl text-black shadow-lg"
          >
            ＋
          </Link>

          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-lg">
            ▶
          </button>

          <Link
            href="/profile"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-lg"
          >
            👤
          </Link>
        </div>
      </nav>
    </main>
  );
}
