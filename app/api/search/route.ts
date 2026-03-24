import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!q) {
    return NextResponse.json({ error: "No query" }, { status: 400 });
  }

  if (!token) {
    return NextResponse.json({ error: "No token" }, { status: 401 });
  }

  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=track&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { error: data?.error?.message || "Spotify search failed" },
      { status: res.status }
    );
  }

  const tracks = (data.tracks?.items || []).map((item: any) => ({
    id: item.id,
    title: item.name,
    artist: item.artists?.[0]?.name || "Unknown",
    coverUrl:
      item.album?.images?.[0]?.url ||
      "https://placehold.co/300x300/png?text=No+Image",
    previewUrl: item.preview_url || "/demo.mp3",
  }));

  return NextResponse.json(tracks);
}
