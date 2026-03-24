"use client";

import { useState } from "react";
import AppHeader from "../../components/AppHeader";
import BottomNav from "../../components/BottomNav";
import { setMyMoodSong } from "../../lib/store";

export default function PostPage() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState("");

  const search = async () => {
    setError("");
    setResults([]);

    const token = localStorage.getItem("spotify_access_token");

    if (!token) {
      setError("先に /login でSpotifyログインしてください");
      return;
    }

    const res = await fetch(`/api/search?q=${encodeURIComponent(keyword)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log("search result:", data);

    if (!res.ok) {
      setError(data.error || "検索に失敗しました");
      return;
    }

    setResults(data);
  };

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white pb-28">
      <AppHeader />

      <div className="mx-auto max-w-md px-4 pt-4">
        <div className="text-lg font-semibold">今の音楽を設定</div>
        <div className="mt-1 text-sm text-white/60">
          Spotifyから曲を検索して設定する
        </div>

        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="曲名 / アーティスト"
          className="mt-4 w-full rounded-2xl border border-white/10 bg-[#151A22] px-4 py-3 outline-none"
        />

        <button
          onClick={search}
          className="mt-3 w-full rounded-2xl bg-green-500 py-3 font-semibold text-black"
        >
          検索
        </button>

        {error ? <div className="mt-3 text-sm text-red-400">{error}</div> : null}

        <div className="mt-4 space-y-3">
          {results.map((track) => (
            <button
              key={track.id}
              onClick={() => {
                setMyMoodSong(track);
                alert("今の音楽に設定しました");
              }}
              className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-[#151A22] p-3 text-left"
            >
              <img
                src={track.coverUrl}
                alt={track.title}
                className="h-14 w-14 rounded-xl object-cover"
              />

              <div className="min-w-0 flex-1">
                <div className="truncate font-semibold">{track.title}</div>
                <div className="truncate text-sm text-white/60">
                  {track.artist}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
