import { useNavigate } from "react-router"
import { UserContext } from "../../contexts/UserContext"
import { useContext, useEffect  } from 'react'

function Admin() {
    
    const navigate = useNavigate()
    const {user} = useContext(UserContext)
    console.log(user)
    if (user.role !== 'admin') useEffect(() => navigate('/'),[])

  return (
    <div>Admin</div>
  )
}

export default Admin