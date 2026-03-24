import { UserProfile } from "./types";
import { ensureSeedUser } from "./seed";

const KEY_ME = "musicapp:me:v1";
const KEY_FRIENDS = "musicapp:friends:v1";
const KEY_LAST_COMPAT = "musicapp:last_compat:v1";

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function loadMe(): UserProfile {
  if (typeof window === "undefined") throw new Error("loadMe must run on client");
  const existing = safeParse<UserProfile>(localStorage.getItem(KEY_ME));
  if (existing) return existing;

  const seeded = ensureSeedUser("me");
  localStorage.setItem(KEY_ME, JSON.stringify(seeded));
  return seeded;
}

export function saveMe(me: UserProfile) {
  localStorage.setItem(KEY_ME, JSON.stringify(me));
}

export function loadFriends(): UserProfile[] {
  if (typeof window === "undefined") throw new Error("loadFriends must run on client");
  const existing = safeParse<UserProfile[]>(localStorage.getItem(KEY_FRIENDS));
  if (existing?.length) return existing;

  const seeded = [ensureSeedUser("haruto"), ensureSeedUser("saki"), ensureSeedUser("ren")];
  localStorage.setItem(KEY_FRIENDS, JSON.stringify(seeded));
  return seeded;
}

export function saveFriends(friends: UserProfile[]) {
  localStorage.setItem(KEY_FRIENDS, JSON.stringify(friends));
}

export function saveLastCompat(payload: unknown) {
  localStorage.setItem(KEY_LAST_COMPAT, JSON.stringify(payload));
}

export function loadLastCompat<T>(): T | null {
  return safeParse<T>(localStorage.getItem(KEY_LAST_COMPAT));
}
