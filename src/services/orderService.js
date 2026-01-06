import axios from 'axios'
const BASE_URL = `${import.meta.env.VITE_API_URL}/orders`

const index = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` }
    })

    return response.data
  } catch (error) {
    console.error(error)
  }
}
const show = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`)
    return response.data.orders
  } catch (error) {
    console.error(error)
  }
}
export { index, show }
