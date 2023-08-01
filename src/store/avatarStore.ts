// avatarStore.ts
import { create } from "zustand";

import { Database } from "../app/database.types";

type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

type AvatarState = {
  navAvatarUrl: Profiles["avatar_url"] | null;
  setNavAvatarUrl: (url: Profiles["avatar_url"]) => void;
};

export const useAvatarStore = create<AvatarState>((set) => ({
  navAvatarUrl: null,
  setNavAvatarUrl: (url) => set({ navAvatarUrl: url }),
}));
