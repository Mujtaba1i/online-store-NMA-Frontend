import { Navigate, useNavigate, Link } from "react-router"
import { UserContext } from "../../../contexts/UserContext"
import { useContext, useState, useEffect } from 'react'
import * as productService from "../../../services/productService"
import * as orderService from "../../../services/orderService"
import styles from './SellerDashboard.module.css'

function SellerDashboard() {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [activeTab, setActiveTab] = useState('products')

  if (user === null || user?.role !== 'seller') {
    return <Navigate to='/' />
  }

  function handleClick() {
    navigate('/products/new')
  }

  const getAllProducts = async () => {
    try {
      const data = await productService.sellersProucts()
      setProducts(data)
    } catch (err) {
      console.log(err)
    }
  }

  const getSellerOrders = async () => {
    try {
      const data = await orderService.getSellerOrders()
      setOrders(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAllProducts()
    getSellerOrders()
  }, [])

  const getStockBadgeClass = (stock) => {
    if (stock === 0) return styles.outOfStock
    if (stock < 10) return styles.lowStock
    return styles.inStock
  }

  const getStockText = (stock) => {
    if (stock === 0) return 'Out of Stock'
    if (stock < 10) return `Low Stock (${stock})`
    return `In Stock (${stock})`
  }

  const getOrdersByStatus = (status) => {
    return orders.filter(order => order.status === status)
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

  const renderOrderSection = (status, title) => {
    const statusOrders = getOrdersByStatus(status)
    
    if (statusOrders.length === 0) return null

    return (
      <div className={styles.orderSection}>
        <h3 className={styles.orderSectionTitle}>
          {title}
          <span className={styles.orderCount}>({statusOrders.length})</span>
        </h3>
        <ul className={styles.ordersList}>
          {statusOrders.map((order) => {
            const sellerProducts = order.products.filter(
              item => item.product.user._id === user._id
            )
            const total = sellerProducts.reduce(
              (sum, item) => sum + (item.product.price * item.quantity), 0
            )
            
            return (
              <li key={order._id} className={styles.orderItem}>
                <Link to={`/orders/${order._id}`} className={styles.orderLink}>
                  <div className={styles.orderHeader}>
                    <div className={styles.orderInfo}>
                      <span className={styles.orderId}>Order #{order._id.slice(-8)}</span>
                      <span className={`${styles.statusBadge} ${getStatusBadgeClass(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <div className={styles.orderPrice}>
                      <span className={styles.dollarSign}>BHD</span>
                      <span className={styles.priceWhole}>{Math.floor(total)}</span>
                      <span>.{(total % 1).toFixed(3).slice(2)}</span>
                    </div>
                  </div>
                  <div className={styles.orderDetails}>
                    <p className={styles.orderCustomer}>
                      Customer: {order.user.username}
                    </p>
                    <p className={styles.orderProducts}>
                      {sellerProducts.length} product{sellerProducts.length !== 1 ? 's' : ''} from your store
                    </p>
                    <p className={styles.orderDate}>
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Seller Dashboard</h1>
        </div>
        <button className={styles.createButton} onClick={handleClick}>
          <span>+</span>
          Create Product Listing
        </button>
      </div>

      <div className={styles.tabContainer}>
        <button 
          className={`${styles.tab} ${activeTab === 'products' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('products')}
        >
          Products ({products.length})
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'orders' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders ({orders.length})
        </button>
      </div>

      {activeTab === 'products' ? (
        <>
          <h2>Product List</h2>
          {!products.length ? (
            <div className={styles.emptyState}>
              <h2>No Products Found</h2>
              <p>Start by creating your first product listing</p>
              <button className={styles.createButton} onClick={handleClick}>
                <span>+</span>
                Create Your First Product
              </button>
            </div>
          ) : (
            <ul className={styles.productsList}>
              {products.map((oneProduct) => (
                <li key={oneProduct._id} className={styles.productItem}>
                  <Link to={`/products/${oneProduct._id}`} className={styles.productLink}>
                    <div className={styles.productHeader}>
                      <h3 className={styles.productName}>{oneProduct.name}</h3>
                      <div className={styles.productPrice}>
                        <span className={styles.dollarSign}>BHD</span>
                        <span className={styles.priceWhole}>{Math.floor(oneProduct.price)}</span>
                        <span>.{(oneProduct.price % 1).toFixed(3).slice(2)}</span>
                      </div>
                    </div>
                    <div className={styles.productDetails}>
                      <div className={styles.productMeta}>
                        <span className={`${styles.stockBadge} ${getStockBadgeClass(oneProduct.stock)}`}>
                          {getStockText(oneProduct.stock)}
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <>
          <h2>Orders</h2>
          {!orders.length ? (
            <div className={styles.emptyState}>
              <h2>No Orders Yet</h2>
              <p>Orders containing your products will appear here</p>
            </div>
          ) : (
            <div className={styles.ordersContainer}>
              {renderOrderSection('pending', 'Pending Orders')}
              {renderOrderSection('shipped', 'Shipped Orders')}
              {renderOrderSection('delivered', 'Delivered Orders')}
              {renderOrderSection('cancelled', 'Cancelled Orders')}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default SellerDashboard