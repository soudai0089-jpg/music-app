"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { loadMe, saveMe } from "../../lib/storage";

const questions = [
  "夜に音楽を聴くことが多い？",
  "最近静かな曲が多い？",
  "同じ曲を繰り返し聴く？",
  "プレイリストは自分で作る？",
];

function typeFromScore(score: number) {
  if (score >= 3) return "Night Listener";
  if (score === 2) return "Mood Drifter";
  return "Energy Hopper";
}

export default function DiagnosePage() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const router = useRouter();

  const answer = (yes: boolean) => {
    const nextScore = score + (yes ? 1 : 0);
    if (step < questions.length - 1) {
      setScore(nextScore);
      setStep(step + 1);
      return;
    }
    // 保存してプロフィールへ
    const me = loadMe();
    me.diagnosis = { type: typeFromScore(nextScore), score: nextScore };
    saveMe(me);
    router.push("/profile");
  };

  return (
    <div className="min-h-screen bg-[#0B0F14] text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-2xl font-bold mb-2">🎧 音楽人格ミニ診断</h1>
      <p className="text-sm text-white/60 mb-8">30秒であなたのタイプが分かる</p>

      <div className="bg-[#151A22] p-6 rounded-2xl w-full max-w-md border border-white/10">
        <p className="mb-6 text-lg">{questions[step]}</p>

        <div className="flex gap-3">
          <button onClick={() => answer(true)} className="flex-1 bg-green-500 py-2 rounded-xl font-semibold">
            はい
          </button>
          <button onClick={() => answer(false)} className="flex-1 bg-white/10 py-2 rounded-xl">
            いいえ
          </button>
        </div>
      </div>

      <div className="mt-6 w-full max-w-md">
        <div className="bg-white/10 h-2 rounded-full">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: `${((step + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
