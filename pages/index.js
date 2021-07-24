import Head from 'next/head'
import SpotifyWebApi from 'spotify-web-api-node'
import Container from '../components/Container'

export default function Home({ songs, changeSong }) {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <Container songs={songs} type="Library" changeSong={changeSong} />
    </div>
  )
}

export const getServerSideProps = async ({ req }) => {
  const token = req.cookies["spotify-access-token"]
  if (!token) return { props: {} }

  const spotifyApi = new SpotifyWebApi({ accessToken: token })

  try {
    const { body: { items } } = await spotifyApi.getUserPlaylists()
    return { props: { songs: items } }
  } catch {
    return { props: { songs: [] } }
  }
}
