import { Navigate, useNavigate } from "react-router"
import { UserContext } from "../../contexts/UserContext"
import { useContext } from 'react'

function SellerDashboard() {
    
    const navigate = useNavigate()
    const {user} = useContext(UserContext)
    if (user === null || user?.role !== 'seller') {
        return <Navigate to='/'/>
    }

    function handleClick(){
        navigate('/products/new')
    }

  return (
    <>
        <button onClick={handleClick}>create product listing</button>
        <div>SellerDashboard</div>
    </>
  )
}

export default SellerDashboard