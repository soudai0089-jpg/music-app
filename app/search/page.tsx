"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type MoodSong = {
  title: string;
  artist: string;
};

type Friend = {
  id: string;
  username: string;
  moodSong?: MoodSong;
};

type AppData = {
  friends: Friend[];
};

function getAppData(): AppData {
  if (typeof window === "undefined") {
    return { friends: [] };
  }

  const raw = localStorage.getItem("music-app-data");

  if (!raw) {
    return {
      friends: [
        {
          id: "haruto",
          username: "Haruto",
          moodSong: { title: "言って。", artist: "ヨルシカ" },
        },
        {
          id: "saki",
          username: "Saki",
          moodSong: { title: "Ref:rain", artist: "Aimer" },
        },
        {
          id: "ren",
          username: "Ren",
          moodSong: { title: "怪獣の花唄", artist: "Vaundy" },
        },
      ],
    };
  }

  try {
    return JSON.parse(raw);
  } catch {
    return { friends: [] };
  }
}

export default function SearchPage() {
  const [q, setQ] = useState("");

  const data = useMemo(() => getAppData(), []);

  const filtered = useMemo(() => {
    const keyword = q.trim().toLowerCase();

    if (!keyword) return data.friends;

    return data.friends.filter(
      (user: Friend) =>
        user.id.toLowerCase().includes(keyword) ||
        user.username.toLowerCase().includes(keyword)
    );
  }, [q, data.friends]);

  return (
    <main className="min-h-screen bg-black px-4 py-6 text-white">
      <div className="mx-auto max-w-md">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Search</h1>
          <Link href="/" className="text-sm text-white/70">
            戻る
          </Link>
        </div>

        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="ユーザー名で検索"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40"
        />

        <div className="mt-6 space-y-3">
          {filtered.map((user: Friend) => (
            <Link
              key={user.id}
              href={`/u/${user.id}`}
              className="block rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <div className="text-base font-semibold">{user.username}</div>
              <div className="mt-1 text-sm text-white/60">@{user.id}</div>

              {user.moodSong && (
                <div className="mt-3 text-sm text-white/80">
                  今の一曲: {user.moodSong.title} / {user.moodSong.artist}
                </div>
              )}
            </Link>
          ))}

          {filtered.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/60">
              見つかりませんでした
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
