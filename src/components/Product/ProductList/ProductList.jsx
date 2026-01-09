import { useEffect, useState, useContext } from "react"
import { Link, useSearchParams } from 'react-router'
import { UserContext } from "../../../contexts/UserContext"
import * as productService from "../../../services/productService"
import styles from "./ProductList.module.css"

const ProductList = () => {
    const {user} = useContext(UserContext)
    const [products, setProducts] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
  

  const getAllProducts = async (query) => {
    try {
      const data = await productService.index(query)
      setProducts(data)
    } catch (err) {
      console.log(err)
    }
  }

    const getStockStatus = (stock) => {
        if (stock === 0 || stock === undefined) return { class: styles.outOfStock, text: "Currently unavailable" }
        if (stock < 10) return { class: styles.lowStock, text: `Only ${stock} left in stock` }
        return { class: styles.inStock, text: "In Stock" }
    }

    const formatPrice = (price) => {
        const priceStr = price.toFixed(3)
        const [whole, cents] = priceStr.split('.')
        return { whole, cents }
    }

    useEffect(() => {
      const query = searchParams.get('name')
      getAllProducts(query)
    }, [searchParams])

    return (
        <div className={styles.container}>  
            {
                !products.length ?
                <div className={styles.noProducts}>No Products Found</div>
                :
                <ul className={styles.productGrid}>
                    {
                        products.map((oneProduct) => {
                            const stockStatus = getStockStatus(oneProduct.stock)
                            const price = formatPrice(oneProduct.price || 0)
                            
                            return (
                                <li key={oneProduct._id} className={styles.productCard}>
                                    <Link to={`/products/${oneProduct._id}`} className={styles.productLink}>
                                        <div className={styles.imageContainer}>
                                            {oneProduct.imageLink ? (
                                                <img 
                                                    src={oneProduct.imageLink} 
                                                    alt={oneProduct.name}
                                                    className={styles.productImage}
                                                />
                                            ) : (
                                                <div className={styles.imagePlaceholder}>
                                                    📦
                                                </div>
                                            )}
                                        </div>
                                        <div className={styles.cardContent}>
                                            <h2 className={styles.productName}>
                                                {oneProduct.name}
                                            </h2>
                                            <div className={styles.productFooter}>
                                                <div className={styles.priceContainer}>
                                                    <span className={styles.priceDollar}>BHD</span>
                                                    <span className={styles.priceWhole}>{price.whole}</span>
                                                    <span className={styles.priceCents}>{price.cents}</span>
                                                </div>
                                                <div className={`${styles.stockBadge} ${stockStatus.class}`}>
                                                    {stockStatus.text}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            }
        </div>
    )
}

export default ProductList
