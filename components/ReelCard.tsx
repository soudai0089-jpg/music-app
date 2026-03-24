"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ReelTrack = {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  previewUrl: string;
  moodText: string;
};

function FakeWave({ playing }: { playing: boolean }) {
  const bars = useMemo(() => Array.from({ length: 20 }), []);

  return (
    <div className="flex items-end justify-center gap-[3px] h-12">
      {bars.map((_, i) => (
        <div
          key={i}
          className={`w-[4px] rounded-full bg-white/90 ${
            playing ? "animate-wave" : ""
          }`}
          style={{
            height: `${10 + ((i * 9) % 26)}px`,
            animationDelay: `${i * 0.04}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function ReelCard({ track }: { track: ReelTrack }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tick = () => {
      const audio = audioRef.current;
      if (audio) {
        const duration = audio.duration || 0;
        const p = duration > 0 ? audio.currentTime / duration : 0;
        setProgress(Math.min(1, Math.max(0, p)));
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const audio = audioRef.current;
      if (audio) audio.pause();
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (audio.paused) {
        await audio.play();
        setPlaying(true);
      } else {
        audio.pause();
        setPlaying(false);
      }
    } catch {}
  };

  return (
    <section className="relative h-full overflow-hidden bg-black rounded-2xl">
      {/* 背景 */}
      <div className="absolute inset-0">
        <img
          src={track.coverUrl}
          alt={track.title}
          className="h-full w-full object-cover scale-110 opacity-30 animate-slowzoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/75" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.18),transparent_55%)] animate-pulse" />
      </div>

      {/* コンテンツ */}
      <div className="relative z-10 flex h-full flex-col justify-center px-4 py-4">
        <div className="rounded-3xl border border-white/10 bg-[#151A22]/70 backdrop-blur-md p-5 shadow-xl">
          {/* 進捗 */}
          <div className="mb-4 h-1 rounded-full bg-white/15 overflow-hidden">
            <div
              className="h-1 bg-white"
              style={{ width: progress * 100 + "%" }}
            />
          </div>

          {/* ジャケット */}
          <img
            src={track.coverUrl}
            alt={track.title}
            className="w-full aspect-square rounded-2xl object-cover border border-white/10"
          />

          {/* 曲情報 */}
          <div className="mt-5 text-center">
            <div className="text-2xl font-bold truncate">{track.title}</div>
            <div className="mt-1 text-sm text-white/70 truncate">
              {track.artist}
            </div>

            <div className="mt-3 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              {track.moodText}
            </div>
          </div>

          {/* 波形 */}
          <div className="mt-6">
            <FakeWave playing={playing} />
          </div>

          {/* ボタン */}
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={togglePlay}
              className="h-14 w-14 rounded-full bg-green-500 text-black font-bold text-lg flex items-center justify-center active:scale-[0.98] transition"
            >
              {playing ? "❚❚" : "▶"}
            </button>

            <div className="text-xs text-white/60">30s preview</div>

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
