import {Link} from 'react-router'
import styles from './Navbar.module.css'


function Navbar() {
  return (
    <div>
        <Link to='/' >Homepage</Link> {' | '}
        <Link to='/Sign-up' >Sign-up</Link> {' | '}
        <Link to='/Sign-in' >Sign-in</Link> {' | '}

    </div>
  )
}

export default Navbar