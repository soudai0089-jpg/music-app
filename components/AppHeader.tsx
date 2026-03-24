"use client";

import Link from "next/link";

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-[#0B0F14]/90 px-5 pt-6 pb-3 backdrop-blur">
      <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
        🎧
      </div>

      <div className="text-lg font-semibold tracking-wide">Resonance</div>

      <Link href="/settings">
        <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
          ⚙️
        </div>
      </Link>
    </header>
  );
}
