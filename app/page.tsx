"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AppHeader from "../components/AppHeader";
import BottomNav from "../components/BottomNav";
import { getAppData, initData } from "../lib/store";

export default function HomePage() {
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    initData();
    const next = getAppData();
    setData(next);
  }, []);

  if (!data) {
    return (
      <main className="min-h-screen bg-[#0B0F14] text-white flex items-center justify-center">
        読み込み中...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white pb-28">
      <AppHeader />

      <div className="mx-auto max-w-md px-4 pt-6">
        <Link href="/profile">
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#151A22] p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-xl">
              {data.me.avatar}
            </div>
            <div>
              <div className="font-semibold">{data.me.username}</div>
              <div className="text-xs text-white/60">プロフィールを見る</div>
            </div>
          </div>
        </Link>

        <div className="mb-4 text-lg font-semibold">友達の「今の一曲」</div>

        <div className="space-y-3">
          {data.friends.map((f: any) => (
            <Link key={f.id} href={`/u/${f.id}`}>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#151A22] p-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-lg">
                  {f.avatar}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold">{f.moodSong.title}</div>
                  <div className="truncate text-sm text-white/60">
                    {f.moodSong.artist}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
