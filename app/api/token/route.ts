import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.text();

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const data = await res.json();

  return Response.json(data, { status: res.status });
}
