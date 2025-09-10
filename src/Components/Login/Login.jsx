import React, { useContext, useState } from 'react'
import './Login.css'
// import googleLogo from '../../Assests/LoginImg/google-logo.png'
import { useNavigate } from 'react-router-dom'
import * as YUP from 'yup'
import { Services } from '../../BackendAPIs/Services'
import { UserContext } from '../UserContext'
import { toast } from 'react-toastify'

const Login = ({ setToken }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const [showPass, setShowPass] = useState(false)

    const { login } = useContext(UserContext)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors((prevError) => ({ ...prevError, [name]: undefined }));
    };

    const formvalidations = YUP.object({
        email: YUP.string().email('Invalid Email').required('Email is required'),
        password: YUP.string().required('Password is required'),
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            await formvalidations.validate(formData, { abortEarly: false });
            const response = await Services.loginUser(formData);
            if (response.status !== 200) {
                alert('Invalid username or password')
                navigate('/page/login');
            }
            console.log(response);
            toast.success("Login successful 🎉")
            localStorage.setItem("token", response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.user))
            login(response.data)
            navigate('/page/jobpage');

            setFormData({
                email: '',
                password: ''
            })

        } catch (error) {
            // alert('server problem')
            if (error?.inner) {
                const newError = {};
                error.inner.forEach((err) => {
                    newError[err.path] = err.message;
                });
                setErrors(newError);
            }

            if (error.response) {
                const backendMessage =
                    error.response.data?.message ||   // if JSON with message
                    error.response.data ||            // if plain string
                    "Something went wrong!";

                toast.error(backendMessage);
            } else {
                toast.error("Network error! Please try again.");
            }
        }
    };

    return (
        <>
            <div className='container-fluid login'>
                <h2 className='text-center'>Login to JobMatch</h2>
                <form className='gutter mt-5'>
                    <div className='input-field mb-4'>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            placeholder='username'
                            className={`${errors.email ? 'has-tooltip' : ''}`}
                        />
                        <i className='fa fa-envelope'></i>
                        {errors.email && <div className='error-message'>{errors.email}</div>}
                    </div>

                    <div className={`input-field mb-4}`}>
                        <input
                            type={`${showPass ? 'text' : "password"}`}
                            name='password'
                            onChange={handleChange}
                            placeholder='password'
                            className={`${errors.email ? 'has-tooltip' : ''}`}
                        />
                        <i className={`fa fa-${showPass ? "unlock" : "lock"}`} style={{ cursor: 'pointer' }} onClick={() => setShowPass(!showPass)}></i>
                        {errors.password && <div className='error-message'>{errors.password}</div>}
                    </div>

                    <button
                        onClick={() => navigate('/forgot-password')}
                        className="forgot-btn"
                    >
                        Forgot Password?
                    </button>

                    <div className='mb-4'>
                        <button className='login-btn' onClick={handleSubmit}>Login</button>
                    </div>

                    <div className='text-center mb-3'>
                        <p className='mb-1'>Or</p>
                        <div className='google-login'>
                            <img src='//static.naukimg.com/s/5/105/i/ic-google.png' alt="Google login" />
                            <span>Sign in with Google</span>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login
