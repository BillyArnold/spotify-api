import { cookies } from "next/headers";

export async function fetchUserTopArtists(): Promise<any> {
  const accessToken = cookies().get("spotifyAccessToken")?.value;

  if (accessToken) {
    const result = await fetch("https://api.spotify.com/v1/me/top/artists", {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const val = await result.json();

    if (val.error) {
      return null;
      //throw new Error("Access token invalid");
    }

    return val; // TODO: Call Web API
  }

  return null;
  //throw new Error("No access token found");
}
