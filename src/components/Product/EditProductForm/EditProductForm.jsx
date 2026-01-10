import { useEffect, useState, useContext } from 'react'
import * as productService from "../../../services/productService"
import { useNavigate, useParams, Navigate, Link } from 'react-router'
import { UserContext } from "../../../contexts/UserContext"
import styles from './EditProductForm.module.css'

function EditProductForm() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [formState, setFormState] = useState({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        imageLink: ''
    })
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(true)
    const { user } = useContext(UserContext)

    useEffect(() => {
        const getOneProduct = async () => {
            try {
                setLoading(true)
                const product = await productService.show(id)

                if (!user || user.role !== 'seller') {
                    navigate('/')
                    return
                }

                if (product.user.toString() !== user._id) {
                    navigate('/')
                    return
                }

                setFormState(product)
            } catch (err) {
                console.log(err)
                setMessage("Error loading product")
                navigate('/')
            } finally {
                setLoading(false)
            }
        }

        if (id && user) getOneProduct()
    }, [id, user, navigate])

    const handleChange = (evt) => {
        const { name, value } = evt.target
        const newFormState = { ...formState, [name]: value }
        setFormState(newFormState)
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        setMessage("")
        
        try {
            const payload = { ...formState }
            payload.price = Number(payload.price)
            payload.stock = Number(payload.stock)

            const updatedProduct = await productService.update(id, payload)

            if (updatedProduct) {
                setMessage("Product updated successfully!")
                setTimeout(() => navigate("/seller-dashboard"), 1500)
            }
        } catch (error) {
            console.log(error)
            setMessage("Something went wrong. Please try again.")
        }
    }

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loadingContainer}>
                    <div className={styles.loadingSpinner}></div>
                    <p>Loading product details...</p>
                </div>
            </div>
        )
    }

    if (!id || !formState.name) {
        return (
            <div className={styles.container}>
                <div className={styles.formWrapper}>
                    <h1 className={styles.title}>Product Not Found</h1>
                    <p className={styles.subtitle}>The product you're trying to edit doesn't exist.</p>
                    <Link to="/seller-dashboard" className={styles.cancelButton}>
                        Return to Dashboard
                    </Link>
                </div>
            </div>
        )
    }

    if (user === null || user?.role === 'admin' || user?.role === 'customer') {
        return <Navigate to='/' />
    }

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <h1 className={styles.title}>Edit {formState.name}</h1>
                
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
                                No image preview available
                            </div>
                        )}
                    </div>

                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.submitButton}>
                            <span>✓</span>
                            Update Product
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

export default EditProductForm