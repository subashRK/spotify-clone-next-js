import { serialize } from "cookie"

const fetchData = (endpoint, body) => {
  return fetch(`/api${endpoint}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: body && JSON.stringify(body)
  })
}

const clearTokenCookie = res => {
  if (!res) return

  setCookie(res, [
    { name: "spotify-access-token", value: "", opt: { maxAge: 0.01 }},
    { name: "spotify-refresh-token", value: "", opt: { maxAge: 0.01 }},
    { name: "spotify-token-expiresin", value: "", opt: { maxAge: 0.01 }},
  ])
}

const setCookie = (res, cookieData) => {
  if (!res) return

  const cookies = cookieData.map(({ name, value, opt }) => serialize(name, value, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV !== "development",
    ...opt
  }))

  res.setHeader("Set-Cookie", cookies)
}

const logout = () => fetchData("/clear-token")

export { clearTokenCookie, setCookie, fetchData, logout }
