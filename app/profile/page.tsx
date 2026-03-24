"use client";

import AppHeader from "../../components/AppHeader";
import BottomNav from "../../components/BottomNav";
import { getAppData } from "../../lib/store";

export default function ProfilePage() {
  const data = getAppData();
  const me = data.me;

  const safeMoodSong = me.moodSong || {
    id: "fallback",
    title: "未設定",
    artist: "No Artist",
    coverUrl: "",
  };

  const recentBest5 = (data.recommended || []).slice(0, 5);
  const selectedBest5 = [
    safeMoodSong,
    ...data.friends.map((f: any) =>
      f.moodSong || {
        id: `${f.id}-fallback`,
        title: "未設定",
        artist: "No Artist",
        coverUrl: "",
      }
    ),
  ].slice(0, 5);

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white pb-28">
      <AppHeader />

      <div className="mx-auto max-w-md px-4 pt-6">
        <div className="flex flex-col items-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/10 text-3xl">
            🎧
          </div>

          <div className="mt-3 text-xl font-bold">{me.username}</div>
          <div className="mt-1 text-sm text-white/60">@{me.id}</div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="rounded-3xl border border-white/10 bg-[#151A22] p-4">
            <div className="mb-3 text-xs text-white/50">🔥 今の一曲</div>

            <img
              src={safeMoodSong.coverUrl || ""}
              alt={safeMoodSong.title}
              className="w-full aspect-square rounded-2xl border border-white/10 object-cover"
            />

            <div className="mt-3 truncate text-sm font-semibold">
              {safeMoodSong.title}
            </div>
            <div className="truncate text-xs text-white/60">
              {safeMoodSong.artist}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#151A22] p-4">
            <div className="mb-3 text-xs text-white/50">👑 殿堂入り</div>

            <img
              src={selectedBest5[1]?.coverUrl || safeMoodSong.coverUrl || ""}
              alt={selectedBest5[1]?.title || safeMoodSong.title}
              className="w-full aspect-square rounded-2xl border border-white/10 object-cover"
            />

            <div className="mt-3 truncate text-sm font-semibold">
              {selectedBest5[1]?.title || safeMoodSong.title}
            </div>
            <div className="truncate text-xs text-white/60">
              {selectedBest5[1]?.artist || safeMoodSong.artist}
            </div>
          </div>
        </div>

        <section className="mt-8">
          <div className="mb-4 h-px bg-white/10" />
          <div className="mb-4 text-lg font-semibold">直近ベスト5</div>

          <div className="space-y-3">
            {recentBest5.map((track: any, i: number) => (
              <div
                key={track.id}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#151A22] p-3"
              >
                <div className="w-6 text-center text-sm text-white/50">
                  {i + 1}
                </div>

                <img
                  src={track.coverUrl || ""}
                  alt={track.title}
                  className="h-14 w-14 rounded-xl border border-white/10 object-cover"
                />

                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold">{track.title}</div>
                  <div className="truncate text-sm text-white/60">
                    {track.artist}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-4 h-px bg-white/10" />
          <div className="mb-4 text-lg font-semibold">選択ベスト5</div>

          <div className="space-y-3">
            {selectedBest5.map((track: any, i: number) => (
              <div
                key={track.id + "-" + i}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#151A22] p-3"
              >
                <div className="w-6 text-center text-sm text-white/50">
                  {i + 1}
                </div>

                <img
                  src={track.coverUrl || ""}
                  alt={track.title}
                  className="h-14 w-14 rounded-xl border border-white/10 object-cover"
                />

                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold">{track.title}</div>
                  <div className="truncate text-sm text-white/60">
                    {track.artist}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <BottomNav />
    </main>
  );
}
