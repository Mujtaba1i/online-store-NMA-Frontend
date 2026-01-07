import axios from "axios"
import { authHeaders } from "./authService"
const BASE_URL = `${import.meta.env.VITE_API_URL}/products`


const index = async () => {
    try {
        const response = await axios.get(BASE_URL)
        return response.data.products
    }
    catch (err) {
        console.log(err)
    }
}
const show = async (id) => {
    try {
        const response = await axios.get(
          `${BASE_URL}/${id}`,
          authHeaders()
        )
        return response.data.product
    }
    catch (err) {
        console.log(err)
    }
}
const create = async (formData)=> {
  try {
    const response = await axios.post(
      BASE_URL, 
      formData,
      authHeaders()
    )

    console.log(response.data)
    return response.data
  }catch(error){
    console.log(error)
  }
}
const update = async (productId, formData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${productId}`, formData, authHeaders())
    return response.data.product
  } catch (error) {
    console.log(error)
  }
}
const deleteOne = async (productId) => {
  try{
    const response = await axios.delete(`${BASE_URL}/${productId}`, authHeaders())
    return response.data.product
  }catch(error){
    console.log(error)
  }
}
const sellersProucts = async () => {

try {
        const response = await axios.get(`${BASE_URL}/my-products`, authHeaders())
        console.log(response)
        return response.data.products
    }
    catch (err) {
        console.log(err)
    }
}
export {
    index,
    show,
    create,
    update,
    deleteOne,
    sellersProucts
}