import { Link, useNavigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext'
import { useContext } from 'react'

function NavBar() {
  const {user,setUser} = useContext(UserContext)
  // const {cart,setCart} = useContext(CartContext)

  const navigate = useNavigate()

  function logout(){
    navigate('/')
    localStorage.removeItem('token')
    setUser(null)
  }
  

  return (
    <nav>
      <ul>
        {user ? 
        <>
        <p>Welcome {user.username}!</p> 
        <button onClick={logout}>Sign-out</button>
        {user ?  user.role === 'admin' &&  <Link to='/admin-dashboard'>Admin Dashboard</Link> : <></>}
        {user ?  user.role === 'seller' &&  <Link to='/seller-dashboard'>Seller Dashboard</Link> : <></>}
        {user ?  user.role === 'customer' &&  <Link to='/cart'>Number of items in cart: {user.cart.length} </Link> : <></>}
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