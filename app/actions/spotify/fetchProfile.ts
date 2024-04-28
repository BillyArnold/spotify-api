import { cookies } from "next/headers";

export async function fetchProfile(): Promise<any> {
  const accessToken = cookies().get("spotifyAccessToken")?.value;

  if (accessToken) {
    const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const val = await result.json();

    if (val.error) {
      console.error("Access token invalid");
      return null;
    }

    return val; // TODO: Call Web API
  }

  console.error("No access token found");
  return null;
}
