import Link from "next/link";
import { fetchProfile } from "./actions/spotify/fetchProfile";
import Profile from "@/components/profile";
import { fetchUserTopArtists } from "./actions/spotify/fetchUserTopArtists";
import UserTopArtists from "@/components/userTopArtists";
import Search from "@/components/search";
import { Suspense } from "react";
import SearchResults from "@/components/searchResults";

type HomeProps = {
  searchParams: {
    query?: string;
  };
};

export interface UserProfile {
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

export interface Image {
  url: string;
  height: number;
  width: number;
}

export default async function Home({ searchParams }: HomeProps) {
  const profile: UserProfile = await fetchProfile();
  const topArtists = await fetchUserTopArtists();

  const query = searchParams?.query || "";

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {!profile ? (
        <Link
          className="border-white border-2 rounded-3xl py-4 px-6"
          href="/api/spotify-redirect"
        >
          Connect to spotify
        </Link>
      ) : (
        <>
          <Profile profile={profile} />
          <Search placeholder="Search for track" />
          <Suspense key={query} fallback={<div>Loading...</div>}>
            <SearchResults query={query} />
          </Suspense>
          <UserTopArtists topArtists={topArtists} />
        </>
      )}
    </main>
  );
}
