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
    const response = await axios.get(`${BASE_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    return response.data.oneOrder
  } catch (error) {
    console.error(error)
  }
}

const createOrdersFromCart = async (userId) => {
  const token = localStorage.getItem('token')
  return axios.post(`${BASE_URL}/checkout/${userId}`,{},{headers: {Authorization: `Bearer ${token}`}})
}

const updateStatus = async (orderId, productId, status) => {
  try {
    const res = await axios.patch(`${BASE_URL}/orders/${orderId}/status`, { productId, status },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
    
    return res.data
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to update order status');
  }
}

const getSellerOrders = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/seller/orders`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return res.data.orders;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { 
  index, 
  show,
  createOrdersFromCart,
  updateStatus,
  getSellerOrders
}
