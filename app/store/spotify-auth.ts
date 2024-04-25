import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface SpotifyState {
  verifier: string | null;
  updateVerifier: (by: string) => void;
}

export const useSpotifyStore = create<SpotifyState>()(
  devtools(
    persist(
      (set) => ({
        verifier: null,
        updateVerifier: (by) => set((state) => ({ verifier: by })),
      }),
      { name: "spotifyStore" },
    ),
  ),
);
