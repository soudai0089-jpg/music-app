"use client";

import { useParams } from "next/navigation";
import AppHeader from "../../../components/AppHeader";
import BottomNav from "../../../components/BottomNav";
import { getAppData } from "../../../lib/store";

export default function FriendPage() {
  const params = useParams<{ id: string }>();
  const data = getAppData();
  const user = data.friends.find((f: any) => f.id === params.id);

  if (!user) {
    return (
      <main className="min-h-screen bg-[#0B0F14] text-white">
        <AppHeader />
        <div className="mx-auto max-w-md px-4 pt-6">見つかりません</div>
        <BottomNav />
      </main>
    );
  }

  const safeMoodSong = user.moodSong || {
    id: "fallback",
    title: "未設定",
    artist: "No Artist",
    coverUrl: "",
  };

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white pb-28">
      <AppHeader />

      <div className="mx-auto max-w-md px-4 pt-6">
        <div className="flex flex-col items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-2xl">
            {user.avatar || "👤"}
          </div>
          <div className="mt-3 text-xl font-bold">{user.username}</div>
          <div className="mt-1 text-sm text-white/60">@{user.id}</div>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-[#151A22] p-5">
          <div className="text-sm text-white/60">今の音楽</div>

          <div className="mt-4 flex gap-4">
            <img
              src={safeMoodSong.coverUrl || ""}
              alt={safeMoodSong.title}
              className="h-24 w-24 rounded-2xl object-cover"
            />

            <div className="min-w-0 flex-1">
              <div className="truncate text-lg font-semibold">
                {safeMoodSong.title}
              </div>
              <div className="truncate text-sm text-white/70">
                {safeMoodSong.artist}
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
