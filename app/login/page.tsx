"use client";

function generateRandomString(length: number) {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let text = "";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function sha256(plain: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
}

function base64urlencode(input: ArrayBuffer) {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export default function LoginPage() {
  const handleLogin = async () => {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const redirectUri = "http://127.0.0.1:3000/callback";

    if (!clientId) {
      alert("NEXT_PUBLIC_SPOTIFY_CLIENT_ID がありません");
      return;
    }

    const verifier = generateRandomString(64);
    const hashed = await sha256(verifier);
    const challenge = base64urlencode(hashed);

    localStorage.setItem("spotify_code_verifier", verifier);

    const scope = ["user-top-read", "user-library-read"].join(" ");

    const params = new URLSearchParams({
      client_id: clientId,
      response_type: "code",
      redirect_uri: redirectUri,
      code_challenge_method: "S256",
      code_challenge: challenge,
      scope,
      show_dialog: "true",
    });

    window.location.href =
      "https://accounts.spotify.com/authorize?" + params.toString();
  };

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white flex items-center justify-center px-6">
      <div className="rounded-3xl border border-white/10 bg-[#151A22] p-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold">Spotifyログイン</h1>
        <p className="text-sm text-white/60 mt-2">
          曲検索やジャケット取得のために接続します
        </p>

        <button
          onClick={handleLogin}
          className="mt-6 w-full rounded-full bg-green-500 py-3 text-black font-semibold"
        >
          Spotifyでログイン
        </button>
      </div>
    </main>
  );
}
