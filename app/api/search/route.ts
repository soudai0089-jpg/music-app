import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!q) {
    return NextResponse.json({ error: "検索ワードがありません" }, { status: 400 });
  }

  if (!token) {
    return NextResponse.json({ error: "Spotifyトークンがありません" }, { status: 401 });
  }

  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=track&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { error: data?.error?.message || "Spotify検索に失敗しました" },
      { status: res.status }
    );
  }

  const tracks = (data.tracks?.items || []).map((item: any) => ({
    id: item.id,
    title: item.name,
    artist: item.artists?.map((a: any) => a.name).join(", ") || "Unknown",
    coverUrl:
      item.album?.images?.[0]?.url ||
      "https://placehold.co/300x300/png?text=No+Image",
  }));

  return NextResponse.json(tracks);
}
