"use client";

import { useEffect, useState } from "react";
import AppHeader from "../../components/AppHeader";
import BottomNav from "../../components/BottomNav";
import {
  getAppData,
  initData,
  type AppData,
  type Track,
} from "../../lib/store";

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
        {/* プロフィール上部 */}
        <div className="flex flex-col items-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/10 text-3xl shadow-[0_0_30px_rgba(255,255,255,0.05)]">
            {me.avatar}
          </div>

          <div className="mt-5 grid w-full max-w-[360px] grid-cols-3 items-center">
            <div className="flex flex-col items-center">
              <div className="text-[26px] font-semibold leading-none">
                {followingCount}
              </div>
              <div className="mt-1 text-sm text-white/65">フォロー</div>
            </div>

            <div className="text-center">
              <div className="text-[42px] font-bold leading-none tracking-tight">
                {me.username}
              </div>
              <div className="mt-2 text-[18px] text-white/55">@{me.id}</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-[26px] font-semibold leading-none">
                {followerCount}
              </div>
              <div className="mt-1 text-sm text-white/65">フォロワー</div>
            </div>
          </div>
        </div>

        {/* 今の一曲 / 殿堂入り */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="rounded-[28px] bg-white/[0.04] px-4 pb-5 pt-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ring-1 ring-white/5">
            <div className="mb-4 text-center text-[15px] font-semibold text-white">
              🔥 今の一曲
            </div>

            {me.moodSong ? (
              <div className="flex flex-col items-center text-center">
                <img
                  src={me.moodSong.coverUrl}
                  alt={me.moodSong.title}
                  className="h-[140px] w-[140px] rounded-2xl object-cover ring-1 ring-white/10"
                />

                <div className="mt-3 text-[22px] font-semibold leading-tight">
                  {me.moodSong.title}
                </div>
                <div className="mt-1 text-[16px] text-white/65">
                  {me.moodSong.artist}
                </div>
              </div>
            ) : (
              <div className="flex h-[140px] w-[140px] mx-auto items-center justify-center rounded-2xl border border-dashed border-white/10 text-sm text-white/40">
                まだ未設定
              </div>
            )}
          </div>

          <div className="rounded-[28px] bg-white/[0.04] px-4 pb-5 pt-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ring-1 ring-white/5">
            <div className="mb-4 text-center text-[15px] font-semibold text-white">
              👑 殿堂入り
            </div>

            {hallOfFame ? (
              <div className="flex flex-col items-center text-center">
                <img
                  src={hallOfFame.coverUrl}
                  alt={hallOfFame.title}
                  className="h-[140px] w-[140px] rounded-2xl object-cover ring-1 ring-white/10"
                />

                <div className="mt-3 text-[22px] font-semibold leading-tight">
                  {hallOfFame.title}
                </div>
                <div className="mt-1 text-[16px] text-white/65">
                  {hallOfFame.artist}
                </div>
              </div>
            ) : (
              <div className="flex h-[140px] w-[140px] mx-auto items-center justify-center rounded-2xl border border-dashed border-white/10 text-sm text-white/40">
                まだ未設定
              </div>
            )}
          </div>
        </div>

        {/* 直近ベスト5 */}
        <section className="mt-8 rounded-[28px] bg-white/[0.04] px-5 pb-5 pt-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ring-1 ring-white/5">
          <div className="mb-5 text-[20px] font-bold tracking-tight">
            直近ベスト5
          </div>

          <div className="space-y-4">
            {recentBest5.map((track, i) => (
              <div key={track.id} className="flex items-center gap-3">
                <div className="w-4 text-[15px] text-white/55">{i + 1}</div>

                <img
                  src={track.coverUrl}
                  alt={track.title}
                  className="h-14 w-14 rounded-xl object-cover ring-1 ring-white/10"
                />

                <div className="min-w-0 flex-1">
                  <div className="truncate text-[17px] font-semibold leading-tight">
                    {track.title}
                  </div>
                  <div className="mt-1 truncate text-[14px] text-white/60">
                    {track.artist}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 選択ベスト5 */}
        <section className="mt-6 rounded-[28px] bg-white/[0.04] px-5 pb-5 pt-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ring-1 ring-white/5">
          <div className="mb-5 text-[20px] font-bold tracking-tight">
            選択ベスト5
          </div>

          <div className="space-y-4">
            {selectedBest5.map((track, i) => (
              <button
                key={`selected-${i}`}
                onClick={() => openEditSelected(i)}
                className="flex w-full items-center gap-3 text-left"
              >
                <div className="w-4 text-[15px] text-white/55">{i + 1}</div>

                {track ? (
                  <>
                    <img
                      src={track.coverUrl}
                      alt={track.title}
                      className="h-14 w-14 rounded-xl object-cover ring-1 ring-white/10"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[17px] font-semibold leading-tight">
                        {track.title}
                      </div>
                      <div className="mt-1 truncate text-[14px] text-white/60">
                        {track.artist}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex min-h-[56px] flex-1 items-center rounded-xl border border-dashed border-white/10 px-4 text-sm text-white/40">
                    曲を選ぶ
                  </div>
                )}

                <div className="text-[30px] leading-none text-white/50">›</div>
              </button>
            ))}
          </div>
        </section>
      </div>

      <BottomNav />
    </main>
  );
}
