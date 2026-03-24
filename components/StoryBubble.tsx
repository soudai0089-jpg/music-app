"use client";

type Props = {
  id: string;
  artist: string;
  unread: boolean;
  avatar?: string;
  onClick?: () => void;
};

export default function StoryBubble({
  id,
  artist,
  unread,
  avatar,
  onClick,
}: Props) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1 w-[72px] shrink-0">
      
      {/* 上：アーティスト名 */}
      <div className="text-[10px] text-white/70 truncate w-full text-center">
        {artist}
      </div>

      {/* アイコン */}
      <div
        className={`p-[2px] rounded-full ${
          unread
            ? "bg-gradient-to-tr from-pink-500 via-yellow-400 to-purple-500"
            : "bg-white/10"
        }`}
      >
        <div className="h-14 w-14 rounded-full bg-[#151A22] overflow-hidden flex items-center justify-center">
          {avatar ? (
            <img
              src={avatar}
              className="h-full w-full object-cover"
            />
          ) : (
            "🎧"
          )}
        </div>
      </div>

      {/* 👇 ここを追加（ユーザー名） */}
      <div className="text-[11px] text-white truncate w-full text-center">
        {id}
      </div>
    </button>
  );
}
