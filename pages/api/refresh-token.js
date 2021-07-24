import SpotifyWebApi from "spotify-web-api-node"
import { setCookie } from "../../utils"

const handler = async (req, res) => {
  if (!req.method === "POST" || !req.body.refreshToken) return res.status(400).end()

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_SECRET_KEY,
    refreshToken: req.body.refreshToken
  })

  try {
    const data = await spotifyApi.refreshAccessToken()
    const { access_token:accessToken, expires_in:expiresin } = data.body
    const expiresIn = Date.now() + (expiresin * 1000)

    setCookie(res, [
      { name: "spotify-refresh-token", value: req.body.refreshToken, opt: { maxAge: 60 * 60 * 24 * 7 } },
      { name: "spotify-access-token", value: accessToken, opt: { maxAge: expiresin } },
      { name: "spotify-token-expiresin", value: JSON.stringify(expiresIn), opt: { maxAge: expiresin } }
    ])

    res.status(200).json({
      accessToken,
      expiresIn,
    })
  } catch(e) {
    console.log(e.message)
    res.status(400).end()
  }
}

export default handler
