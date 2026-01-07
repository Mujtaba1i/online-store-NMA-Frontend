import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../contexts/UserContext'
import * as userService from '../../services/userService'
import { useNavigate, Navigate } from "react-router"

function Cart() {

  const { user,setUser } = useContext(UserContext)
  console.log(user.cart)
  const userCart=user.cart

  if (user === null || user?.role !== 'admin' || user?.role !== 'seller') {
        return <Navigate to='/'/>
    }

    return (
    <div>
        {userCart.map(item => {return(<div key={item.product}>{item.product.name}: {item.quantity}</div>)})}
    </div>
  )
}

export default Cart