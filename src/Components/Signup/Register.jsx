import React, { useContext, useState } from 'react'
import * as YUP from 'yup'
import { Services } from '../../BackendAPIs/Services'
import { UserContext } from '../UserContext'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const {login}=useContext(UserContext);

    const navigate=useNavigate();

    const [formData,setFormData]=useState({
        name:null,
        email:null,
        mobile:null,
        password:null,
        workStatus:null
    })
    const [errors,setErrors]=useState({})
    const [selectedStatus,setSelectedStatus]=useState('')

    const [showPass,setShowPass]=useState(false)

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData({
            ...formData,[name]:value
        })
        setErrors({
            ...errors,[name]:undefined
        })
    }

    const selectWorkStatus=(status)=>{
        setSelectedStatus(status)        
        setFormData({...formData,workStatus:status})
    }

    const formValidations=YUP.object({
        name:YUP.string().required("Name is required"),
        email:YUP.string().email("Invalid email").required("Email is required"),
        mobile:YUP.string().matches(/^\d{10}$/, "Phone number must contain 10 digits")
        .required("Phone number is required"),
        password:YUP.string().required("Password is required"),
        workStatus:YUP.string().required("Choose any one")
    })

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            await formValidations.validate(formData,{abortEarly:false})
            const response=await Services.addUser(formData);
           
            if(response.status!==200){
                alert("Something Went wrong try again")
            }

            login(response.data)
            navigate('/page/jobpage')

            setFormData({
                name:'',
                email:'',
                mobile:'',
                workStatus:'',
                password:'',
            })
            
        } catch (error) {
            alert('Server problem')
            if(error?.inner){
                const newError={}
                error.inner.forEach((err)=>{
                    newError[err.path]=err.message
                })
                setErrors(newError)
            }
        }
    }

    return (
        <>
            <div className='register'>
                {/* <div className='left-side-structure'>
                    <div className="left-inner-structure"></div>
                </div>
                <div className='left-side-structure2'>
                    <div className="left-inner-structure"></div>
                </div> */}
                {/* <div className="register-form"> */}
                    {/* <div className='d-flex justify-content-between'>
                        <div>
                            <h2>Create your job profile here</h2>
                            <h4 className='text-secondary'>Search & apply to top jobs</h4>
                        </div>
                        <h2>Already Registered? <a href={'/page/login'}>Login</a> here</h2>
                    </div> */}
                    <p className='heading'>Create your job profile here</p>
                    <form action="">
                        <div className='input-field mt-md-5'>
                            <input 
                            type="text" 
                            name="name" 
                            id="" 
                            onChange={handleChange}
                            placeholder='Full name' 
                            />
                            <i className='fa fa-user'></i>
                        </div>
                        {errors.name && <div className='error-message'>{errors.name}</div>}
                        <div className='input-field mt-3'>
                            <input 
                            type="email" 
                            name="email" 
                            id=""
                            onChange={handleChange} 
                            placeholder='Email ID' 
                            />
                            <i className='fa fa-envelope'></i>
                            {errors.email && <div className='error-message'>{errors.email}</div>}
                        </div>
                        
                        <div className='input-field mt-3'>
                            <input 
                            type={`${showPass?'text':"password" }`}
                            name="password" 
                            id="" 
                            onChange={handleChange}
                            placeholder='Password' 
                            />
                            <i className='fa fa-lock' style={{cursor:'pointer'}} onClick={()=>setShowPass(!showPass)}></i>
                        </div>
                        {errors.password && <div className='error-message'>{errors.password}</div>}
                        <div className='input-field mt-3'>
                            <input 
                            type="text" 
                            name="mobile" 
                            id="" 
                            onChange={handleChange}
                            placeholder='Mobile number' 
                            />
                            <i className='fa fa-phone'></i>
                        </div>
                        {errors.mobile && <div className='error-message'>{errors.mobile}</div>}
                        <div className='mt-3 row d-flex justify-content-center'>
                            <p>Work Status<span>*</span></p>
                            <div className="col-md-5 col-6" onClick={()=>{selectWorkStatus("Experienced")}}>
                                <div className={`card p-3 ${selectedStatus==="Experienced" ? 'bg-success': 'bg-secondary'}`}>
                                    <h4>I'm Experienced</h4>
                                </div>
                            </div>
                            <div className="col-md-5 col-6" onClick={()=>{selectWorkStatus("Fresher")}}>
                                <div className={`card p-3 ${selectedStatus === "Fresher" ? 'bg-success': 'bg-secondary'}`}>
                                    <h4>I'm a Fresher</h4>
                                </div>
                            </div>
                        </div>
                        {errors.workStatus && <div className='text-danger'>{errors.workStatus}</div>}
                        <div className='mt-3'>
                            <button className='register-btn' onClick={handleSubmit}>Register now</button>
                        </div>
                    </form>
                </div>
            {/* </div> */}
        </>
    )
}

export default Register
