import { CompatibilityResult, Temperature, Track, UserProfile } from "./types";

const uniq = <T,>(arr: T[]) => Array.from(new Set(arr));

function tempDistance(a: Temperature, b: Temperature) {
  // 0..1（小さいほど近い）に正規化
  const ax = [a.calm, a.upbeat, a.emotional];
  const bx = [b.calm, b.upbeat, b.emotional];
  const diff = Math.sqrt(ax.reduce((s, v, i) => s + (v - bx[i]) ** 2, 0));
  const max = Math.sqrt((100 ** 2) * 3);
  return diff / max;
}

function overlapCount<T>(a: T[], b: T[]) {
  const bs = new Set(b);
  return a.filter((x) => bs.has(x)).length;
}

export function computeCompatibility(me: UserProfile, other: UserProfile): CompatibilityResult {
  const meArtists = uniq(me.recentTop10.map((x) => x.artist).concat(me.picksTop10.map((x) => x.artist)));
  const otArtists = uniq(other.recentTop10.map((x) => x.artist).concat(other.picksTop10.map((x) => x.artist)));

  const meTracks = uniq(me.recentTop10.map((x) => x.title).concat(me.picksTop10.map((x) => x.title)));
  const otTracks = uniq(other.recentTop10.map((x) => x.title).concat(other.picksTop10.map((x) => x.title)));

  const commonArtists = overlapCount(meArtists, otArtists);
  const commonTracks = overlapCount(meTracks, otTracks);

  const td = tempDistance(me.temperature, other.temperature);

  // スコア合成（MVP用：納得感重視）
  const artistScore = Math.min(1, commonArtists / 8); // 8人で満点
  const trackScore = Math.min(1, commonTracks / 10);  // 10曲で満点
  const tempScore = 1 - td;

  const percent = Math.round((artistScore * 0.45 + trackScore * 0.35 + tempScore * 0.20) * 100);

  return { percent, commonArtists, commonTracks, tempDistance: td };
}
