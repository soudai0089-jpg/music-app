"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function loadMe() {
  const raw = localStorage.getItem("music-app-me");
  if (!raw) {
    return {
      id: "me",
      username: "you",
    };
  }
  return JSON.parse(raw);
}

function saveMe(me: any) {
  localStorage.setItem("music-app-me", JSON.stringify(me));
}

function typeFromScore(score: number) {
  if (score >= 80) return "Night Listener";
  if (score >= 60) return "Mood Diver";
  if (score >= 40) return "Replay Addict";
  return "Casual Explorer";
}

export default function DiagnosePage() {
  const router = useRouter();
  const [score, setScore] = useState(50);

  const handleSave = () => {
    const nextScore = Number(score);
    const me: any = loadMe();

    me.diagnosis = {
      type: typeFromScore(nextScore),
      score: nextScore,
    };

    saveMe(me);
    router.push("/profile");
  };

  return (
    <main className="min-h-screen bg-black text-white px-4 py-8">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-bold">音楽タイプ診断</h1>
        <p className="mt-2 text-sm text-white/60">
          スコアを決めてプロフィールに保存します
        </p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="text-sm text-white/70">診断スコア</div>

          <input
            type="range"
            min={0}
            max={100}
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
            className="mt-4 w-full"
          />

          <div className="mt-4 text-3xl font-bold">{score}</div>
          <div className="mt-2 text-lg text-green-400">
            {typeFromScore(score)}
          </div>

          <button
            onClick={handleSave}
            className="mt-6 w-full rounded-xl bg-green-500 py-3 font-semibold text-black"
          >
            診断結果を保存する
          </button>
        </div>
      </div>
    </main>
  );
}
