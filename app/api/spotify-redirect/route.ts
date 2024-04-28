import { redirectToAuthCodeFlow } from "@/app/actions/spotify/redirectToAuthCodeFlow";
import { getAccessToken } from "@/app/actions/spotify/getAccessToken";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { generateCodeVerifier } from "@/app/actions/spotify/generateCodeVerifier";
import { generateCodeChallenge } from "@/app/actions/spotify/generateCodeChallenge";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || "";
  const params = request.nextUrl.searchParams;
  const code = params.get("code");

  if (!code) {
    const verifier = generateCodeVerifier(128);
    cookies().set("verifier", verifier);
    const challenge = await generateCodeChallenge(verifier);

    const redirectUri =
      process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI ||
      "http://localhost:3000/api/spotify-redirect";

    const spotParams = new URLSearchParams();
    spotParams.append("client_id", clientId);
    spotParams.append("response_type", "code");
    spotParams.append("redirect_uri", redirectUri);
    spotParams.append(
      "scope",
      "user-read-private user-read-email user-top-read",
    );
    spotParams.append("code_challenge_method", "S256");
    spotParams.append("code_challenge", challenge);

    redirect(`https://accounts.spotify.com/authorize?${spotParams.toString()}`);
  } else {
    const accessToken = await getAccessToken(clientId, code);
    cookies().set("spotifyAccessToken", accessToken);
    redirect("/");
  }
}
