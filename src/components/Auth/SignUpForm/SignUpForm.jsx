import { useContext, useState } from "react"
import { signUp } from "../../../services/authService";
import { useNavigate, Link } from "react-router";
import { UserContext } from "../../../contexts/UserContext";
import styles from './SignUpForm.module.css';

function SignUpForm() {
    const navigate = useNavigate()
    const {setUser} = useContext(UserContext)

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        wantToBeSeller: false
    })

    const { username, password, confirmPassword, wantToBeSeller } = formData;
    
    function handleChange(event){
        const newValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setFormData({...formData,[event.target.name]:newValue})
    }
    
    async function handleSubmit (event){
        event.preventDefault()
        const { confirmPassword: _, ...submitData } = formData;
        const response = await signUp(submitData)
        if (response){
            setUser(response)
            navigate('/')
        }
        else if (response === null){
            navigate('/')   
        }
        else{
            console.log('Ran into an error');
            setFormData({
                username: '',
                password: '',
                confirmPassword: '',
                wantToBeSeller: false
            })
        }
    }

    const isFormInvalid = () => !(username && password && password === confirmPassword)

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <h1 className={styles.title}>Create Account</h1>
                
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
                            placeholder="Choose a username"
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
                            placeholder="Create a password"
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="confirm-password" className={styles.label}>
                            Confirm Password
                        </label>
                        <input 
                            name="confirmPassword" 
                            id="confirm-password" 
                            type="password" 
                            onChange={handleChange} 
                            value={confirmPassword}
                            placeholder="Confirm your password"
                            className={styles.input}
                            required
                        />
                    </div>
                    
                    <div className={styles.checkboxGroup}>
                        <input 
                            name="wantToBeSeller" 
                            id="wantToBeSeller" 
                            type="checkbox" 
                            onChange={handleChange} 
                            checked={wantToBeSeller}
                            className={styles.checkbox}
                        />
                        <label htmlFor="wantToBeSeller" className={styles.checkboxLabel}>
                            I want to sign up as a store
                        </label>
                    </div>
                    
                    <div className={styles.buttonGroup}>
                        <button 
                            type="submit" 
                            disabled={isFormInvalid()} 
                            className={styles.submitButton}
                        >
                            Sign Up
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
                        Already have an account?{' '}
                        <Link to="/sign-in" className={styles.footerLink}>
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUpForm