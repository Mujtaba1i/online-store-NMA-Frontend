import { Link, useNavigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext'
import { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import styles from './Navbar.module.css'

function NavBar() {
  const { user, setUser } = useContext(UserContext)
  const [search, setSearch] = useState('')

  const navigate = useNavigate()

  function logout() {
    navigate('/')
    localStorage.removeItem('token')
    setUser(null)
  }

  const handleInputChange = (event) => {
    setSearch(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate(`/?name=${search}`)
  }

  const logoStyle = {
    height: '65px',
    width: '65px'
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navTop}>
        <Link to="/" className={styles.logo}>
          <div className={styles.logoText} style={logoStyle}><img src='https://i.imgur.com/Ulu6OH8.jpeg' style={{width: '100%'}} ></img></div>
        </Link>

        <div className={styles.searchContainer}>
          <form onSubmit={handleSubmit} className={styles.searchForm}>
            <label htmlFor="search-input" className={styles.searchLabel}>Search</label>
            <input
              type="text"
              id="search-input"
              placeholder="Search nmazon"
              value={search}
              onChange={handleInputChange}
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              <span className={styles.searchIcon}>🔍</span>
            </button>
          </form>
        </div>

        <div className={styles.navRight}>
          {user ? (
            <div className={styles.userSection}>
              <div className={styles.welcomeText}>
                <div>Hello, {user.username}</div>
              </div>
              
              <button onClick={logout} className={styles.signOutButton}>
                Sign Out
              </button>
              
              {user.role === 'admin' && (
                <Link to='/admin-dashboard' className={styles.dashboardLink}>
                  Admin Dashboard
                </Link>
              )}
              
              {user.role === 'seller' && (
                <Link to='/seller-dashboard' className={styles.dashboardLink}>
                  Seller Dashboard
                </Link>
              )}
              
              {user.role === 'customer' && (<>
                <Link to='/cart' className={styles.cartLink}>
                  <FontAwesomeIcon icon={faCartShopping} style={{color: "#df1144",}} />
                  <div className={styles.cartIcon}>
                      {user.cartTotal > 0 && (<span className={styles.cartCount}>{user.cartTotal}</span>)}
                  </div>
                </Link>
                <Link to='/orders' className={styles.dashboardLink}>
                  Orders
                </Link>
                </>
              )}
            </div>
          ) : (
            <ul className={styles.authLinks}>
              <li><Link to='/Sign-up'>Sign Up</Link></li>
              <li><Link to='/Sign-in'>Sign In</Link></li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar