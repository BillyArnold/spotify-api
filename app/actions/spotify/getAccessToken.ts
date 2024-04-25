export async function getAccessToken(clientId: string, code: string) {
  const verifier = localStorage.getItem("verifier");

  const redirectUri =
    process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI ||
    "http://localhost:3000/api/spotify-redirect";

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", redirectUri);
  params.append("code_verifier", verifier!);

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  const { access_token } = await result.json();
  return access_token;
}
