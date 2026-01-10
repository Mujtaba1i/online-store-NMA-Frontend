import { Navigate, useNavigate, Link } from "react-router"
import { UserContext } from "../../../contexts/UserContext"
import { useContext, useState, useEffect } from 'react'
import * as productService from "../../../services/productService"
import styles from './SellerDashboard.module.css'

function SellerDashboard() {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const [products, setProducts] = useState([])

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

  useEffect(() => {
    getAllProducts()
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
    </div>
  )
}

export default SellerDashboard