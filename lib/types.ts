export type Track = {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  previewUrl: string;
};

export type UserProfile = {
  id: string;
  username: string;
  avatar: string;
  moodSong: Track;
};

export type AppData = {
  me: UserProfile;
  friends: UserProfile[];
  recommended: (Track & { moodText: string })[];
  viewedStoryIds: string[];
  followingIds: string[];
};
