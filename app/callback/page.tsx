"use client";

import { useEffect } from "react";
import AppHeader from "../../components/AppHeader";
import BottomNav from "../../components/BottomNav";

export default function CallbackPage() {
  useEffect(() => {
    console.log("callback loaded");
  }, []);

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white pb-28">
      <AppHeader />

      <div className="mx-auto max-w-md px-4 pt-6">
        <h1 className="text-xl font-bold">Callback</h1>
        <p className="mt-2 text-white/60">処理中...</p>
      </div>

      <BottomNav />
    </main>
  );
}
