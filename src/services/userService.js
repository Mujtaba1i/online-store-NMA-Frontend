import axios from "axios"
const BASE_URL = `${import.meta.env.VITE_API_URL}/users`

const customersIndex = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/customers`)
        return response.data
    }
    catch (err) {
        console.log(err)
    }
}

const oneCustomer = async (id) =>{

    try {
        const response = await axios.get(`${BASE_URL}/${id}`)
        console.log(response)
    } catch (err) {
        console.log(err)
    }

}

const sellersReqIndex = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/sellers-request`)
        return response.data
    }
    catch (err) {
        console.log(err)
    }
}

const sellersIndex = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/sellers`)
        return response.data
    }
    catch (err) {
        console.log(err)
    }
}

const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`)
        return 'DELETED'
    }
    catch (err) {
        console.log(err)
    }
}

const acceptSellerReq = async (id,body) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`,body)
        return 'UPDATED'
    }
    catch (err) {
        console.log(err)
    }
}

export {
    customersIndex,
    sellersReqIndex,
    sellersIndex,
    deleteUser,
    acceptSellerReq,
    oneCustomer
}