import { Link, useNavigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext'
import { useContext, useState } from 'react'

function NavBar() {
  const { user, setUser } = useContext(UserContext)
  const [search, setSearch] = useState('')

  const navigate = useNavigate()

  function logout() {
    navigate('/')
    localStorage.removeItem('token')
    setUser(null)
  }
  //
  function searchBar() {}

  const handleInputChange = (event) => {
    setSearch(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(`searching for /products?q=${search}`)
    navigate(`/?name=${search}`)
  }

  return (
    <nav>
      {/*  */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="search-input"> Search </label>
        <input
          type="text"
          id="search-input"
          placeholder="Enter search term..."
          value={search}
          onChange={handleInputChange}
        />
        <button type="submit"> Search </button>
      </form>
      {/*  */}
      <ul>
        {user ? (
          <>
            <p>Welcome {user.username}!</p>
            <button onClick={logout}>Sign-out</button>
          </>
        ) : (
          <>
            <li>
              <Link to="/Sign-up">Sign-Up</Link>
            </li>
            <li>
              <Link to="/Sign-in">Sign-In</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default NavBar
