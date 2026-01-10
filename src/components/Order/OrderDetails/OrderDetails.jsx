import { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router'
import * as orderService from '../../../services/orderService.js'
import { useParams, Navigate } from 'react-router'
import { UserContext } from "../../../contexts/UserContext"
import styles from './OrderDetails.module.css'

const OrderDetails = () => {
  const { id } = useParams()
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const getOneOrder = async () => {
      try {
        const data = await orderService.show(id)
        setOrder(data)
        setSelectedStatus(data.status)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    getOneOrder()
  }, [id])

  const handleSaveStatus = async () => {
    if (selectedStatus === order.status) {
      return
    }

    setIsSaving(true)
    try {
      const sellerProduct = order.products.find(
        item => String(item.product.user._id) === String(user._id)
      )
      
      if (sellerProduct) {
        await orderService.updateStatus(id, sellerProduct.product._id, selectedStatus)
        navigate('/seller-dashboard')
      }
    } catch (error) {
      console.error('Error updating status:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const hasAccess = () => {
    if (!user || !order) return false
    
    if (user.role === 'customer' && String(order.user._id) === String(user._id)) {
      return true
    }
    
    if (user.role === 'seller') {
      return order.products.some(
        item => String(item.product.user._id) === String(user._id)
      )
    }
    
    return false
  }

  const canEditProduct = (productUser) => {
    return user?.role === 'seller' && String(user._id) === String(productUser._id)
  }

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'pending': return styles.pendingBadge
      case 'shipped': return styles.shippedBadge
      case 'delivered': return styles.deliveredBadge
      case 'cancelled': return styles.cancelledBadge
      default: return styles.pendingBadge
    }
  }

  if (loading) {
    return <div className={styles.loading}>Loading...</div>
  }

  if (!order || !user || !hasAccess()) {
    return <Navigate to='/' />
  }

  const total = order.products.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  const isSeller = user?.role === 'seller'
  const hasStatusChanged = selectedStatus !== order.status

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Order Details</h1>
          <p className={styles.orderId}>Order #{order._id.slice(-8)}</p>
        </div>
        <Link 
          to={isSeller ? '/seller-dashboard' : '/orders'} 
          className={styles.backButton}
        >
          ← Back to {isSeller ? 'Dashboard' : 'Orders'}
        </Link>
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.infoCard}>
          <div className={styles.infoLabel}>Status</div>
          <span className={`${styles.statusBadge} ${getStatusBadgeClass(order.status)}`}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>
        <div className={styles.infoCard}>
          <div className={styles.infoLabel}>Order Date</div>
          <div className={styles.infoValue}>
            {new Date(order.createdAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </div>
        </div>
        <div className={styles.infoCard}>
          <div className={styles.infoLabel}>Customer</div>
          <div className={styles.infoValue}>{order.user.username}</div>
        </div>
        <div className={styles.infoCard}>
          <div className={styles.infoLabel}>Total Amount</div>
          <div className={styles.totalPrice}>
            <span className={styles.currency}>BHD</span>
            <span className={styles.amount}>{total.toFixed(3)}</span>
          </div>
        </div>
      </div>

      {order.notes && (
        <div className={styles.notesSection}>
          <h3 className={styles.sectionTitle}>Order Notes</h3>
          <p className={styles.notesText}>{order.notes}</p>
        </div>
      )}

      <div className={styles.productsSection}>
        <h2 className={styles.sectionTitle}>Products</h2>
        <div className={styles.productsList}>
          {order.products.map((item) => (
            <div key={item.product._id} className={styles.productCard}>
              <div className={styles.productHeader}>
                <h3 className={styles.productName}>{item.product.name}</h3>
                <div className={styles.productPrice}>
                  <span className={styles.currency}>BHD</span>
                  <span className={styles.price}>{item.product.price.toFixed(3)}</span>
                </div>
              </div>
              <div className={styles.productDetails}>
                <div className={styles.productInfo}>
                  <span className={styles.label}>Quantity:</span>
                  <span className={styles.value}>{item.quantity}</span>
                </div>
                <div className={styles.productInfo}>
                  <span className={styles.label}>Seller:</span>
                  <span className={styles.value}>{item.product.user.username}</span>
                </div>
                <div className={styles.productInfo}>
                  <span className={styles.label}>Subtotal:</span>
                  <span className={styles.value}>
                    BHD {(item.product.price * item.quantity).toFixed(3)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isSeller && order.products.some(item => canEditProduct(item.product.user)) && (
        <div className={styles.statusUpdateSection}>
          <h3 className={styles.sectionTitle}>Update Order Status</h3>
          <div className={styles.statusUpdateCard}>
            <div className={styles.statusSelectContainer}>
              <label htmlFor="status-select" className={styles.statusLabel}>
                Change Status:
              </label>
              <select
                id="status-select"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className={styles.statusSelect}
              >
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <button 
              onClick={handleSaveStatus}
              disabled={!hasStatusChanged || isSaving}
              className={`${styles.saveButton} ${!hasStatusChanged ? styles.disabled : ''}`}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}

      <div className={styles.totalSection}>
        <div className={styles.totalLabel}>Order Total</div>
        <div className={styles.totalAmount}>
          <span className={styles.currency}>BHD</span>
          <span className={styles.amount}>{total.toFixed(3)}</span>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails