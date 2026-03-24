"use client";

import { useEffect, useState } from "react";

type Track = {
  id: string;
  title: string;
  artist: string;
};

function ReelCard({ track }: { track: Track }) {
  return (
    <div className="h-full flex flex-col justify-center items-center bg-black text-white">
      <div className="text-xl font-bold">{track.title}</div>
      <div className="text-sm opacity-70">{track.artist}</div>
    </div>
  );
}

export default function Page() {
  const [data, setData] = useState<{ recommended: Track[] }>({
    recommended: [],
  });

  useEffect(() => {
    // 仮データ（あとでAPIに変える）
    setData({
      recommended: [
        { id: "1", title: "言って。", artist: "ヨルシカ" },
        { id: "2", title: "晴る", artist: "ヨルシカ" },
        { id: "3", title: "Ref:rain", artist: "Aimer" },
      ],
    });
  }, []);

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black">
      <div className="space-y-0">
        {data.recommended.map((track: any) => (
          <div
            key={track.id}
            className="h-[calc(100vh-170px)] snap-start"
          >
            <ReelCard track={track} />
          </div>
        ))}
      </div>
    </div>
  );
}
