import { useContext, useState } from "react"
import { signIn } from "../../../services/authService";
import { useNavigate, Navigate, Link } from "react-router";
import { UserContext } from "../../../contexts/UserContext";
import styles from './SignInForm.module.css';

function SignInForm() {
    const navigate = useNavigate()
    const {setUser} = useContext(UserContext)
    const { user } = useContext(UserContext)

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

    if ( user?.role === 'admin' || user?.role === 'seller' || user?.role === 'customer') {
        return <Navigate to='/'/>
    }

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <h1 className={styles.title}>Welcome Back</h1>
                
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="username" className={styles.label}>
                            Username
                        </label>
                        <input 
                            name="username" 
                            id="username" 
                            type="text" 
                            onChange={handleChange} 
                            value={username}
                            placeholder="Enter your username"
                            className={styles.input}
                            required
                        />
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.label}>
                            Password
                        </label>
                        <input 
                            name="password" 
                            id="password" 
                            type="password" 
                            onChange={handleChange} 
                            value={password}
                            placeholder="Enter your password"
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.submitButton}>
                            Sign In
                        </button>
                        <button 
                            type="button"
                            onClick={() => navigate('/')} 
                            className={styles.cancelButton}
                        >
                            Cancel
                        </button>
                    </div>
                </form>

                <div className={styles.footer}>
                    <p className={styles.footerText}>
                        Don't have an account?{' '}
                        <Link to="/sign-up" className={styles.footerLink}>
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignInForm