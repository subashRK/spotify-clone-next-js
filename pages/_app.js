import { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import '../styles/globals.css'
import App from "next/app"
import Login from '../components/Login'
import Navbar from '../components/Navbar'
import { fetchData } from '../utils'
import { useRouter } from 'next/router'
import Router from 'next/router'
import LoadingBar from '../components/LoadingBar'
import Player from '../components/Player'
import ProgressBar from "@badrap/bar-of-progress"

const progress = new ProgressBar({
  size: 3,
  color: "#1DB954",
})

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps, token: tokenProp }) {
  const [token, setToken] = useState(tokenProp || null)
  const [currentPlayingSong, setCurrentPlayingSong] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.min.js") // Doesn't work with normal import
  }, [])

  useEffect(() => {
    if (!token) return

    const convertExpiresInTime = token => {
      token.expiresIn -= Date.now()
      return token
    }

    if (!token.accessToken || !token.expiresIn) {
      setLoading(true)
      
      fetchData("/refresh-token", { refreshToken: token.refreshToken })
      .then(res => res.json())
      .then(data => {
        setToken(oldToken => ({ refreshToken: oldToken.refreshToken, ...convertExpiresInTime(data) }))
        setLoading(false)
        router.replace("/")
      })
      .catch(() => {
        alert("Something went wrong!")
        setLoading(false)
      })

      return
    }

    if (token?.expiresIn > 3600) {
      setToken(oldToken => convertExpiresInTime(oldToken))
    }

    const timeout = setTimeout(() => {
      fetchData("/refresh-token", { refreshToken: token.refreshToken })
      .then(res => res.json())
      .then(data => {
        setToken(oldToken => ({ refreshToken: oldToken.refreshToken, ...convertExpiresInTime(data) }))
      })
      .catch(() => {
        alert("Something went wrong!")
        setToken(null)
      })
    }, token.expiresIn)

    return () => clearTimeout(timeout)
  }, [token, router])

  return loading ? (
    <div className="center" style={{ height: "100vh" }}>
      <LoadingBar />
    </div>
  ) : token?.accessToken ? (
    <>
      <Navbar setToken={setToken} />
      <Component {...pageProps} changeSong={setCurrentPlayingSong} />
      <div style={{ height: 50 }} />
      <Player token={token.accessToken} currentPlayingSong={currentPlayingSong} />
    </>
  ) : <Login setToken={setToken} />
}

export default MyApp

MyApp.getInitialProps = async context => {
  const refreshToken = context.ctx.req?.cookies["spotify-refresh-token"]
  const accessToken = context.ctx.req?.cookies["spotify-access-token"]
  const expiresIn = context.ctx.req?.cookies["spotify-token-expiresin"]
  const appProps = await App.getInitialProps(context)
  let props = { ...appProps }

  if (!refreshToken) return props
  if (!expiresIn || !accessToken) props.token = { refreshToken }
  else props.token = { accessToken, refreshToken, expiresIn: JSON.parse(expiresIn) }

  return props
}
