import axios from 'axios'
const BASE_URL = `${import.meta.env.VITE_API_URL}/orders`

const index = async (userId) => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${BASE_URL}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}
const show = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`)
    return response.data.orders
  } catch (error) {
    console.error(error)
  }
}

const createOrdersFromCart = async (userId) => {
  const token = localStorage.getItem('token')
  return axios.post(`${BASE_URL}/checkout/${userId}`,{},{headers: {Authorization: `Bearer ${token}`}})
}


export { 
  index, 
  show,
  createOrdersFromCart 
}
