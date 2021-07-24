import { useEffect, useState } from 'react'
import { useRouter } from "next/router"
import LoadingBar from "./LoadingBar"
import Head from "next/head"
import { fetchData } from '../utils'

const SCOPES = "ugc-image-upload%20user-read-email%20user-read-private%20user-read-recently-played%20user-top-read%20user-read-playback-position%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20app-remote-control%20streaming%20playlist-modify-public%20playlist-modify-private%20playlist-read-private%20playlist-read-collaborative%20user-follow-modify%20user-follow-read%20user-library-modify%20user-library-read" // Added all the scopes as if needed in the future don't wanna search for specific scopes

const LOGIN_URI = `https://accounts.spotify.com/authorize?response_type=code&client_id=97f857203f524062824f628755342118&redirect_uri=http://localhost:3000&scope=${SCOPES}`

const Login = ({ setToken }) => {
  const [loading, setLoading] = useState(false)
  const { query: { code }, replace } = useRouter()

  useEffect(() => {
    if (!code) return

    setLoading(true)

    fetchData("/access-token", { code })
      .then(res => res.json())
      .then(token => {
        token.expiresIn *= 1000
        setToken(token)
        replace("/")
      })
      .catch(() => {
        setLoading(false)
        alert("Something went wrong!")
      })
  }, [code, replace, setToken])

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <div style={{ height: "100vh" }} className="center">
        {
          loading ? <LoadingBar /> : <a href={LOGIN_URI} className="btn btn-success">Sign in via Spotify</a>
        }
      </div>
    </>
  )
}

export default Login
