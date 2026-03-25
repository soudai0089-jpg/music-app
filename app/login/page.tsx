"use client";

function generateRandomString(length: number) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const randomValues = crypto.getRandomValues(new Uint8Array(length));

  for (let i = 0; i < length; i++) {
    result += chars[randomValues[i] % chars.length];
  }

  return result;
}

async function sha256(plain: string) {
  const data = new TextEncoder().encode(plain);
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
    const redirectUri = window.location.origin + "/callback";

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
    });

    window.location.href =
      "https://accounts.spotify.com/authorize?" + params.toString();
  };

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-[#151A22] p-6">
        <h1 className="text-2xl font-bold">Spotifyログイン</h1>
        <p className="mt-2 text-sm text-white/60">
          Spotifyと連携して曲を検索します
        </p>

        <button
          onClick={handleLogin}
          className="mt-6 flex w-full items-center justify-center rounded-full bg-green-500 py-3 font-semibold text-black"
        >
          Spotifyでログイン
        </button>
      </div>
    </main>
  );
}
