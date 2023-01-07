import './register.css'
import { Link, useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import axios from 'axios'

export default function Register() {
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const confirmPassword = useRef()

    const navigate = useNavigate()

    const handleClick = async (event) => {
        confirmPassword.current.setCustomValidity("") // clear the custom error message
        event.preventDefault()
        if (confirmPassword.current.value !== password.current.value) {
            confirmPassword.current.setCustomValidity("Passwords don't match")
        } else {
            confirmPassword.current.setCustomValidity("") // clear the custom error message
            const newUser = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }
            try {
                await axios.post('http://localhost:4000/api/auth/register', newUser)
                navigate('/login')
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Sum1tbook</h3>
                    <span className="loginDesc">Simply put, superior to Facebook. </span>
                </div>
                <div className="loginRight">
                    <form className="registerBox" onSubmit={handleClick}>
                        <input placeholder="Username" className="loginInput" ref={username} required />
                        <input placeholder="Email" className="loginInput" ref={email} type="email" required />
                        <input placeholder="Password" className="loginInput" ref={password} type="password" minLength="5" pattern=".{5,}" required />
                        <input placeholder="Confirm Password" className="loginInput" ref={confirmPassword} minLength="5" pattern=".{5,}" type="password" required />
                        <button className="loginButton" type='submit'>Signup</button>
                        <Link to="/login">
                            <button className="loginRegisterButton">Already Have an Account?</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
