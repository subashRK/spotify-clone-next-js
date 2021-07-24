import { useEffect, useState } from "react"
import SpotifyWebPlayer from "react-spotify-web-playback"

const Player = ({ token, currentPlayingSong }) => {
  const [renderPlayer, setRenderPlayer] = useState(false)
  const [play, setPlay] = useState(false)

  useEffect(() => setRenderPlayer(true), [])

  useEffect(() => {
    if (currentPlayingSong) return setPlay(true)
    setPlay(false)
  }, [currentPlayingSong])

  return renderPlayer && (
    <div className="sticky-bottom">
      <SpotifyWebPlayer 
        token={token}
        magnifySliderOnHover
        showSaveIcon
        uris={currentPlayingSong ? [currentPlayingSong] : []}
        play={play}
        callback={status => setPlay(status.isPlaying)}
      />
    </div>
  )
}

export default Player
