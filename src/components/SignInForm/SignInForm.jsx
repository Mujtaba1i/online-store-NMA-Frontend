import { useContext, useState } from "react"
import { signIn } from "../../services/authService";
import { useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";

function SignInForm() {
    const navigate = useNavigate()
    const {setUser} = useContext(UserContext)

    const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

    const { username, password } = formData;
    
    function handleChange(event){
        setFormData({...formData,[event.target.name]:event.target.value})
        
    }
    
    async function handleSubmit (event){
        event.preventDefault()
        const response = await signIn(formData)
        if (response){
            setUser(response)
            navigate('/')
        }
        else{
            console.log('Ran into an error');
            setFormData({
                username: '',
                password: '',
            })
        }
        
    }

  return (
    <div>
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username: </label>
            <input name="username" id="username" type="text" onChange={handleChange} value={username}/><br /><br />
            
            <label htmlFor="password">password: </label>
            <input name="password" id="password" type="password" onChange={handleChange} value={password}/><br /><br />

            <button>Sign In</button><br /><br />
            <button onClick={() => navigate('/')}>Cancel</button>

        </form>
    </div>
  )
}

export default SignInForm