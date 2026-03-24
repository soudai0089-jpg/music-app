export type Track = {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
};

export type User = {
  id: string;
  username: string;
  avatar: string;
  moodSong: Track;
};

export type AppData = {
  me: User;
  friends: User[];
  recommended: Track[];
  viewedStoryIds: string[];
  followingIds: string[];
};

const defaultData: AppData = {
  me: {
    id: "me",
    username: "You",
    avatar: "🎧",
    moodSong: {
      id: "1",
      title: "言って。",
      artist: "ヨルシカ",
      coverUrl: "https://placehold.co/300x300",
    },
  },

  friends: [
    {
      id: "haruto",
      username: "Haruto",
      avatar: "🧑‍🎧",
      moodSong: {
        id: "2",
        title: "晴る",
        artist: "ヨルシカ",
        coverUrl: "https://placehold.co/300x300",
      },
    },
    {
      id: "saki",
      username: "Saki",
      avatar: "👩‍🎧",
      moodSong: {
        id: "3",
        title: "Ref:rain",
        artist: "Aimer",
        coverUrl: "https://placehold.co/300x300",
      },
    },
  ],

  recommended: [
    {
      id: "4",
      title: "怪獣の花唄",
      artist: "Vaundy",
      coverUrl: "https://placehold.co/300x300",
    },
    {
      id: "5",
      title: "Pretender",
      artist: "Official髭男dism",
      coverUrl: "https://placehold.co/300x300",
    },
  ],

  viewedStoryIds: [],
  followingIds: ["haruto", "saki"],
};

const STORAGE_KEY = "musicapp:data";

export function getAppData(): AppData {
  if (typeof window === "undefined") {
    return defaultData;
  }

  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return defaultData;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return defaultData;
  }
}

export function initData() {
  if (typeof window === "undefined") return;

  const exists = localStorage.getItem(STORAGE_KEY);

  if (!exists) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
  }
}

export function saveAppData(data: AppData) {
  if (typeof window === "undefined") return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}