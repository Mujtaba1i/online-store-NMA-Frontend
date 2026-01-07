import { createContext, useState } from "react"
import * as userService from "../services/userService"

const UserContext = createContext()

function getUserFromToken (){
    const token = localStorage.getItem('token')
    if (!token) return null

    const encodedPayload = token.split('.')[1]
    const decodedPayload = atob(encodedPayload)
    const parsedPayload = (JSON.parse(decodedPayload)).payload
    return parsedPayload
    
}

function UserProvider ({children}){
    const [user,setUser] = useState(getUserFromToken())
    const handleAddToCart = async (cartItem) => {
            const userCart = user.cart
            
            const response = await userService.updateCustomerCart(user._id,cartItem)
            if (response.data === 'ADDED TO CART'){
                const updatedUserData = await userService.oneCustomer(user._id)
                setUser({...user,cart:updatedUserData.data.oneUser.cart, cartTotal:updatedUserData.data.oneUser.cartTotal })
            }
            else{
                console.log(Failed)
            }
        }
    const value = {
        user,
        setUser,
        handleAddToCart
    }
    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )

}

export { 
    UserProvider,
    UserContext,
}
