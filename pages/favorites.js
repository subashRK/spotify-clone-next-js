import Head from "next/head"
import SpotifyWebApi from "spotify-web-api-node"
import Container from "../components/Container"

export default function Favorites({ songs, changeSong }) {
  return (
    <div>
      <Head>
        <title>Search</title>
      </Head>

      <Container songs={songs} type="Favorites" changeSong={changeSong} />
    </div>
  )
}

export async function getServerSideProps({ req }) {
  const token = req.cookies["spotify-access-token"]
  if (!token) return { props: {} }

  const spotifyApi = new SpotifyWebApi({ accessToken: token })

  try {
    const { body: { items } } = await spotifyApi.getMyTopTracks()
    return { props: { songs: items } }
  } catch(e) {
    console.log(e.message)
    return { props: { songs: [] } }
  }
}
