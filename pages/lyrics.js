import Head from 'next/head'
import lyricsFinder from "lyrics-finder"

const LYRICS_NOT_FOUND = "No Lyrics found!"

export default function Home({ lyrics }) {
  return (
    <div>
      <Head>
        <title>Lyrics</title>
      </Head>

      <main className="container mt-4">
        <h1 className="fs-2">Lyrics</h1>
        <hr/>

        <div className="center" style={{ marginTop: lyrics.trim() === LYRICS_NOT_FOUND && 75 }}>
          <p className="fs-3" style={{ whiteSpace: "pre-wrap" }}>{lyrics}</p>
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps({ req, query: { title, artist } }) {
  const token = req.cookies["spotify-access-token"]
  if (!token) return { props: {} }

  try {
    if (title && artist) {  
      const lyrics = await lyricsFinder(title, artist) || LYRICS_NOT_FOUND
      return { props: { lyrics } }
   } else {
     return { props: { lyrics: LYRICS_NOT_FOUND } }
   }
  } catch(e) {
    console.log(e.message)
    return { props: { lyrics: LYRICS_NOT_FOUND } }
  }
}
