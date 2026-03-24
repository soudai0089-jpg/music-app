import { AppData, Track, UserProfile } from "./types";

const STORAGE_KEY = "music-app:data:v1";

const makeTrack = (
  id: string,
  title: string,
  artist: string,
  coverUrl: string,
  previewUrl = "/demo.mp3"
): Track => ({
  id,
  title,
  artist,
  coverUrl,
  previewUrl,
});

const defaultMe: UserProfile = {
  id: "me",
  username: "you",
  avatar: "🎧",
  moodSong: makeTrack(
    "m1",
    "Five",
    "嵐",
    "https://placehold.co/800x800/png?text=Five"
  ),
};

const defaultFriends: UserProfile[] = [
  {
    id: "haruto",
    username: "Haruto",
    avatar: "👤",
    moodSong: makeTrack(
      "f1",
      "爆裂愛してる",
      "M!LK",
      "https://placehold.co/800x800/png?text=MILK"
    ),
  },
  {
    id: "saki",
    username: "Saki",
    avatar: "👤",
    moodSong: makeTrack(
      "f2",
      "ROSE",
      "HANA",
      "https://placehold.co/800x800/png?text=ROSE"
    ),
  },
  {
    id: "ren",
    username: "Ren",
    avatar: "👤",
    moodSong: makeTrack(
      "f3",
      "lulu.",
      "Mrs. GREEN APPLE",
      "https://placehold.co/800x800/png?text=lulu"
    ),
  },
];

const defaultRecommended = [
  {
    ...makeTrack(
      "r1",
      "AIZO",
      "King Gnu",
      "https://placehold.co/800x800/png?text=AIZO"
    ),
    moodText: "sharp energy",
  },
  {
    ...makeTrack(
      "r2",
      "Five",
      "嵐",
      "https://placehold.co/800x800/png?text=Five"
    ),
    moodText: "nostalgic drive",
  },
  {
    ...makeTrack(
      "r3",
      "ROSE",
      "HANA",
      "https://placehold.co/800x800/png?text=ROSE"
    ),
    moodText: "cool mood",
  },
];

const initialData: AppData = {
  me: defaultMe,
  friends: defaultFriends,
  recommended: defaultRecommended,
  viewedStoryIds: [],
  followingIds: ["haruto", "saki", "ren"],
};

export function getAppData(): AppData {
  if (typeof window === "undefined") return initialData;

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }

  try {
    return JSON.parse(raw) as AppData;
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
}

export function saveAppData(data: AppData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function markStoryViewed(id: string) {
  const data = getAppData();
  if (!data.viewedStoryIds.includes(id)) {
    data.viewedStoryIds.push(id);
    saveAppData(data);
  }
}

export function setMyMoodSong(track: Track) {
  const data = getAppData();
  data.me.moodSong = track;
  saveAppData(data);
}

export function toggleFollow(userId: string) {
  const data = getAppData();
  const exists = data.followingIds.includes(userId);

  if (exists) {
    data.followingIds = data.followingIds.filter((id) => id !== userId);
  } else {
    data.followingIds.push(userId);
  }

  saveAppData(data);
}

export async function syncSpotifyToHome() {
  const token = localStorage.getItem("spotify_access_token");
  if (!token) {
    throw new Error("Spotifyにログインしていません");
  }

  const [topTracksRes, meRes] = await Promise.all([
    fetch("https://api.spotify.com/v1/me/top/tracks?limit=10", {
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
    fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
  ]);

  const topTracksData = await topTracksRes.json();
  const meData = await meRes.json();

  if (!topTracksRes.ok) {
    throw new Error(topTracksData?.error?.message || "Top曲の取得に失敗しました");
  }

  if (!meRes.ok) {
    throw new Error(meData?.error?.message || "プロフィール取得に失敗しました");
  }

  const items = topTracksData.items || [];
  if (items.length === 0) {
    throw new Error("Top曲が取得できませんでした");
  }

  const recommended = items.map((t: any, i: number) => ({
    id: t.id,
    title: t.name,
    artist: t.artists?.[0]?.name || "Unknown",
    coverUrl: t.album?.images?.[0]?.url || "https://placehold.co/800x800/png?text=Music",
    previewUrl: t.preview_url || "/demo.mp3",
    moodText:
      i === 0
        ? "top favorite"
        : i === 1
        ? "repeat mood"
        : i === 2
        ? "late-night vibe"
        : "recommended",
  }));

  const next = getAppData();

  next.me = {
    ...next.me,
    username: meData.display_name || next.me.username,
    moodSong: {
      id: recommended[0].id,
      title: recommended[0].title,
      artist: recommended[0].artist,
      coverUrl: recommended[0].coverUrl,
      previewUrl: recommended[0].previewUrl,
    },
  };

  next.recommended = recommended;

  saveAppData(next);
  return next;
}
