import Image from "next/image"
import { useRouter } from "next/router"
import styles from "../styles/Song.module.css"

const Song = ({ image, artistName, songName, firstArtist }) => {
  const router = useRouter()

  const findLyrics = () => {
    router.push(`/lyrics?title=${songName}&artist=${firstArtist}`)
  }

  return (
    <div className={styles.card}>
      <Image  src={image} width={100} height={100} alt={songName} />
      <div className={styles.content}>
        <h3 >{songName}</h3>
        <h4 >{artistName}</h4>
      </div>
      <div className={styles.icons}>
        {
          firstArtist && (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-music-note-list" viewBox="0 0 16 16" onClick={findLyrics}>
              <path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z"/>
              <path fillRule="evenodd" d="M12 3v10h-1V3h1z"/>
              <path d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1V2.82z"/>
              <path fillRule="evenodd" d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"/>
            </svg>
          )
        }
      </div>
    </div>
  )
}

export default Song
