import axios from "axios"
const BASE_URL = `${import.meta.env.VITE_API_URL}/users`

const index = async () => {
    try {
        const response = await axios.get(BASE_URL)
        return response.data
    }
    catch (err) {
        console.log(err)
    }
}

export {
    index
}