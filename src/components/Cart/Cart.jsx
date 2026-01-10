import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import * as userService from '../../services/userService'
import * as orderService from '../../services/orderService'
import { Navigate, useNavigate } from "react-router"
import styles from './Cart.module.css'

function Cart() {
  const { user, setUser } = useContext(UserContext)
  const userCart = user?.cart || []
  const navigate = useNavigate()

  if (user === null || user?.role === 'admin' || user?.role === 'seller') {
    return <Navigate to='/' />
  }

  function cartTotalPrice() {
    return userCart.reduce((total, item) => total + item.product.price * item.quantity, 0)
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

  const formatPrice = (price) => {
    const [whole, cents] = price.toFixed(3).split('.')
    return { whole, cents }
  }

  const total = formatPrice(cartTotalPrice())

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Your Shopping Cart</h1>
      </div>

      <div className={styles.summary}>
        <div className={styles.totalPrice}>
          <span className={styles.totalLabel}>Total Price:</span>
          <div className={styles.totalAmount}>
            <span className={styles.totalDollar}>BD</span>
            <span className={styles.totalWhole}>{total.whole}</span>
            <span className={styles.totalCents}>.{total.cents}</span>
          </div>
        </div>
        
        {userCart.length > 0 && (
          <button 
            className={styles.checkoutButton} 
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        )}
      </div>

      {userCart.length === 0 ? (
        <div className={styles.emptyCart}>
          <h2>Your cart is empty</h2>
        </div>
      ) : (
        <div className={styles.cartItems}>
          {userCart.map(item => {
            const itemTotal = item.product.price * item.quantity
            const itemPrice = formatPrice(item.product.price)
            const itemTotalPrice = formatPrice(itemTotal)

            return (
              <div key={item._id} className={styles.cartItem}>
                <div className={styles.itemHeader}>
                  <h3 className={styles.itemName}>{item.product.name}</h3>
                  <div className={styles.itemPrice}>
                    <span>BD</span>
                    <span>{itemPrice.whole}</span>
                    <span>.{itemPrice.cents}</span>
                    <span> each</span>
                  </div>
                </div>
                
                <div className={styles.itemDetails}>
                  <div className={styles.quantityControls}>
                    <button 
                      className={styles.quantityButton}
                      onClick={() => handleAction(item.product._id, 'decrement')}
                    >
                      -
                    </button>
                    <span className={styles.quantity}>{item.quantity}</span>
                    <button 
                      className={styles.quantityButton}
                      onClick={() => handleAction(item.product._id, 'increment')}
                    >
                      +
                    </button>
                  </div>
                  
                  <div className={styles.itemTotal}>
                    <span>BD</span>
                    <span>{itemTotalPrice.whole}</span>
                    <span>.{itemTotalPrice.cents}</span>
                    <span> total</span>
                  </div>
                  
                  <button 
                    className={styles.deleteButton}
                    onClick={() => handleAction(item.product._id, 'delete')}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Cart