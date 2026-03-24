"use client";

import { useEffect, useMemo, useState } from "react";
import AppHeader from "../components/AppHeader";
import BottomNav from "../components/BottomNav";
import ReelCard from "../components/ReelCard";
import StoryBubble from "../components/StoryBubble";
import StoryViewer from "../components/StoryViewer";
import { getAppData, markStoryViewed, syncSpotifyToHome } from "../lib/store";

export default function HomePage() {
  const [data, setData] = useState(getAppData());
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [loadingSpotify, setLoadingSpotify] = useState(false);
  const [spotifyError, setSpotifyError] = useState("");

  useEffect(() => {
    setData(getAppData());
  }, []);

  const stories = useMemo(() => {
    const all = [data.me, ...data.friends];
    return all.map((user) => ({
      id: user.id,
      artist: user.moodSong.artist,
      title: user.moodSong.title,
      coverUrl: user.moodSong.coverUrl,
      previewUrl: user.moodSong.previewUrl,
      avatar: user.avatar,
      unread: !data.viewedStoryIds.includes(user.id),
    }));
  }, [data]);

  const handleRead = (id: string) => {
    markStoryViewed(id);
    setData(getAppData());
  };

  const handleSpotifyReflect = async () => {
    try {
      setLoadingSpotify(true);
      setSpotifyError("");
      const next = await syncSpotifyToHome();
      setData(next);
    } catch (e: any) {
      setSpotifyError(e.message || "Spotify反映に失敗しました");
    } finally {
      setLoadingSpotify(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <AppHeader />

      {/* Spotify反映ボタン */}
      <section className="px-4 pt-3">
        <button
          onClick={handleSpotifyReflect}
          className="w-full rounded-2xl bg-green-500 py-3 font-semibold text-black"
        >
          {loadingSpotify ? "Spotify反映中..." : "SpotifyのTop曲をホームに反映"}
        </button>

        {spotifyError ? (
          <div className="mt-2 text-sm text-red-400">{spotifyError}</div>
        ) : null}
      </section>

      {/* ストーリー */}
      <section className="sticky top-[69px] z-30 bg-[#0B0F14] px-4 pb-2 pt-3">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2">
          <StoryBubble
            artist={stories[0].artist}
            id={stories[0].id}
            unread={stories[0].unread}
            avatar={stories[0].avatar}
            onClick={() => setOpenIndex(0)}
          />

          <div className="mx-1 h-12 w-px shrink-0 bg-white/10" />

          {stories.slice(1).map((story, idx) => (
            <StoryBubble
              key={story.id}
              artist={story.artist}
              id={story.id}
              unread={story.unread}
              avatar={story.avatar}
              onClick={() => setOpenIndex(idx + 1)}
            />
          ))}
        </div>

        <div className="mt-2 h-px bg-white/10" />
      </section>

      {/* リール：1画面1曲の縦スワイプ */}
      <section
        className="snap-y snap-mandatory overflow-y-auto no-scrollbar px-3 pt-2 pb-24"
        style={{ height: "calc(100vh - 170px)" }}
      >
        <div className="space-y-0">
          {data.recommended.map((track) => (
            <div key={track.id} className="h-[calc(100vh-170px)] snap-start">
              <ReelCard track={track} />
            </div>
          ))}
        </div>
      </section>

      <BottomNav />

      {openIndex !== null && (
        <StoryViewer
          story={stories[openIndex]}
          hasNext={openIndex < stories.length - 1}
          hasPrev={openIndex > 0}
          onNext={() =>
            setOpenIndex((prev) =>
              prev === null ? null : Math.min(stories.length - 1, prev + 1)
            )
          }
          onPrev={() =>
            setOpenIndex((prev) =>
              prev === null ? null : Math.max(0, prev - 1)
            )
          }
          onClose={() => setOpenIndex(null)}
          markRead={handleRead}
        />
      )}

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @keyframes wave {
          0% {
            transform: scaleY(0.5);
            opacity: 0.7;
          }
          50% {
            transform: scaleY(1.25);
            opacity: 1;
          }
          100% {
            transform: scaleY(0.6);
            opacity: 0.8;
          }
        }

        .animate-wave {
          animation: wave 0.9s ease-in-out infinite;
          transform-origin: bottom;
        }

        @keyframes slowzoom {
          0% {
            transform: scale(1.08);
          }
          50% {
            transform: scale(1.14);
          }
          100% {
            transform: scale(1.08);
          }
        }

        .animate-slowzoom {
          animation: slowzoom 10s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
