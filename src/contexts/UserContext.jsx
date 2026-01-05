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
    const value = {
        user,
        setUser
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
