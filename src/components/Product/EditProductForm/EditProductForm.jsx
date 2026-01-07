import { useEffect, useState } from 'react'
import * as productService from "../../../services/productService"
import { useNavigate, useParams } from 'react-router'

function EditProductForm() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [formState, setFormState] = useState({})
    const [message, setMessage] =useState(" ")

    useEffect(
        () => {
            const getOneProduct = async (id) => {
                const product = await productService.show(id)
                setFormState(product)
            }

            if (id) getOneProduct(id)
        }, [id]
    )

    if (!id) return <h1>Loading...</h1>
    if (!formState) return <h1>Loading..</h1>

    const handleChange = (evt) => {
        const { name, value } = evt.target
        const newFormState = { ...formState, [name]: value }
        setFormState(newFormState)
    }
    const handleSubmit = async (evt) => {
        evt.preventDefault()
        try {
            const payload = { ...formState }
            payload.price = Number(payload.price)
            payload.stock = Number(payload.stock)

            const updatedProduct = await productService.update(id, payload)

            if(updatedProduct){
                navigate("/")
            }
        } 
        catch (error) {
            console.log(error)
            setMessage("Something went wrong")
        }
    }
    return (
        <>
            <h1>Edit {formState.name}</h1>
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

                <button>Edit</button>
            </form>
        </>
    )
}

export default EditProductForm