import { useState, useEffect, useContext } from 'react'
import * as productService from "../../../services/productService"
import { useParams, Link, useNavigate } from 'react-router'
import { UserContext } from '../../../contexts/UserContext.jsx'
import styles from './ProductDetail.module.css'

function ProductDetail() {
    const [product, setProduct] = useState({})
    const { id } = useParams()
    const navigate = useNavigate()
    const { user, setUser, handleAddToCart } = useContext(UserContext)

    useEffect(() => {
        const getOneProduct = async (id) => {
            try {
                const data = await productService.show(id)
                setProduct(data)
            }
            catch (err) {
                console.log(err)
            }
        }
        if (id) getOneProduct(id)
    }, [id])

    const handleDelete = async () => {
        const deletedProduct = await productService.deleteOne(id)

        if (deletedProduct) {
            navigate('/')
        } else {
            console.log('something went wrong!')
        }
    }

    const getStockStatus = (stock) => {
        if (stock === 0 || stock === undefined) {
            return { class: styles.outOfStock, text: "Out of Stock", dot: styles.stockDot }
        }
        if (stock < 10) {
            return { class: styles.lowStock, text: `Only ${stock} left in stock`, dot: styles.stockDot }
        }
        return { class: styles.inStock, text: "In Stock", dot: styles.stockDot }
    }

    const formatPrice = (price) => {
        const priceStr = (price || 0).toFixed(2)
        const [whole, cents] = priceStr.split('.')
        return { whole, cents }
    }

    if (!id) return <div className={styles.loading}>Loading...</div>

    const stockStatus = getStockStatus(product.stock)
    const price = formatPrice(product.price)
    const isOutOfStock = product.stock === 0 || product.stock === undefined
    const canManage = user && (user.role === "admin" || product.user == user._id)

    return (
        <div className={styles.container}>
            <div className={styles.breadcrumb}>
                <Link to="/">Home</Link>
                <span>›</span>
                <span>{product.name}</span>
            </div>

            <div className={styles.productWrapper}>
                <div className={styles.productLayout}>
                    <div className={styles.imageSection}>
                        <div className={styles.mainImageContainer}>
                            {product.imageLink ? (
                                <img 
                                    src={product.imageLink} 
                                    alt={product.name}
                                    className={styles.mainImage}
                                />
                            ) : (
                                <div className={styles.imagePlaceholder}>📦</div>
                            )}
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className={styles.detailsSection}>
                        <h1 className={styles.productTitle}>{product.name}</h1>

                        {/* Price Section */}
                        <div className={styles.priceSection}>
                            <div className={styles.priceLabel}>Price</div>
                            <div className={styles.priceContainer}>
                                <span className={styles.priceDollar}>$</span>
                                <span className={styles.priceWhole}>{price.whole}</span>
                                <span className={styles.priceCents}>{price.cents}</span>
                            </div>

                            {/* Stock Info */}
                            <div className={`${styles.stockInfo} ${stockStatus.class}`}>
                                <div className={stockStatus.dot}></div>
                                <span className={styles.stockText}>{stockStatus.text}</span>
                            </div>
                        </div>

                        {/* Description */}
                        {product.description && (
                            <div className={styles.descriptionSection}>
                                <h2 className={styles.descriptionTitle}>About this item</h2>
                                <p className={styles.descriptionText}>{product.description}</p>
                            </div>
                        )}

                        {/* Actions */}
                        <div className={styles.actionsSection}>
                            {user && user.role === 'customer' && (
                                <button 
                                    onClick={() => handleAddToCart(id)}
                                    className={styles.addToCartButton}
                                    disabled={isOutOfStock}
                                >
                                    <span>🛒</span>
                                    {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                                </button>
                            )}

                            {canManage && (
                                <div className={styles.adminActions}>
                                    <Link to={`/products/${id}/edit`} className={styles.editButton}>
                                        Edit Product
                                    </Link>
                                    <button onClick={handleDelete} className={styles.deleteButton}>
                                        Delete Product
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail