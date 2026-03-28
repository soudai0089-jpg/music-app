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
  moodSong: Track | null;
};

export type AppData = {
  me: User;
  friends: User[];
  recommended: Track[];
  viewedStoryIds: string[];
  followingIds: string[];
  selectedBest5: (Track | null)[];
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
    {
      id: "6",
      title: "晴る",
      artist: "ヨルシカ",
      coverUrl: "https://placehold.co/300x300",
    },
    {
      id: "7",
      title: "Ref:rain",
      artist: "Aimer",
      coverUrl: "https://placehold.co/300x300",
    },
    {
      id: "8",
      title: "言って。",
      artist: "ヨルシカ",
      coverUrl: "https://placehold.co/300x300",
    },
  ],

  viewedStoryIds: [],
  followingIds: [],
  selectedBest5: [
    {
      id: "11",
      title: "言って。",
      artist: "Youchik",
      coverUrl: "https://placehold.co/300x300",
    },
    {
      id: "12",
      title: "晴る",
      artist: "Haruto",
      coverUrl: "https://placehold.co/300x300",
    },
    {
      id: "13",
      title: "Ref:rain",
      artist: "Saki",
      coverUrl: "https://placehold.co/300x300",
    },
    {
      id: "14",
      title: "Pretender",
      artist: "Haruto",
      coverUrl: "https://placehold.co/300x300",
    },
    {
      id: "15",
      title: "怪獣の花唄",
      artist: "Saki",
      coverUrl: "https://placehold.co/300x300",
    },
  ],
};

const STORAGE_KEY = "musicapp:data";

export function getAppData(): AppData {
  if (typeof window === "undefined") {
    return defaultData;
  }

  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    return defaultData;
  }

  try {
    const parsed = JSON.parse(raw) as AppData;

    if (!parsed.selectedBest5 || parsed.selectedBest5.length !== 5) {
      parsed.selectedBest5 = defaultData.selectedBest5;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    }

    return parsed;
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
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
