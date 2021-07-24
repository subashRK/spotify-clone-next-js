import Head from "next/head"
import SpotifyWebApi from "spotify-web-api-node"
import Container from "../components/Container"

const Search = ({ songs, changeSong }) => {
  return (
    <div>
      <Head>
        <title>Search</title>
      </Head>

      <Container songs={songs} type="Search" changeSong={changeSong} />
    </div>
  )
}

export default Search

export const getServerSideProps = async ({ req, query: { name } }) => {
  const token = req.cookies["spotify-access-token"]
  if (!token) return { props: {} }

  const spotifyApi = new SpotifyWebApi({ accessToken: token })

  try {
    const { body: { tracks: { items } } } = await spotifyApi.searchTracks(name)
    return { props: { songs: items } }
  } catch(e) {
    console.log(e.message)
    return { props: { songs: [] } }
  }
}
