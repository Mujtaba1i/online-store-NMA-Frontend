import { useState, useContext } from 'react'
import * as productService from "../../../services/productService"
import { useNavigate, Navigate, Link } from 'react-router'
import { UserContext } from "../../../contexts/UserContext"
import styles from './CreateProductForm.module.css'

const ProductForm = () => {
    const navigate = useNavigate()
    const { user } = useContext(UserContext)
    const [formState, setFormState] = useState({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        imageLink: ''
    })
    const [message, setMessage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (evt) => {
        const { name, value } = evt.target
        const newFormState = { ...formState, [name]: value }
        setFormState(newFormState)
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        setIsSubmitting(true)
        setMessage("")

        try {
            const payload = { ...formState }
            payload.price = Number(payload.price)
            payload.stock = Number(payload.stock)

            const newProduct = await productService.create(payload)
            
            setMessage("Product created successfully!")
            setTimeout(() => navigate("/seller-dashboard"), 1500)
        } catch (error) {
            console.log(error)
            setMessage("Something went wrong. Please check your inputs and try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    if (user === null || user?.role === 'admin' || user?.role === 'customer') {
        return <Navigate to='/' />
    }

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <h1 className={styles.title}>Create New Product</h1>
                
                {message && (
                    <div className={message.includes("wrong") ? styles.message : styles.successMessage}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name" className={styles.label}>Product Name</label>
                        <input
                            type="text"
                            id='name'
                            name='name'
                            value={formState.name}
                            onChange={handleChange}
                            className={styles.input}
                            placeholder="Enter product name"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="description" className={styles.label}>Description</label>
                        <textarea
                            name="description"
                            id="description"
                            onChange={handleChange}
                            value={formState.description}
                            className={styles.textarea}
                            placeholder="Describe your product..."
                            rows="4"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="price" className={styles.label}>Price</label>
                        <div className={styles.priceContainer}>
                            <span className={styles.currency}>BD</span>
                            <input
                                type="number"
                                id='price'
                                name='price'
                                value={formState.price}
                                onChange={handleChange}
                                className={`${styles.input} ${styles.inputWithCurrency}`}
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="stock" className={styles.label}>Stock Quantity</label>
                        <input
                            type="number"
                            id='stock'
                            name='stock'
                            value={formState.stock}
                            onChange={handleChange}
                            className={styles.input}
                            placeholder="Enter available quantity"
                            min="0"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="imageLink" className={styles.label}>Product Image URL</label>
                        <input
                            type="text"
                            id='imageLink'
                            name='imageLink'
                            value={formState.imageLink}
                            onChange={handleChange}
                            className={styles.input}
                            placeholder="https://example.com/product-image.jpg"
                        />
                        {formState.imageLink && (
                            <div className={styles.imagePreview}>
                                <img src={formState.imageLink} alt="Product preview" onError={(e) => e.target.style.display = 'none'} />
                            </div>
                        )}
                        {!formState.imageLink && (
                            <div className={`${styles.imagePreview} ${styles.noImage}`}>
                                Enter a URL to see preview
                            </div>
                        )}
                    </div>

                    <div className={styles.buttonGroup}>
                        <button 
                            type="submit" 
                            className={styles.submitButton}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className={styles.loadingSpinner} style={{width: '20px', height: '20px'}}></div>
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <span>+</span>
                                    Create Product
                                </>
                            )}
                        </button>
                        <Link to="/seller-dashboard" className={styles.cancelButton}>
                            <span>←</span>
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductForm