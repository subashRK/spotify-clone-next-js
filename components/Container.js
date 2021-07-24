import LoadingBar from "./LoadingBar"
import SongList from "./SongList"

const Container = ({ songs, changeSong, type }) => {
  return (
    <main className="container mt-4 mb-1">
      <h1 className="fs-2">Your {type}</h1>
      <hr />
      {
        !songs ? (
          <div className="center" style={{ marginTop: 75 }}>
            <LoadingBar />
          </div>
        ) : (
          songs.length === 0 ? (
            <div className="center" style={{ marginTop: 75 }}>
              <h2 style={{ fontWeight: "normal", textAlign: "center" }}>No songs available in your {type}!</h2>
            </div>
          ) : <SongList songs={songs} changeSong={changeSong} />
        )
      }
    </main>
  )
}

export default Container
