import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import * as productService from '../../services/productService.js'

const orderList = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const data = await productService.index()
      } catch (error) {
        console.error(error)
      }
    }
    getAllOrders()
  },[])
}
return(
  <>
    <h1>Your Orders</h1>
{
  !orders.length ?
  <div>no orders found </div>
  :
  <ul>
    {

orders.map((oneOrder)=> <li key={oneOrder._id}>
<Link to={`/orders/${oneOrder._id}`}>{oneOrder.name}</Link>
</li>
)


    }
    </ul>
}


  </>
)
export default orderList

