export type Track = {
  id: string;
  title: string;
  artist: string;
  coverUrl?: string;
  previewUrl?: string;
};

export type UserProfile = {
  id: string;
  username: string;
  avatar?: string;
  moodSong: Track;
  nowSong?: Track;
  picks?: Track[];
  diagnosis?: {
    type: string;
    score: number;
  };
  nowSongUpdatedAt?: string;
  hallOfFame?: string;
  recentTop10?: Track[];
};

export type AppData = {
  me: UserProfile;
  friends: UserProfile[];
  recommended?: Track[];
  viewedStoryIds?: string[];
  followingIds?: string[];
};

