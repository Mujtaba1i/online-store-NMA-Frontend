import { useState } from 'react'
import * as productService from "../../../services/productService"
import { useNavigate, useParams } from 'react-router'

const ProductForm = () => {
    const navigate = useNavigate()
    const [formState, setFormState] = useState({
        name:'',
        description: '',
        price:0,
        stock:0,
        imageLink:''
    })
    const [message, setMessage] = useState('')

    const handleChange = (evt) => {
        const { name, value } = evt.target
        const newFormState = { ...formState, [name]: value }
        setFormState(newFormState)
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()

        try {
            // clear message
            // calll prod create service with formData
            // check that if resp redirect '/seller-dashboard'
            setMessage(" ")
            const newProduct = await productService.create(formState)
            navigate("/")
        } catch (error) {
            console.log(error)
            setMessage("Something went wrong")
        }
    }
    return (
        <>
            <h1>Create new Product</h1>
            <p>{message}</p>
            <form onSubmit={handleSubmit}>

                <label htmlFor="name">Name: </label>
                <input type="text" id='name' name='name' value={formState.name} onChange={handleChange} />

                <label htmlFor="description">Description: </label>
                <textarea name="description" id="description" onChange={handleChange} value={formState.description}>{formState.description}</textarea>

                <label htmlFor="price">Price: </label>
                <input type="number" id='price' name='price' value={formState.price} onChange={handleChange} />

                <label htmlFor="stock">Stock: </label>
                <input type="number" id='stock' name='stock' value={formState.stock} onChange={handleChange} />

                <label htmlFor="imageLink">Product Image: </label>
                <input type="text" id='imageLink' name='imageLink' value={formState.imageLink} onChange={handleChange} />

                <button>Create</button>
            </form>
        </>
    )
}

export default ProductForm