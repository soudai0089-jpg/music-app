"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function Item({
  href,
  icon,
  big,
}: {
  href: string;
  icon: string;
  big?: boolean;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link href={href}>
      <div
        className={[
          "rounded-full flex items-center justify-center border transition active:scale-[0.98]",
          big ? "h-16 w-16 text-xl" : "h-12 w-12 text-lg",
          active
            ? "border-white/30 bg-white/15 text-white"
            : "border-white/10 bg-white/5 text-white/80",
        ].join(" ")}
      >
        {icon}
      </div>
    </Link>
  );
}

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#0B0F14]/95 py-4 backdrop-blur">
      <div className="mx-auto flex max-w-md items-center justify-around px-3">
        <Item href="/" icon="🏠" />
        <Item href="/search" icon="🔍" />
        <Item href="/post" icon="🎵" big />
        <Item href="/" icon="▶" />
        <Item href="/profile" icon="👤" />
      </div>
    </nav>
  );
}