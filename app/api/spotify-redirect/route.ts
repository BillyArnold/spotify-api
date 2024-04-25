import { redirectToAuthCodeFlow } from "@/app/actions/spotify/redirectToAuthCodeFlow";
import { getAccessToken } from "@/app/actions/spotify/getAccessToken";
import { fetchProfile } from "@/app/actions/spotify/fetchProfile";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || "";
  const params = request.nextUrl.searchParams;
  const code = params.get("code");
  let profile = null;

  if (!code) {
    redirectToAuthCodeFlow(clientId);
  } else {
    const accessToken = await getAccessToken(clientId, code);
    profile = await fetchProfile(accessToken);
  }

  return new Response({ body: { profile: profile } });
}
