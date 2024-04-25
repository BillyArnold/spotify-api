import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface SpotifyState {
  accessToken: string | null;
  updateToken: (by: string) => void;
}

export const useSpotifyStore = create<SpotifyState>()(
  persist(
    (set) => ({
      accessToken: null,
      updateToken: (by) => set((state) => ({ accessToken: by })),
    }),
    { name: "spotifyStore" },
  ),
);
