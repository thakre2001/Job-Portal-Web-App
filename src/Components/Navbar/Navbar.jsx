import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    const location=useLocation()

    const isRegisterPage=location.pathname === '/page/register'
    return (
        <>
            <div className='container-fluid navbar position-fixed d-flex flex-nowrap justify-content-around'>
                <div className='left-navbar me-5'>
                    <img src="" alt="" />
                </div>
                <div className='middle-nav'>
                    <ul>
                        <li >
                            <a href={'/page/jobpage'}>Jobs</a>
                        </li>
                        <li>
                            <a href={'/page/companies'}>Companies</a>
                        </li>
                        <li>
                            <a href={'/page/jobpage'}>Services</a>
                        </li>
                    </ul>
                </div>
                <div className='right-nav'>
                    <ul>
                        <li className='rounded'>
                            <a href={'/page/login'} className='border fw-bold border-primary rounded-pill px-5 py-2 text-primary'>Login</a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Navbar
