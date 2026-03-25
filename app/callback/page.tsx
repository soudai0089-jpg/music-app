"use client";

import { useEffect } from "react";

export default function CallbackPage() {
  useEffect(() => {
    const run = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (!code) {
          alert("codeがありません");
          return;
        }

        const verifier = localStorage.getItem("spotify_code_verifier");

        if (!verifier) {
          alert("verifierがありません");
          return;
        }

        const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;

        if (!clientId) {
          alert("clientIdがありません");
          return;
        }

        const redirectUri = window.location.origin + "/callback";

        const body = new URLSearchParams({
          client_id: clientId,
          grant_type: "authorization_code",
          code,
          redirect_uri: redirectUri,
          code_verifier: verifier,
        });

        const res = await fetch("/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body,
        });

        const data = await res.json();

        if (data.access_token) {
          localStorage.setItem("spotify_access_token", data.access_token);
          localStorage.removeItem("spotify_code_verifier");
          window.location.href = "/post";
        } else {
          alert(JSON.stringify(data));
        }
      } catch (e: any) {
        alert("エラー: " + e.message);
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
