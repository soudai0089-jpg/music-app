import { Temperature, Track, UserProfile } from "./types";

const uniq = <T,>(arr: T[]) => Array.from(new Set(arr));

function normalizeText(text: string) {
  return text.toLowerCase().trim();
}

function pickKeywords(tracks: Track[]) {
  const words = tracks.flatMap((track) => {
    const title = normalizeText(track.title || "");
    const artist = normalizeText(track.artist || "");
    return [title, artist];
  });

  return uniq(words.filter(Boolean));
}

function scoreGenreOverlap(a: Track[], b: Track[]) {
  const aKeys = pickKeywords(a);
  const bKeys = pickKeywords(b);

  const overlap = aKeys.filter((x) => bKeys.includes(x)).length;
  const total = uniq([...aKeys, ...bKeys]).length || 1;

  return Math.round((overlap / total) * 100);
}

function moodLabel(score: number): Temperature {
  if (score >= 80) return "hot";
  if (score >= 55) return "warm";
  return "cool";
}

export function calculateCompatibility(me: UserProfile, other: UserProfile) {
  const myTracks = me.picks || [];
  const otherTracks = other.picks || [];

  const score = scoreGenreOverlap(myTracks, otherTracks);

  return {
    score,
    temperature: moodLabel(score),
    sharedKeywords: uniq([
      ...pickKeywords(myTracks),
      ...pickKeywords(otherTracks),
    ]).slice(0, 5),
  };
}
