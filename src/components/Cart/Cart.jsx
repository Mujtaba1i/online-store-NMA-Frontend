import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import * as userService from '../../services/userService'
import * as orderService from '../../services/orderService'
import { Navigate,useNavigate  } from "react-router"

function Cart() {

  const { user,setUser } = useContext(UserContext)
  const userCart = user?.cart || []
  const navigate = useNavigate()

  if (user === null || user?.role === 'admin' || user?.role === 'seller') {
        return <Navigate to='/'/>
    }
    
  function cartTotalPrice() {
    return userCart.reduce((total, item) => total + item.product.price * item.quantity,0)
  }
  

  async function handleAction(itemId, action) {
    await userService.updateCustomerCart(user._id, itemId, action)
    const updatedUser = await userService.oneCustomer(user._id)
    setUser(updatedUser.data.oneUser)
  }

  async function handleCheckout() {
    const response = await orderService.createOrdersFromCart(user._id)
    setUser({ ...user, cart: [], cartTotal: 0 })
    navigate('/orders')
  }

    return (
    <div>
      <p>Total Price: {cartTotalPrice()} BD</p>
      {userCart.map(item => (
        <div key={item._id}>
          <p>
            {item.product.name}: {item.quantity} costs each: {item.product.price} BD
          </p>

          <button onClick={() => handleAction(item.product._id, 'increment')}>+</button>
          <button onClick={() => handleAction(item.product._id, 'decrement')}>-</button>
          <button onClick={() => handleAction(item.product._id, 'delete')}>Delete</button>
          
        </div>
      ))}

      {userCart.length > 0 && (
          <button onClick={handleCheckout}>Checkout</button>
        )}
    </div>
  )
}

export default Cart