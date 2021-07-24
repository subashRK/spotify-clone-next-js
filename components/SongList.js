import Song from "./Song"

const SongList = ({ songs, changeSong }) => {
  return (
    <>
      {songs.map(song => (
        <div className="center" key={song.id} onClick={() => changeSong(song.uri)}>
          {
            song.href.includes("https://api.spotify.com/v1/playlists/") ? (
              <Song 
                image={song.images[0].url}
                artistName={`By ${song.owner.display_name}`}
                songName={song.name}
              />
            ) : (
              <Song
                image={song.album.images[0].url}
                artistName={song.artists.map(artist => artist.name).join(", ")}
                songName={song.name}
                firstArtist={song.artists[0].name}
              />
            )
          }
        </div>
      ))}
    </>
  )
}

export default SongList
