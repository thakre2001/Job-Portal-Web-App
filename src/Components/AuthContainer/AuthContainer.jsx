import React, { useState } from 'react'
import Login from '../Login/Login'
import Register from '../Signup/Register'
// import { Link } from 'react-router-dom'
import loginImg from '../../Assests/LoginImg/jobperson.jpg'
import './AuthContainer.css'

const AuthContainer = () => {

    const [isActive,setIsActive]=useState(false)

    return (
        <div className='AuthContainer'>
            <div className={`form-container ${isActive?'active':''}`}>
                {/* <div className='left-section col-5'>
                    <div>
                        
                </div> */}
                <div className="form-box login">
                    <Login />
                </div>
                <div className="form-box signup">
                    <Register />
                </div>
                <div className="toggle-box">
                    <div className="toggle-panel toggle-left">
                        <h2 className='fw-bolder fs-2 mb-4'>Join JobMatch Today!</h2>
                        <p>Discover thousands of career opportunities.</p>
                        <p>Trusted by top recruiters.</p>
                        <h4>Easy sign-up and application process.</h4>
                        <button onClick={()=>{setIsActive(true)}} className='register-btn'>
                            Create Your Account
                        </button>
                        <img src={loginImg} alt="Job search illustration" />
                    </div>

                    <div className="toggle-panel toggle-right">
                        <p>Welcome To JobMatch</p>
                        <p>Already Registered?</p>
                        <button onClick={()=>{setIsActive(false)}} className='login-btn'>Login</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AuthContainer
