"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function CallbackPage() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("ログイン処理中...");

  useEffect(() => {
    const code = searchParams.get("code");
    const verifier = localStorage.getItem("spotify_code_verifier");

    console.log("callback code:", code);
    console.log("callback verifier:", verifier);

    if (!code) {
      setMessage("認証コードがありません");
      return;
    }

    if (!verifier) {
      setMessage("code_verifier がありません");
      return;
    }

    const run = async () => {
      const res = await fetch("/api/spotify/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, verifier }),
      });

      const data = await res.json();
      console.log("token response:", data);

      if (!res.ok) {
        setMessage("トークン取得失敗: " + (data.error || "unknown"));
        return;
      }

      localStorage.setItem("spotify_access_token", data.access_token);

      setMessage("ログイン成功！");
    };

    run();
  }, [searchParams]);

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <p>{message}</p>
    </main>
  );
}
