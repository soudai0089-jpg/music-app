import { Track, UserProfile } from "./types";

const cover = (q: string) =>
  `https://placehold.co/300x300/png?text=${encodeURIComponent(q)}`;

const t = (id: string, title: string, artist: string): Track => ({
  id,
  title,
  artist,
  coverUrl: cover(title),
});

export function ensureSeedUser(id: string): UserProfile {
  const username =
    id === "me"
      ? "あなた"
      : id === "haruto"
      ? "Haruto"
      : id === "saki"
      ? "Saki"
      : "Ren";

  const moodSong = t(`${id}-now`, "晴る", "ヨルシカ");

  const picksTop10 = [
    t(`${id}-p1`, "言って。", "ヨルシカ"),
    t(`${id}-p2`, "怪獣の花唄", "Vaundy"),
    t(`${id}-p3`, "Ref:rain", "Aimer"),
    t(`${id}-p4`, "Pretender", "Official髭男dism"),
    t(`${id}-p5`, "裸の心", "あいみょん"),
  ];

  return {
    id,
    username,

    // 🔥 必須にしたので必ず入れる
    moodSong,

    picks: picksTop10,

    diagnosis:
      id === "me"
        ? undefined
        : {
            type: "Night Listener",
            score: 3,
          },
  };
}
