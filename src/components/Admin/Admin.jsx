import { useNavigate } from "react-router"
import { UserContext } from "../../contexts/UserContext"
import { useContext, useEffect, useState  } from 'react'
import * as userService from "../../services/userService"

function Admin() {

    const navigate = useNavigate()
    const {user} = useContext(UserContext)
    if (user === null || user.role !== 'admin') useEffect(() => navigate('/'),[])
    
    const [users, setUsers] = useState([])
        
    async function getAllUsers (){
        try {
            let data = await userService.index()
            data = data.filter(oneUser => user._id !== oneUser._id)
            setUsers(data)
            
        } catch (err) {
            console.error('Ran into an error: ' + err)
        }
    }

        useEffect(()=>{
            getAllUsers()
        },[])

  return (
    <>
        <div>
            {users.map(oneUser => <div key={oneUser._id}>{oneUser.username}</div>)}
        </div>
    </>
  )
}

export default Admin