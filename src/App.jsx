import NavBar from "./components/NavBar/NavBar"
import SignUpForm from "./components/SignUpForm/SignUpForm"
import { Route,Routes } from "react-router"
import { UserContext } from "./contexts/UserContext"
import { useContext,useState, useEffect  } from 'react'
import SignInForm from "./components/SignInForm/SignInForm"
import ProductList from "./components/productList/productList"
import Admin from "./components/Admin/Admin"

function App() {
  const {user} = useContext(UserContext)

  return (
    <>
    <div>
      <NavBar/> 
      <h1>MAMAMIA!! {user ? ', '+user.username : ''}</h1> 
      <Routes>
        <Route path="/" element={<ProductList/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/Sign-up" element={<SignUpForm/>}/>
        <Route path="/Sign-in" element={<SignInForm/>}/>
        <Route path="/products/:id" element/>
      </Routes>
    </div>
    </>
  )
}

export default App