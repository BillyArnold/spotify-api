"use client";

import { redirectToAuthCodeFlow } from "./actions/spotify/redirectToAuthCodeFlow";
import { getAccessToken } from "./actions/spotify/getAccessToken";
import { fetchProfile } from "./actions/spotify/fetchProfile";
import { useEffect, useState } from "react";

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
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || "";

  const code = searchParams.code;

  const checkAccess = async () => {
    if (!code) {
      console.log("no code");
      redirectToAuthCodeFlow(clientId);
    } else {
      const accessToken = await getAccessToken(clientId, code);
      const profileRes = await fetchProfile(accessToken);
      console.log(profileRes, "res");
      setProfile((profilePrev) =>
        profilePrev?.display_name ? profilePrev : profileRes,
      );
    }
  };

  useEffect(() => {
    if (!profile) {
      checkAccess();
    }
  }, []);

  if (!profile) {
    return <div>LOADING...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {JSON.stringify(profile)}
    </main>
  );
}
