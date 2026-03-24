"use client";

import { useEffect, useRef, useState } from "react";

type StoryItem = {
  id: string;
  artist: string;
  title: string;
  coverUrl: string;
  previewUrl: string;
  avatar: string;
};

type Props = {
  story: StoryItem;
  hasNext: boolean;
  hasPrev: boolean;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
  markRead: (id: string) => void;
};

function FakeWave({ playing }: { playing: boolean }) {
  const bars = Array.from({ length: 18 });

  return (
    <div className="flex items-end justify-center gap-[3px] h-10">
      {bars.map((_, i) => (
        <div
          key={i}
          className={`w-[3px] rounded-full bg-white/80 ${
            playing ? "animate-wave" : ""
          }`}
          style={{
            height: `${8 + ((i * 7) % 22)}px`,
            animationDelay: `${i * 0.04}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function StoryViewer({
  story,
  hasNext,
  hasPrev,
  onNext,
  onPrev,
  onClose,
  markRead,
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    markRead(story.id);
  }, [story.id, markRead]);

  useEffect(() => {
    setPlaying(false);
    setProgress(0);
    const a = audioRef.current;
    if (a) {
      a.pause();
      a.currentTime = 0;
    }
  }, [story.id]);

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
      rafRef.current = null;
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
    <div className="fixed inset-0 z-[100] bg-black">
      <div className="absolute left-0 right-0 top-0 p-3">
        <div className="h-1 rounded-full bg-white/20 overflow-hidden">
          <div className="h-1 bg-white" style={{ width: progress * 100 + "%" }} />
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center">
              {story.avatar}
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">{story.id}</div>
              <div className="text-xs text-white/60">{story.artist}</div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="absolute inset-0">
        <img
          src={story.coverUrl}
          alt=""
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/80" />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-5">
          <img
            src={story.coverUrl}
            alt={story.title}
            className="w-full aspect-square rounded-2xl object-cover border border-white/10"
          />

          <div className="mt-4">
            <div className="text-lg font-semibold truncate">{story.title}</div>
            <div className="text-sm text-white/70 truncate">{story.artist}</div>
          </div>

          <div className="mt-4">
            <FakeWave playing={playing} />
          </div>

          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={togglePlay}
              className="h-12 w-12 rounded-full bg-green-500 text-black font-bold flex items-center justify-center active:scale-[0.98] transition"
            >
              {playing ? "❚❚" : "▶"}
            </button>

            <div className="text-xs text-white/60">30s preview</div>
          </div>

          <audio ref={audioRef} src={story.previewUrl} />
        </div>
      </div>

      <button
        onClick={() => hasPrev && onPrev()}
        className="absolute left-0 top-0 h-full w-1/2"
      />
      <button
        onClick={() => (hasNext ? onNext() : onClose())}
        className="absolute right-0 top-0 h-full w-1/2"
      />
    </div>
  );
}
