import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router'
import * as orderService from '../../../services/orderService.js'
import { useParams, Navigate } from 'react-router'
import { UserContext } from "../../../contexts/UserContext"

const OrderDetails = () => {
  const { id } = useParams()
  const {user} = useContext(UserContext)

  const [order, setOrder] = useState({})
  useEffect(() => {
    const getOneOrder = async () => {
      try {
        const data = await orderService.show(id)
        setOrder(data)
      } catch (error) {
        console.error(error)
      }
    }
    getOneOrder()
  }, [])

    if (user === null || user?.role === 'admin' || user?.role === 'seller' ) {
      return <Navigate to='/'/>
    }

  return (
    <>
      <h1>Order details</h1>
      <p></p>
    </>
  )
}

export default OrderDetails
