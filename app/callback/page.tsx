"use client";

import { useEffect } from "react";

export default function CallbackPage() {
  useEffect(() => {
    const run = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (!code) {
          alert("❌ codeがありません");
          return;
        }

        const verifier = localStorage.getItem("spotify_code_verifier");

        if (!verifier) {
          alert("❌ verifierがありません");
          return;
        }

        const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;

        if (!clientId) {
          alert("❌ clientIdがundefined");
          return;
        }

        alert("OK: token取りに行く"); // ←ここ追加

        const body = new URLSearchParams({
          client_id: clientId,
          grant_type: "authorization_code",
          code: code,
          redirect_uri: "https://music-app-nine-mauve.vercel.app/callback",
          code_verifier: verifier,
        });

        const res = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: body,
        });

        alert("レスポンス来た"); // ←ここ追加

        const data = await res.json();

        alert(JSON.stringify(data)); // ←最重要

        if (data.access_token) {
          localStorage.setItem("spotify_access_token", data.access_token);
          window.location.href = "/post";
        } else {
          alert("❌ トークン取得失敗");
        }
      } catch (e: any) {
        alert("❌ エラー: " + e.message);
      }
    };

    run();
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center text-white bg-[#0B0F14]">
      処理中...
    </main>
  );
}
