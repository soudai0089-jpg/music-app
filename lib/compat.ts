import { Track, UserProfile } from "./types";

// 配列の重複削除
const uniq = <T,>(arr: T[]): T[] => Array.from(new Set(arr));

// ユーザーの好きな曲をまとめる
export function collectUserTracks(user: UserProfile): Track[] {
  const tracks: Track[] = [];

  if (user.moodSong) {
    tracks.push(user.moodSong);
  }

  if (user.nowSong) {
    tracks.push(user.nowSong);
  }

  if (user.picks) {
    tracks.push(...user.picks);
  }

  if (user.recentTop10) {
    tracks.push(...user.recentTop10);
  }

  return uniq(tracks);
}

// 全ユーザーからおすすめ候補を作る
export function buildRecommended(users: UserProfile[]): Track[] {
  const allTracks = users.flatMap((u) => collectUserTracks(u));
  return uniq(allTracks).slice(0, 20);
}

// 相性（ダミー）
export function calcCompatibility(a: UserProfile, b: UserProfile): number {
  const aTracks = collectUserTracks(a).map((t) => t.id);
  const bTracks = collectUserTracks(b).map((t) => t.id);

  const common = aTracks.filter((id) => bTracks.includes(id));

  if (aTracks.length === 0) return 0;

  return Math.round((common.length / aTracks.length) * 100);
}
