"use client";

import { useState } from "react";
import AppHeader from "../../components/AppHeader";
import BottomNav from "../../components/BottomNav";
import { getAppData, saveAppData } from "../../lib/store";

export default function PostPage() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const search = async () => {
    setError("");
    setResults([]);

    const token = localStorage.getItem("spotify_access_token");

    if (!token) {
      setError("先にSpotifyログインしてください");
      return;
    }

    if (!keyword.trim()) {
      setError("検索ワードを入れてください");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(keyword)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "検索に失敗しました");
        return;
      }

      setResults(data);
    } catch (e: any) {
      setError("検索中にエラーが起きました");
    } finally {
      setLoading(false);
    }
  };

  const setMoodSong = (track: any) => {
    const data = getAppData();

    data.me.moodSong = {
      id: track.id,
      title: track.title,
      artist: track.artist,
      coverUrl: track.coverUrl,
    };

    saveAppData(data);
    alert("今の音楽に設定しました");
    window.location.href = "/profile";
  };

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white pb-28">
      <AppHeader />

      <div className="mx-auto max-w-md px-4 pt-6">
        <h1 className="text-xl font-bold">曲を検索</h1>
        <p className="mt-2 text-sm text-white/60">
          Spotifyから曲を探して、今の音楽に設定する
        </p>

        <a
          href="/login"
          className="mt-4 inline-flex rounded-full bg-green-500 px-4 py-2 font-semibold text-black"
        >
          Spotifyログインへ
        </a>

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
          {loading ? "検索中..." : "検索"}
        </button>

        {error && <div className="mt-3 text-sm text-red-400">{error}</div>}

        <div className="mt-5 space-y-3">
          {results.map((track: any) => (
            <button
              key={track.id}
              onClick={() => setMoodSong(track)}
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