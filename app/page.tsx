import { redirectToAuthCodeFlow } from "./actions/spotify/redirectToAuthCodeFlow";
import { getAccessToken } from "./actions/spotify/getAccessToken";
import { fetchProfile } from "./actions/spotify/fetchProfile";
import { use, useEffect, useState } from "react";
import { useSpotifyStore } from "./store/spotify-auth";
import { cookies } from "next/headers";

type HomeProps = {
  searchParams: {
    code: string;
  };
};

interface UserProfile {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: { spotify: string };
  followers: { href: string; total: number };
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
}

interface Image {
  url: string;
  height: number;
  width: number;
}

export default function Home({ searchParams }: HomeProps) {
  //  const [profile, setProfile] = useState<UserProfile | null>(null);
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || "";
  const cookieStore = cookies();

  const code = searchParams.code;

  const setAccessToken = async () => {
    if (!cookieStore.get("spotifyAccessToken")) {
      const accessToken = await getAccessToken(clientId, code);
      if (accessToken) {
        //spotifyAuth.updateToken(accessToken);
        cookieStore.set("spotifyAccessToken", accessToken);
      }
    }

    if (!code) {
      redirectToAuthCodeFlow(clientId);
    } else {
      //const profileRes = await fetchProfile(accessToken);
      //setProfile((profilePrev) =>
      //  profilePrev?.display_name ? profilePrev : profileRes,
      //);
    }
  };

  if (!cookieStore.get("spotifyAccessToken")) {
    setAccessToken();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {cookieStore.get("spotifyAccessToken")}
    </main>
  );
}
