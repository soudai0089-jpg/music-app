"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

type ReelTrack = {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  previewUrl: string;
  moodText: string;
};

const tracks: ReelTrack[] = [
  {
    id: "r1",
    title: "晴る",
    artist: "ヨルシカ",
    coverUrl: "https://placehold.co/800x800/png?text=Haru",
    previewUrl: "/demo.mp3",
    moodText: "midnight calm",
  },
  {
    id: "r2",
    title: "Ref:rain",
    artist: "Aimer",
    coverUrl: "https://placehold.co/800x800/png?text=Ref%3Arain",
    previewUrl: "/demo.mp3",
    moodText: "rainy memory",
  },
  {
    id: "r3",
    title: "怪獣の花唄",
    artist: "Vaundy",
    coverUrl: "https://placehold.co/800x800/png?text=Kaiju",
    previewUrl: "/demo.mp3",
    moodText: "energy rush",
  },
];

function FakeWave({ playing }: { playing: boolean }) {
  const bars = useMemo(() => Array.from({ length: 20 }), []);
  return (
    <div className="flex items-end justify-center gap-[3px] h-12">
      {bars.map((_, i) => (
        <div
          key={i}
          className={`w-[4px] rounded-full bg-white/90 ${playing ? "animate-wave" : ""}`}
          style={{
            height: `${10 + ((i * 9) % 26)}px`,
            animationDelay: `${i * 0.04}s`,
          }}
        />
      ))}
    </div>
  );
}

function ReelCard({ track }: { track: ReelTrack }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tick = () => {
      const a = audioRef.current;
      if (a) {
        const d = a.duration || 0;
        const p = d > 0 ? a.currentTime / d : 0;
        setProgress(Math.min(1, Math.max(0, p)));
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const a = audioRef.current;
      if (a) a.pause();
    };
  }, []);

  const togglePlay = async () => {
    const a = audioRef.current;
    if (!a) return;

    try {
      if (a.paused) {
        await a.play();
        setPlaying(true);
      } else {
        a.pause();
        setPlaying(false);
      }
    } catch {}
  };

  return (
    <section className="relative h-screen snap-start overflow-hidden bg-black">
      {/* 背景エフェクト */}
      <div className="absolute inset-0">
        <img
          src={track.coverUrl}
          alt={track.title}
          className="h-full w-full object-cover scale-110 opacity-30 animate-slowzoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/55 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.20),transparent_55%)] animate-pulse" />
      </div>

      {/* 上部バー */}
      <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-4 pt-6">
        <Link href="/" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
          ←
        </Link>
        <div className="text-sm font-semibold tracking-wide">Reels</div>
        <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
          …
        </div>
      </div>

      {/* 中央コンテンツ */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-5 shadow-2xl">
          {/* 進捗 */}
          <div className="mb-4 h-1 rounded-full bg-white/15 overflow-hidden">
            <div className="h-1 bg-white" style={{ width: (progress * 100) + "%" }} />
          </div>

          {/* ジャケット */}
          <div className="relative">
            <img
              src={track.coverUrl}
              alt={track.title}
              className="w-full aspect-square rounded-2xl object-cover border border-white/10 shadow-xl"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
          </div>

          {/* 曲情報 */}
          <div className="mt-5 text-center">
            <div className="text-2xl font-bold tracking-tight">{track.title}</div>
            <div className="mt-1 text-sm text-white/70">{track.artist}</div>
            <div className="mt-3 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              {track.moodText}
            </div>
          </div>

          {/* 波形 */}
          <div className="mt-6">
            <FakeWave playing={playing} />
          </div>

          {/* コントロール */}
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={togglePlay}
              className="h-14 w-14 rounded-full bg-green-500 text-black font-bold text-lg flex items-center justify-center active:scale-[0.98] transition"
            >
              {playing ? "❚❚" : "▶"}
            </button>

            <div className="text-xs text-white/60">
              30s preview
            </div>

            <button className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
              ♡
            </button>
          </div>

          <audio ref={audioRef} src={track.previewUrl} />
        </div>
      </div>
    </section>
  );
}

export default function ReelsPage() {
  return (
    <main className="h-screen snap-y snap-mandatory overflow-y-scroll bg-[#0B0F14] text-white no-scrollbar">
      {tracks.map((track) => (
        <ReelCard key={track.id} track={track} />
      ))}

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
