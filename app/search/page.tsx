"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import AppHeader from "../../components/AppHeader";
import BottomNav from "../../components/BottomNav";
import { getAppData, toggleFollow } from "../../lib/store";

export default function SearchPage() {
  const [keyword, setKeyword] = useState("");
  const [refresh, setRefresh] = useState(0);

  const data = getAppData();

  const results = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return data.friends;
    return data.friends.filter(
      (user) =>
        user.id.toLowerCase().includes(q) ||
        user.username.toLowerCase().includes(q)
    );
  }, [data.friends, keyword, refresh]);

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white pb-28">
      <AppHeader />

      <div className="mx-auto max-w-md px-4 pt-4">
        <div className="text-lg font-semibold">検索</div>
        <div className="text-sm text-white/60 mt-1">
          IDで友達を探す
        </div>

        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="ID検索"
          className="mt-4 w-full rounded-2xl border border-white/10 bg-[#151A22] px-4 py-3 outline-none"
        />

        <div className="mt-4 space-y-3">
          {results.map((user) => {
            const followed = data.followingIds.includes(user.id);

            return (
              <div
                key={user.id}
                className="rounded-2xl border border-white/10 bg-[#151A22] p-3 flex items-center gap-3"
              >
                <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-lg">
                  {user.avatar}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="font-semibold truncate">{user.username}</div>
                  <div className="text-sm text-white/60 truncate">@{user.id}</div>
                </div>

                <Link
                  href={`/u/${user.id}`}
                  className="rounded-xl bg-white/10 px-3 py-2 text-sm"
                >
                  確認
                </Link>

                <button
                  onClick={() => {
                    toggleFollow(user.id);
                    setRefresh((v) => v + 1);
                  }}
                  className={[
                    "rounded-xl px-3 py-2 text-sm",
                    followed ? "bg-green-500 text-black" : "bg-white/10",
                  ].join(" ")}
                >
                  {followed ? "追加済み" : "追加"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}