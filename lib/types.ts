export type Track = {
  id: string;
  title: string;
  artist: string;
  coverUrl?: string;
};

export type Temperature = "hot" | "warm" | "cool";

export type UserProfile = {
  id: string;
  username: string;

  picks?: Track[]; // ←これ追加（超重要）
};