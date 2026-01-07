import { createContext, useState } from "react"

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
    const handleAddToCart = (cartItem) => {
            
            const userCart = user.cart
            console.log(userCart);
            console.log(cartItem)
            // take the cart item and send that to the back end
            // need an service that adds the item to the cart
            // once we get the success we can update the cart state
            // call setcart(response.data.cart)
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
