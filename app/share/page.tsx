"use client";

import { useEffect, useState } from "react";
import AppHeader from "../../components/AppHeader";
import BottomNav from "../../components/BottomNav";

export default function SharePage() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // 🔥 ここで初めてlocalStorage使える
    const data = localStorage.getItem("music-app-data");
    console.log(data);

    setReady(true);
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white pb-28">
      <AppHeader />

      <div className="mx-auto max-w-md px-4 pt-6">
        <h1 className="text-xl font-bold">シェアページ</h1>
        <p className="mt-2 text-white/60">ここはあとで作る</p>
      </div>

      <BottomNav />
    </main>
  );
}
