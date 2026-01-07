import axios from "axios"
const BASE_URL = `${import.meta.env.VITE_API_URL}/products`

const index = async () => {
    try {
        const response = await axios.get(BASE_URL)
        // console.log(response.data)
        return response.data.products
    }
    catch (err) {
        console.log(err)
    }
}
const show = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`)
        return response.data.product
    }
    catch (err) {
        console.log(err)
    }
}
const create = async (formData)=> {
  try{
    const token = localStorage.getItem('token')
    const response = await axios.post(BASE_URL, formData,{headers:{Authorization: `Bearer ${token}`}})
    console.log(response.data)
    return response.data
  }catch(error){
    console.log(error)
  }
}
const update = async (productId, formData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${productId}`, formData)
    return response.data.product
  } catch (error) {
    console.log(error)
  }
}
const deleteOne = async (productId) => {
  try{
    const response = await axios.delete(`${BASE_URL}/${productId}`)
    return response.data.product
  }catch(error){
    console.log(error)
  }
}
export {
    index,
    show,
    create,
    update,
    deleteOne
}