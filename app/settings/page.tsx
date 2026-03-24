"use client";

import AppHeader from "../../components/AppHeader";
import BottomNav from "../../components/BottomNav";

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white pb-28">
      <AppHeader />
      <div className="mx-auto max-w-md px-4 pt-6">
        <div className="text-lg font-semibold">設定</div>
      </div>
      <BottomNav />
    </main>
  );
}
