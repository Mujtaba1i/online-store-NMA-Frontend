import { Link } from 'react-router'
import { UserContext } from '../../contexts/UserContext'
import { useContext } from 'react'

function NavBar() {
  const {user,setUser} = useContext(UserContext)

  function logout(){
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