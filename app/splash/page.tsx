"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/");
    }, 1200); // 1.2秒表示

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B0F14] via-[#14192a] to-[#0B0F14] text-white flex flex-col items-center justify-center">
      <div className="text-4xl mb-4 animate-pulse">🎧</div>

      <h1 className="text-2xl font-bold tracking-wide">
        Now Listening
      </h1>

      <p className="text-sm text-white/60 mt-3">
        あなたと誰かの音楽が重なる瞬間
      </p>

      <div className="mt-10 text-xs text-white/40">
        Loading...
      </div>
    </div>
  );
}
