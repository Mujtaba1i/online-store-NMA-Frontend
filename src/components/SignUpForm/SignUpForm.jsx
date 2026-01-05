import { useContext, useState } from "react"
import { signUp } from "../../services/authService";
import { useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";

function SignUpForm() {
    const navigate = useNavigate()
    const {setUser} = useContext(UserContext)

    const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  })

    const { username, password, confirmPassword } = formData;
    
    function handleChange(event){
        setFormData({...formData,[event.target.name]:event.target.value})
        
    }
    
    async function handleSubmit (event){
        event.preventDefault()
        delete formData.confirmPassword
        const response = await signUp(formData)
        if (response){
            setUser(response)
            navigate('/')
        }
        else{
            console.log('Ran into an error');
            setFormData({
                username: '',
                password: '',
                confirmPassword: '',
            })
        }
        
    }

    const isFormInvalid = () => !(username && password && password === confirmPassword)

  return (
    <div>
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username: </label>
            <input name="username" id="username" type="text" onChange={handleChange} value={username}/><br /><br />
            
            <label htmlFor="password">password: </label>
            <input name="password" id="password" type="password" onChange={handleChange} value={password}/><br /><br />

            <label htmlFor="confirm-password">confirm password: </label>
            <input name="confirmPassword" id="confirm-password" type="password" onChange={handleChange} value={confirmPassword}/><br /><br />
            
            <button disabled={isFormInvalid()}>Sign Up</button><br /><br />
            <button onClick={() => navigate('/')}>Cancel</button>

        </form>
    </div>
  )
}

export default SignUpForm