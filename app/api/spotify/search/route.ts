import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");

  const accessToken = req.headers.get("authorization")?.replace("Bearer ", "");

  if (!q || !accessToken) {
    return NextResponse.json({ error: "missing" }, { status: 400 });
  }

  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=track&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await res.json();

  const tracks = data.tracks.items.map((t: any) => ({
    id: t.id,
    title: t.name,
    artist: t.artists[0].name,
    coverUrl: t.album.images[0]?.url,
  }));

  return NextResponse.json(tracks);
}
