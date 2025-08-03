import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { UserContext } from '../UserContext';
import { Services } from '../../BackendAPIs/Services';
import defaultProfileImage from '../../Assests/defaultprofile.jpg'
// import profileAvatar from '../../assets/avatar.png'; // add avatar image

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

  const [navOpen, setNavOpen] = useState(false)

  const { user, logout, token, setUser } = useContext(UserContext)

  const toggleNav = () => {
    setNavOpen(!navOpen)
  }

  useEffect(() => {
    const handleSize = () => {
      if (window.innerWidth > 700 && navOpen) {
        setNavOpen(false)
      }
    }
    window.addEventListener('resize', handleSize);
    return () => window.removeEventListener('resize', handleSize)
  }, [navOpen])

  // useEffect(()=>{
  //   try {
  //     const response=Services.getUserProfile(token)
  //     const updatedUser=response.json();
  //     setUser(updatedUser)
  //   } catch (error) {

  //   }
  // },[])

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const goToProfile = () => {
    setShowSidebar(false);
    navigate('/page/profile');
  };

  const closePage = () => {
    logout()
    setShowSidebar(false)
  }

  return (
    <>
      <div className='container-fluid navbar shadow position-fixed'>
        <div className='navbar-container'>
          <h4 className='text-primary fs-2'>JobMatch</h4>

          <button
            className="navbar-toggler"
            type='button'
            aria-label='Toggle navigation'
            onClick={toggleNav}
          >
            <span className='navbar-toggler-icon'></span>
          </button>

          <div className={`navbar-links ${navOpen ? 'show' : ''}`}>
            <ul className={`nav-list d-flex`}>
              <li><Link to="/page/jobpage">Jobs</Link></li>
              <li><Link to="/page/companies">Companies</Link></li>
              <li><Link to="/page/services">Services</Link></li>
            </ul>

            <div className='d-flex align-items-center me-4 gap-3'>
              {
                !user && <Link to="/page/login" className='btn btn-outline-primary fs-4 rounded-pill px-4'>Login</Link>
              }

              {
                !user && (
                  <div className="employee-dropdown text-decoration-none text-muted">
                    For employees <i className='fa fa-caret-down'></i>

                    <div className='employee-buttons'>
                      <ul>
                        <li>
                          <Link to={'/page/jobpostform'} className='employee-btn'>Post a job</Link>
                        </li>
                        <li>
                          <Link className='employee-btn'>Employer login</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                )
              }

              {
                user &&
                <img
                  src={user?.profilePhoto ? `data:image/jpeg;base64,${user?.profilePhoto}` : defaultProfileImage}
                  alt="Profile"
                  width={40}
                  height={40}
                  className='rounded-circle cursor-pointer'
                  onClick={toggleSidebar}
                />
              }
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className={`profile-sidebar ${showSidebar ? 'show' : ''}`}>
          <div className='sidebar-header d-flex justify-content-between align-items-center px-3 py-2 border-bottom'>
            <h6 className='m-0'>My Account</h6>
            <button className='btn-close' onClick={toggleSidebar}></button>
          </div>

          <div className='sidebar-body text-center px-3 py-4'>
            <img src={user?.profilePhoto ? `data:image/jpeg;base64,${user?.profilePhoto}` : defaultProfileImage}
              alt="User" className='rounded-circle mb-2' width={80} />
            <h5 className='mb-1'>{user?.name}</h5>
            <p className='text-muted'>{user?.role}</p>

            <button className='btn btn-primary w-100 my-3' onClick={goToProfile}>
              View & Edit Profile
            </button>

            <ul className='list-group text-start'>
              <li className='list-group-item border-0 ps-0'>
                <i className='fa fa-bar-chart me-2'></i> Profile Performance
              </li>
              <li className='list-group-item border-0 ps-0'>
                <i className='fa fa-cog me-2'></i> Settings
              </li>
              <li className='list-group-item border-0 ps-0 text-danger' onClick={closePage} style={{ cursor: 'pointer' }}>
                <i className='fa fa-sign-out me-2'></i> Logout
              </li>
            </ul>
          </div>
        </div>
      </div>
      {
        navOpen && window.innerWidth <= 700 && (
          <div className='blur-overlay' onClick={() => setNavOpen(false)}></div>
        )
      }
    </>
  );
};

export default Navbar;
