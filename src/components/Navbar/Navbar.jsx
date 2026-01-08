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
        {user ? 
        <>
        <p>Welcome {user.username}!</p> 
        <button onClick={logout}>Sign-out</button>
        {user ?  user.role === 'admin' &&  <Link to='/admin-dashboard'>Admin Dashboard</Link> : <></>}
        {user ?  user.role === 'seller' &&  <Link to='/seller-dashboard'>Seller Dashboard</Link> : <></>}
        {user ?  user.role === 'customer' &&  <Link to='/cart'>Number of items in cart: {user.cartTotal} </Link> : <></>}
        </>
        :
        <>
        <li><Link to='/Sign-up'>Sign-Up</Link></li>
        <li><Link to='/Sign-in'>Sign-In</Link></li>
        </>
        }
        
      </ul>
    </nav>
  )
}

export default NavBar
