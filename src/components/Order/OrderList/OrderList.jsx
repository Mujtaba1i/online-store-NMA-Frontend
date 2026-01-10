import { useEffect, useState, useContext } from 'react'
import { Link, Navigate } from 'react-router'
import * as orderService from '../../../services/orderService.js'
import { UserContext } from '../../../contexts/UserContext'
import styles from './OrderList.module.css'

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

    if (user === null || user?.role === 'admin' || user?.role === 'seller') {
        return <Navigate to='/' />
    }

    const getStatusClass = (status) => {
        const statusLower = status.toLowerCase()
        if (statusLower === 'pending') return styles.statusPending
        if (statusLower === 'shipped') return styles.statusShipped
        if (statusLower === 'delivered') return styles.statusDelivered
        if (statusLower === 'cancelled') return styles.statusCancelled
        return styles.statusPending
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Your Orders</h1>
            </div>

            {!orders?.length ? (
                <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>🛒</div>
                    <p className={styles.emptyText}>No orders found</p>
                </div>
            ) : (
                <ul className={styles.orderList}>
                    {orders.map((order) => (
                        <li key={order._id} className={styles.orderCard}>
                            <Link to={`/orders/${order._id}`} className={styles.orderLink}>
                                <div className={styles.orderHeader}>
                                    <div className={styles.orderInfo}>
                                        <div className={styles.orderDetails}>
                                            <h3 className={styles.orderTitle}>
                                                Order #{order._id.slice(-8).toUpperCase()}
                                            </h3>
                                            <div className={styles.orderDate}>
                                                {order.products.length} item{order.products.length !== 1 ? 's' : ''}
                                            </div>
                                        </div>
                                    </div>
                                    <span className={`${styles.statusBadge} ${getStatusClass(order.status)}`}>
                                        {order.status}
                                    </span>
                                </div>

                                <ul className={styles.productList}>
                                    {order.products.map((item) => (
                                        <li key={item.product?._id} className={styles.productItem}>
                                            <div className={styles.productInfo}>
                                                <div className={styles.productName}>
                                                    {item.product?.name || 'Product Unavailable'}
                                                </div>
                                                <div className={styles.productQuantity}>
                                                    Quantity: 
                                                    <span className={styles.quantityBadge}>
                                                        {item.quantity}
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default OrderList