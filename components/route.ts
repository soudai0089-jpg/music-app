import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json({ error: "No query" }, { status: 400 });
  }

  const token = process.env.SPOTIFY_ACCESS_TOKEN;

  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=track&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();

  const tracks = data.tracks.items.map((item: any) => ({
    id: item.id,
    title: item.name,
    artist: item.artists[0].name,
    coverUrl: item.album.images[0]?.url,
    previewUrl: item.preview_url,
  }));

  return NextResponse.json(tracks);
}
