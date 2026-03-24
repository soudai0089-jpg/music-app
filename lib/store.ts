import { AppData, Track, UserProfile } from "./types";
import { ensureSeedUser } from "./seed";

const STORAGE_KEY = "music-app-data";

function cover(title: string) {
  return `https://placehold.co/300x300/png?text=${encodeURIComponent(title)}`;
}

function makeTrack(id: string, title: string, artist: string): Track {
  return {
    id,
    title,
    artist,
    coverUrl: cover(title),
  };
}

function makeDefaultData(): AppData {
  const me: UserProfile = {
    ...ensureSeedUser("me"),
    avatar: "🎧",
  };

  const defaultFriends: UserProfile[] = [
    { ...ensureSeedUser("haruto"), avatar: "🧑" },
    { ...ensureSeedUser("saki"), avatar: "👩" },
    { ...ensureSeedUser("ren"), avatar: "🧢" },
  ];

  const defaultRecommended: Track[] = [
    makeTrack("r1", "言って。", "ヨルシカ"),
    makeTrack("r2", "晴る", "ヨルシカ"),
    makeTrack("r3", "Ref:rain", "Aimer"),
    makeTrack("r4", "怪獣の花唄", "Vaundy"),
    makeTrack("r5", "Pretender", "Official髭男dism"),
  ];

  return {
    me,
    friends: defaultFriends,
    recommended: defaultRecommended,
    viewedStoryIds: [],
    followingIds: ["haruto", "saki", "ren"],
  };
}

export function getAppData(): AppData {
  if (typeof window === "undefined") {
    return makeDefaultData();
  }

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const initial = makeDefaultData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<AppData>;
    const fallback = makeDefaultData();

    return {
      me: parsed.me ?? fallback.me,
      friends: parsed.friends ?? fallback.friends,
      recommended: parsed.recommended ?? fallback.recommended,
      viewedStoryIds: parsed.viewedStoryIds ?? [],
      followingIds: parsed.followingIds ?? ["haruto", "saki", "ren"],
    };
  } catch {
    const initial = makeDefaultData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
}

export function saveAppData(data: AppData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function updateAppData(next: Partial<AppData>) {
  const current = getAppData();
  const merged: AppData = {
    ...current,
    ...next,
    me: next.me ?? current.me,
    friends: next.friends ?? current.friends,
    recommended: next.recommended ?? current.recommended,
    viewedStoryIds: next.viewedStoryIds ?? current.viewedStoryIds,
    followingIds: next.followingIds ?? current.followingIds,
  };
  saveAppData(merged);
  return merged;
}

export function markStoryViewed(userId: string) {
  const data = getAppData();
  const viewed = Array.from(new Set([...(data.viewedStoryIds ?? []), userId]));
  return updateAppData({ viewedStoryIds: viewed });
}

export function toggleFollow(userId: string) {
  const data = getAppData();
  const current = data.followingIds ?? [];
  const followingIds = current.includes(userId)
    ? current.filter((id) => id !== userId)
    : [...current, userId];

  return updateAppData({ followingIds });
}

export function syncSpotifyToHome() {
  const data = getAppData();

  const synced: Track[] = [
    makeTrack("sp1", "夜に駆ける", "YOASOBI"),
    makeTrack("sp2", "Subtitle", "Official髭男dism"),
    makeTrack("sp3", "白日", "King Gnu"),
    makeTrack("sp4", "水平線", "back number"),
    makeTrack("sp5", "僕のこと", "Mrs. GREEN APPLE"),
  ];

  return updateAppData({ recommended: synced });
}
