"use client";

import { useEffect, useState } from "react";
import AppHeader from "../../components/AppHeader";
import BottomNav from "../../components/BottomNav";
import { getAppData, initData, type AppData, type Track } from "../../lib/store";

export default function ProfilePage() {
  const [data, setData] = useState<AppData | null>(null);

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

  const me = data.me;
  const followingCount = data.followingIds.length;
  const followerCount = data.friends.length;
  const recentBest5 = data.recommended.slice(0, 5);
  const selectedBest5 = data.selectedBest5;

  const hallOfFame: Track | null = selectedBest5[0] ?? me.moodSong;

  const openEditSelected = (index: number) => {
    localStorage.setItem("editing_selected_index", String(index));
    window.location.href = "/post";
  };

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white pb-28">
      <AppHeader />

      <div className="mx-auto max-w-md px-4 pt-6">
        <div className="flex flex-col items-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/10 text-3xl">
            {me.avatar}
          </div>

          <div className="mt-4 grid w-full max-w-[340px] grid-cols-3 items-center">
            <div className="text-center">
              <div className="text-2xl font-semibold">{followingCount}</div>
              <div className="mt-1 text-sm text-white/65">フォロー</div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold">{me.username}</div>
              <div className="mt-2 text-lg text-white/55">@{me.id}</div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-semibold">{followerCount}</div>
              <div className="mt-1 text-sm text-white/65">フォロワー</div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="rounded-3xl border border-white/10 bg-[#151A22] p-4">
            <div className="mb-4 text-center text-xs text-white/50">🔥 今の一曲</div>

            {me.moodSong ? (
              <div className="flex flex-col items-center text-center">
                <img
                  src={me.moodSong.coverUrl}
                  alt={me.moodSong.title}
                  className="aspect-square w-full rounded-2xl border border-white/10 object-cover"
                />

                <div className="mt-3 text-2xl font-semibold leading-tight">
                  {me.moodSong.title}
                </div>
                <div className="mt-1 text-lg text-white/65">
                  {me.moodSong.artist}
                </div>
              </div>
            ) : (
              <div className="flex aspect-square w-full items-center justify-center rounded-2xl border border-dashed border-white/10 text-sm text-white/40">
                まだ未設定
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#151A22] p-4">
            <div className="mb-4 text-center text-xs text-white/50">👑 殿堂入り</div>

            {hallOfFame ? (
              <div className="flex flex-col items-center text-center">
                <img
                  src={hallOfFame.coverUrl}
                  alt={hallOfFame.title}
                  className="aspect-square w-full rounded-2xl border border-white/10 object-cover"
                />

                <div className="mt-3 text-2xl font-semibold leading-tight">
                  {hallOfFame.title}
                </div>
                <div className="mt-1 text-lg text-white/65">
                  {hallOfFame.artist}
                </div>
              </div>
            ) : (
              <div className="flex aspect-square w-full items-center justify-center rounded-2xl border border-dashed border-white/10 text-sm text-white/40">
                まだ未設定
              </div>
            )}
          </div>
        </div>

        <section className="mt-8">
          <div className="mb-4 h-px bg-white/10" />
          <div className="mb-4 text-lg font-semibold">直近ベスト5</div>

          <div className="space-y-3">
            {recentBest5.map((track, i) => (
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
            {selectedBest5.map((track, i) => (
              <button
                key={`selected-${i}`}
                onClick={() => openEditSelected(i)}
                className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-[#151A22] p-3 text-left"
              >
                <div className="w-6 text-center text-sm text-white/50">
                  {i + 1}
                </div>

                {track ? (
                  <>
                    <img
                      src={track.coverUrl}
                      alt={track.title}
                      className="h-14 w-14 rounded-xl border border-white/10 object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="truncate font-semibold">{track.title}</div>
                      <div className="truncate text-sm text-white/60">
                        {track.artist}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex min-h-[56px] flex-1 items-center rounded-xl border border-dashed border-white/10 px-4 text-sm text-white/40">
                    曲を選ぶ
                  </div>
                )}

                <div className="text-2xl text-white/45">›</div>
              </button>
            ))}
          </div>
        </section>
      </div>

      <BottomNav />
    </main>
  );
}
