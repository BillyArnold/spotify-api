import { cookies } from "next/headers";

export async function fetchProfile(): Promise<any> {
  const accessToken = cookies().get("spotifyAccessToken")?.value;

  if (accessToken) {
    const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return await result.json(); // TODO: Call Web API
  }

  throw new Error("No access token found");
}
