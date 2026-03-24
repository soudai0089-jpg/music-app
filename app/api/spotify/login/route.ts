import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return NextResponse.json(
      { error: "Spotifyの環境変数が足りません" },
      { status: 500 }
    );
  }

  const scope = ["user-top-read", "user-library-read"].join(" ");

  const authUrl =
    "https://accounts.spotify.com/authorize?" +
    new URLSearchParams({
      response_type: "code",
      client_id: clientId,
      scope,
      redirect_uri: redirectUri,
    }).toString();

  return NextResponse.redirect(authUrl);
}