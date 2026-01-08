import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router'
import * as orderService from '../../../services/orderService.js'
import { UserContext } from '../../../contexts/UserContext'

const OrderList = () => {
  const [orders, setOrders] = useState([])
  const { user } = useContext(UserContext)

  useEffect(() => {
    const getAllOrders = async () => {
      if (!user) return
      try {
        const data = await orderService.index(user._id)
        setOrders(data)
      } catch (error) {
        console.error(error)
        setOrders([])
      }
    }
    getAllOrders()
  }, [user])

  return (
    <>
      <h1>Your Orders</h1>
      {!orders?.length ? (
        <div>No orders found</div>
      ) : (
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            <Link to={`/orders/${order._id}`}>
              Order — Status: {order.status}
            <ul>
              {order.products.map((item) => (
                <li key={item.product?._id}>
                  {item.product?.name}: Qty: {item.quantity}
                </li>
              ))}
            </ul>
            </Link>
          </li>
        ))}
      </ul>
      )}
    </>
  )
}

export default OrderList
