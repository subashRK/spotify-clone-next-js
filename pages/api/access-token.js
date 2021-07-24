import SpotifyWebApi from "spotify-web-api-node"
import { setCookie } from "../../utils"

const handler = async (req, res) => {
  if (!req.method === "POST" || !req.body.code) return res.status(400).end()

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_SECRET_KEY,
    redirectUri: "https://spotify-clone-srk.vercel.app"
  })

  try {
    const data = await spotifyApi.authorizationCodeGrant(req.body.code)
    const { access_token:accessToken, refresh_token:refreshToken, expires_in:expiresIn } = data.body
    
    setCookie(res, [
      { name: "spotify-access-token", value: accessToken, opt: { maxAge: expiresIn } },
      { name: "spotify-token-expiresin", value: JSON.stringify(Date.now() + (expiresIn * 1000)), opt: { maxAge: expiresIn } },
      { name: "spotify-refresh-token", value: refreshToken, opt: { maxAge: 60 * 60 * 24 * 7 } },
    ])

    return res.status(200).json({
      accessToken,
      refreshToken,
      expiresIn
    })
  } catch(e) {
    console.log(e.message)
    res.status(400).end()
  }
}

export default handler
