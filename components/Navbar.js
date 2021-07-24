import Link from "next/link"
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { logout } from '../utils'

const Navbar = ({ setToken }) => {
  const router = useRouter()
  const inputRef = useRef()

  const handleSubmit = e => {
    e.preventDefault()
    router.push(`/search?name=${inputRef.current.value}`)
    inputRef.current.value = ""
  }

  const handleLogout = e => {
    e.preventDefault()

    logout()
      .then(() => setToken(null))
      .catch(e => alert("Something went wrong!"))
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand nav-link" style={{ marginRight: 0 }}>Spotify Clone</a>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/logout" onClick={handleLogout}>Logout</a>
            </li>
            <li className="nav-item">
              <Link href="/favorites">
                <a className="nav-link active" aria-current="page">Favorites</a>
              </Link>
            </li>
          </ul>
          <form className="d-flex" onSubmit={handleSubmit}>
            <input className="form-control me-2" type="search" placeholder="Song name" aria-label="Search" ref={inputRef} />
            <button className="btn btn-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
