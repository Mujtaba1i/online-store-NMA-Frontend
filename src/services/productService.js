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

export {
    index
}