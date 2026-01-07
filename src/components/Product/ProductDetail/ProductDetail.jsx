import { useState, useEffect } from 'react'
import * as productService from "../../../services/productService"
import { useParams, Link, useNavigate } from 'react-router'

function productDetail() {
    const [product, setProduct] = useState({})
    const { id } = useParams()
    const navigate = useNavigate()

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

    if (!id) return <h1>Loading...</h1>
    // if () return <h1>Loading..</h1>

    return (
        <>
            <h1>Product Details</h1>
            <h3>Product: {product.name}</h3>
            <p>Description: {product.description}</p>
            <p>Price: {product.price}</p>
            <p>Stock: {product.stock}</p>
            <img src={product.imageLink} alt="productImage" />
            <br />
            <Link to={`/products/${id}/edit`}>
            <button>Edit</button>
            </Link>
            <br />
            <button onClick={handleDelete}>Delete</button>
        </>
    )
}

export default productDetail