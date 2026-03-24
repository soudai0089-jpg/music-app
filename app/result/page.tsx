"use client";

import { useSearchParams } from "next/navigation";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const score = Number(searchParams.get("score"));

  const getType = () => {
    if (score >= 3) return "Night Listener";
    if (score >= 2) return "Mood Drifter";
    return "Energy Hopper";
  };

  const type = getType();

  return (
    <div className="min-h-screen bg-[#0B0F14] text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-3xl font-bold mb-4">
        {type}
      </h1>

      <p className="text-gray-400 mb-8 text-center">
        あなたは最近、静かな時間を好む傾向があります。
      </p>

      <div className="text-5xl font-bold text-green-500 mb-8">
        相性 {Math.min(100, score * 25)}%
      </div>

      <button
        onClick={() => window.location.href = "/diagnose"}
        className="bg-green-500 px-6 py-3 rounded-xl"
      >
        もう一度診断する
      </button>
    </div>
  );
}
