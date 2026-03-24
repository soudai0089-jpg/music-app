"use client";

import { useEffect, useState } from "react";

export default function TestPage() {
  const [tracks, setTracks] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("spotify_access_token");

    if (!token) return;

    fetch("https://api.spotify.com/v1/me/top/tracks", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTracks(data.items || []);
      });
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-4">
      <h1 className="text-xl mb-4">あなたのTop曲</h1>

      {tracks.map((t) => (
        <div key={t.id} className="mb-4 flex gap-3">
          <img
            src={t.album.images[0].url}
            className="w-16 h-16 rounded"
          />
          <div>
            <div>{t.name}</div>
            <div className="text-sm text-gray-400">
              {t.artists[0].name}
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}
