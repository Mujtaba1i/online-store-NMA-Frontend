import axios from "axios"
const BASE_URL = `${import.meta.env.VITE_API_URL}/auth`

async function signUp (formData){
    try {
        const res = await axios.post(`${BASE_URL}/sign-up`, formData)
        const data = res.data
        const token = data.token

        localStorage.setItem('token', token)

        const encodedPayload = token.split('.')[1]
        const decodedPayload = atob(encodedPayload)
        const parsedPayload = (JSON.parse(decodedPayload)).payload
        return parsedPayload
    } catch (err) {
        console.log('Ran into an error: '+ err);
    }
}

async function signIn (formData){
    try {
        const res = await axios.post(`${BASE_URL}/sign-in`, formData)
        const data = res.data
        const token = data.token

        localStorage.setItem('token', token)

        const encodedPayload = token.split('.')[1]
        const decodedPayload = atob(encodedPayload)
        const parsedPayload = (JSON.parse(decodedPayload)).payload
        return parsedPayload
    } catch (err) {
        console.log('Ran into an error: '+ err);
    }
}

export {
    signUp,
    signIn,
}