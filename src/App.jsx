import NavBar from "./components/NavBar/NavBar"
import SignUpForm from "./components/SignUpForm/SignUpForm"
import Homepage from "./components/Homepage/Homepage"
import { Route,Routes } from "react-router"
import { UserContext } from "./contexts/UserContext"
import { useContext } from 'react'
import SignInForm from "./components/SignInForm/SignInForm"

function App() {

  const {user} = useContext(UserContext)

  return (
    <>
    <div>
      <NavBar/> 
      <h1>MAMAMIA!! {user ? ', '+user.username : ''}</h1> 
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/Sign-up" element={<SignUpForm/>}/>
        <Route path="/Sign-in" element={<SignInForm/>}/>
      </Routes>
    </div>
    </>
  )
}

export default App