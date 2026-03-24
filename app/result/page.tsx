"use client";

import AppHeader from "../../components/AppHeader";
import BottomNav from "../../components/BottomNav";

export default function ResultPage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white pb-28">
      <AppHeader />

      <div className="mx-auto max-w-md px-4 pt-6">
        <h1 className="text-xl font-bold">診断結果</h1>
        <p className="mt-2 text-white/60">
          ここに結果を表示する（あとで作る）
        </p>
      </div>

      <BottomNav />
    </main>
  );
}
