import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import * as orderService from '../../services/orderService.js'
import { useParams } from 'react-router'

const OrderDetails = () => {
  const { id } = useParams()

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

  return (
    <>
      <h1>Order details</h1>
      <p></p>
    </>
  )
}

export default OrderDetails
