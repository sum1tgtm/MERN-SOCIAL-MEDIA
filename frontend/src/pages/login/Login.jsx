import './login.css'
import { Link } from 'react-router-dom'
import { useContext, useRef } from 'react'
import { loginCall } from '../../apiCalls'
import { AuthContext } from '../../context/AuthContext'
import { CircularProgress } from '@mui/material'

export default function Login() {
    const email = useRef()
    const password = useRef()

    const { user, isFetching, error, dispatch } = useContext(AuthContext)

    const handleClick = (event) => {
        event.preventDefault()
        // console.log(email.current.value)
        loginCall({ email: email.current.value, password: password.current.value }, dispatch)
    }
    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Sum1tbook</h3>
                    <span className="loginDesc">Simply put, superior to Facebook. </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input type="email" placeholder="Email" className="loginInput" ref={email} required />
                        <input type="password" placeholder="Password" minLength="5" className="loginInput" ref={password} required />
                        <button className="loginButton" type='submit'  >
                            {isFetching ? <CircularProgress color="inherit" size="20px" /> : "Login"}
                        </button>
                        <span className="loginForgot">Forgot Password?</span>
                        <Link to="/register">
                            <button className="loginRegisterButton" disabled={isFetching}>
                                {isFetching ? <CircularProgress color="inherit" size="20px" /> : "Create a New Account"}
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
