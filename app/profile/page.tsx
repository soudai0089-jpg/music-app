"use client";

import AppHeader from "../../components/AppHeader";
import BottomNav from "../../components/BottomNav";
import { getAppData } from "../../lib/store";

export default function ProfilePage() {
  const data = getAppData();
  const me = data.me;

  const recentBest5 = data.recommended.slice(0, 5);
  const selectedBest5 = [
    me.moodSong,
    ...data.friends.map((f: any) => f.moodSong),
  ].slice(0, 5);

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white pb-28">
      <AppHeader />

      <div className="mx-auto max-w-md px-4 pt-6">
        {/* 上：アイコンとユーザー名 */}
        <div className="flex flex-col items-center">
          <div className="h-24 w-24 rounded-full bg-white/10 flex items-center justify-center text-3xl border border-white/10">
            {me.avatar}
          </div>

          <div className="mt-3 text-xl font-bold">{me.username}</div>
          <div className="mt-1 text-sm text-white/60">@{me.id}</div>
        </div>

        {/* 今の一曲 / 殿堂入り */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          {/* 🔥 今の一曲 */}
          <div className="rounded-3xl border border-white/10 bg-[#151A22] p-4">
            <div className="text-xs text-white/50 mb-3">🔥 今の一曲</div>

            <img
              src={me.moodSong.coverUrl}
              alt={me.moodSong.title}
              className="w-full aspect-square rounded-2xl object-cover border border-white/10"
            />

            <div className="mt-3 text-sm font-semibold truncate">
              {me.moodSong.title}
            </div>
            <div className="text-xs text-white/60 truncate">
              {me.moodSong.artist}
            </div>
          </div>

          {/* 👑 殿堂入り */}
          <div className="rounded-3xl border border-white/10 bg-[#151A22] p-4">
            <div className="text-xs text-white/50 mb-3">👑 殿堂入り</div>

            <img
              src={selectedBest5[1]?.coverUrl || me.moodSong.coverUrl}
              alt={selectedBest5[1]?.title || me.moodSong.title}
              className="w-full aspect-square rounded-2xl object-cover border border-white/10"
            />

            <div className="mt-3 text-sm font-semibold truncate">
              {selectedBest5[1]?.title || me.moodSong.title}
            </div>
            <div className="text-xs text-white/60 truncate">
              {selectedBest5[1]?.artist || me.moodSong.artist}
            </div>
          </div>
        </div>

        {/* 直近ベスト5 */}
        <section className="mt-8">
          <div className="h-px bg-white/10 mb-4" />
          <div className="text-lg font-semibold mb-4">直近ベスト5</div>

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
                  src={track.coverUrl}
                  alt={track.title}
                  className="h-14 w-14 rounded-xl object-cover border border-white/10"
                />

                <div className="min-w-0 flex-1">
                  <div className="font-semibold truncate">{track.title}</div>
                  <div className="text-sm text-white/60 truncate">
                    {track.artist}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 選択ベスト5 */}
        <section className="mt-8">
          <div className="h-px bg-white/10 mb-4" />
          <div className="text-lg font-semibold mb-4">選択ベスト5</div>

          <div className="space-y-3">
            {selectedBest5.map((track, i) => (
              <div
                key={track.id + "-" + i}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#151A22] p-3"
              >
                <div className="w-6 text-center text-sm text-white/50">
                  {i + 1}
                </div>

                <img
                  src={track.coverUrl}
                  alt={track.title}
                  className="h-14 w-14 rounded-xl object-cover border border-white/10"
                />

                <div className="min-w-0 flex-1">
                  <div className="font-semibold truncate">{track.title}</div>
                  <div className="text-sm text-white/60 truncate">
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
