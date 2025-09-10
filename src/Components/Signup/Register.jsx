import React, { useContext, useState } from 'react'
import * as YUP from 'yup'
import { Services } from '../../BackendAPIs/Services'
import { UserContext } from '../UserContext'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const { login } = useContext(UserContext);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: null,
        email: null,
        mobile: null,
        password: null,
        workStatus: null,
        confirmPassword: null,
    })
    const [errors, setErrors] = useState({})
    const [showPass, setShowPass] = useState(false)
    const [showConfirmPass, setShowConfirmPass] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        })
        setErrors({
            ...errors, [name]: undefined
        })
    }

    const formValidations = YUP.object({
        name: YUP.string().required("Name is required"),
        email: YUP.string().email("Invalid email").required("Email is required"),
        mobile: YUP.string().matches(/^\d{10}$/, "Phone number must contain 10 digits")
            .required("Phone number is required"),
        password: YUP.string().required("Password is required"),
        confirmPassword: YUP.string()
            .oneOf([YUP.ref("password"), null], "Passwords must match")
            .required("Confirm password is required"),
        workStatus: YUP.string().required("Choose any one")
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await formValidations.validate(formData, { abortEarly: false })
            
            const { confirmPassword, ...sendData } = formData  

            const response = await Services.addUser(sendData);

            if (response.status !== 200) {
                alert("Something Went wrong try again")
            }

            login(response.data)
            navigate('/page/jobpage')

            setFormData({
                name: '',
                email: '',
                mobile: '',
                workStatus: '',
                password: '',
                confirmPassword: ''
            })

        } catch (error) {
            if (error?.inner) {
                const newError = {}
                error.inner.forEach((err) => {
                    newError[err.path] = err.message
                })
                setErrors(newError)
            }
        }
    }

    return (
        <>
            <div className='register'>
                <p className='heading'>Create your job profile here</p>
                <form action="">
                    <div className='input-field mt-md-5'>
                        <input
                            type="text"
                            name="name"
                            onChange={handleChange}
                            placeholder='Full Name'
                            className={`${errors.name ? 'has-tooltip' : ''}`}
                        />
                        <i className='fa fa-user'></i>
                        {errors.name && <div className='error-message'>{errors.name}</div>}
                    </div>

                    <div className='input-field mt-3'>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            placeholder='Email ID'
                            className={`${errors.email ? 'has-tooltip' : ''}`}
                        />
                        <i className='fa fa-envelope'></i>
                        {errors.email && <div className='error-message'>{errors.email}</div>}
                    </div>

                    <div className='input-field mt-3'>
                        <input
                            type={`${showPass ? 'text' : "password"}`}
                            name="password"
                            onChange={handleChange}
                            placeholder='Password'
                            className={`${errors.password ? 'has-tooltip' : ''}`}
                        />
                        <i className='fa fa-lock' style={{ cursor: 'pointer' }} onClick={() => setShowPass(!showPass)}></i>
                        {errors.password && <div className='error-message'>{errors.password}</div>}
                    </div>

                    <div className='input-field mt-3'>
                        <input
                            type={`${showConfirmPass ? 'text' : "password"}`}
                            name="confirmPassword"
                            onChange={handleChange}
                            placeholder='Confirm Password'
                            className={`${errors.confirmPassword ? 'has-tooltip' : ''}`}
                        />
                        <i className='fa fa-lock' style={{ cursor: 'pointer' }} onClick={() => setShowConfirmPass(!showConfirmPass)}></i>
                        {errors.confirmPassword && <div className='error-message'>{errors.confirmPassword}</div>}
                    </div>

                    <div className='input-field mt-3'>
                        <input
                            type="text"
                            name="mobile"
                            onChange={handleChange}
                            placeholder='Mobile number'
                            className={`${errors.mobile ? 'has-tooltip' : ''}`}
                        />
                        <i className='fa fa-phone'></i>
                        {errors.mobile && <div className='error-message'>{errors.mobile}</div>}
                    </div>

                    <div className='input-field mt-3 '>
                        <select name="workStatus" onChange={handleChange} className={`${errors.workStatus ? 'has-tooltip' : ''}`}>
                            <option value="" disabled selected >Select work status</option>
                            <option value="Fresher">I'm a Fresher</option>
                            <option value="Experienced">I'm Experienced</option>
                        </select>
                        {errors.workStatus && <div className='error-message'>{errors.workStatus}</div>}
                    </div>

                    <div className='mt-3'>
                        <button className='register-btn' onClick={handleSubmit}>Register now</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register
