import { Track, UserProfile } from "./types";

const cover = (q: string) =>
  // 画像URLはとりあえず「あなたが後で差し替えやすいように」置き場を用意しているだけ
  // ここをSpotifyの画像URLに置き換えると即“本物ジャケ”になる
  `https://placehold.co/300x300/png?text=${encodeURIComponent(q)}`;

const t = (id: string, title: string, artist: string): Track => ({
  id,
  title,
  artist,
  coverUrl: cover(title),
});

export function ensureSeedUser(id: string): UserProfile {
  const username =
    id === "me" ? "あなた" : id === "haruto" ? "Haruto" : id === "saki" ? "Saki" : "Ren";

  const nowSong = t(`${id}-now`, "晴る", "ヨルシカ");
  const hall = t(`${id}-hof`, "Ref:rain", "Aimer");

  const recentTop10 = [
    { ...t(`${id}-r1`, "晴る", "ヨルシカ"), prevRank: 3 },
    { ...t(`${id}-r2`, "言って。", "ヨルシカ"), prevRank: 1 },
    { ...t(`${id}-r3`, "Ref:rain", "Aimer"), prevRank: 2 },
    { ...t(`${id}-r4`, "怪獣の花唄", "Vaundy"), prevRank: 6 },
    { ...t(`${id}-r5`, "Pretender", "Official髭男dism"), prevRank: 5 },
    { ...t(`${id}-r6`, "裸の心", "あいみょん") }, // NEW
    { ...t(`${id}-r7`, "花束", "back number"), prevRank: 8 },
    { ...t(`${id}-r8`, "群青", "YOASOBI"), prevRank: 7 },
    { ...t(`${id}-r9`, "ドライフラワー", "優里"), prevRank: 4 },
    { ...t(`${id}-r10`, "水平線", "back number"), prevRank: 10 },
  ];

  const picksTop10 = [
    t(`${id}-p1`, "常夜燈", "PEOPLE 1"),
    t(`${id}-p2`, "恋音と雨空", "AAA"),
    t(`${id}-p3`, "BGMになるなよ", "ハンブレッダーズ"),
    t(`${id}-p4`, "ラブレター", "YOASOBI"),
    t(`${id}-p5`, "虫", "Tele"),
    t(`${id}-p6`, "側に…", "清水翔太"),
    t(`${id}-p7`, "暖味Blue", "川崎鷹也"),
    t(`${id}-p8`, "夜に駆ける", "YOASOBI"),
    t(`${id}-p9`, "シルエット", "KANA-BOON"),
    t(`${id}-p10`, "マリーゴールド", "あいみょん"),
  ];

  return {
    id,
    username,
    nowSong,
    nowSongUpdatedAt: new Date().toISOString(),
    hallOfFame: hall,
    recentTop10,
    picksTop10,
    temperature: { calm: 70, upbeat: 20, emotional: 10 },
    temperatureUpdatedAt: new Date().toISOString(),
    diagnosis: id === "me" ? undefined : { type: "Night Listener", score: 3 },
  };
}
