import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { UserContext } from '../UserContext';
import defaultProfileImage from '../../Assests/defaultprofile.jpg'
// import profileAvatar from '../../assets/avatar.png'; // add avatar image

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

  const [navOpen, setNavOpen] = useState(false)

  const { user, logout } = useContext(UserContext)

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

  const closeNavBar = () => {
    setNavOpen(false)
  }

  const goToProfile = () => {
    setShowSidebar(false);
    setNavOpen(false)
    if (user.role === 'USER') {
      navigate('/page/jobseeker-profile')
    } else if (user.role === 'RECRUITER') {
      navigate('/page/recruiter-profile')
    } else {
      navigate('/page/admin-profile')
    }
  };

  const closePage = () => {
    logout()
    setShowSidebar(false)
    setNavOpen(false)
  }

  const appliedJobs = () => {
    setShowSidebar(false)
    navigate('/job-seeker-applied-jobs')
  }

  const savedJobs = () => {
    setShowSidebar(false)
    navigate('/job-seeker-saved-jobs')
  }

  document.querySelector('Link').addEventListener('click', () => {
    setNavOpen(false)
  })

  return (
    <>
      <div className='container-fluid navbar shadow position-fixed'>
        <div className='navbar-container'>
          <Link to={'/'} className='text-primary text-decoration-none fs-2'>JobMatch</Link>

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
              <li><Link to="/page/jobpage" onClick={closeNavBar}>Jobs</Link></li>
              <li><Link to="/page/companies" onClick={closeNavBar}>Companies</Link></li>
              <li><Link to="/page/services" onClick={closeNavBar}>Services</Link></li>
            </ul>

            <div className='nav-options d-flex gap-3'>
              {
                !user && <Link to="/page/login" onClick={closeNavBar} className='navbar-login'>
                  Login
                  <svg class="snake-border" viewBox="0 0 200 60" preserveAspectRatio="none">

                    <rect class="solid-border" x="2" y="2" width="196" height="56" rx="12" ry="12" />

                    <rect class="snake-line" x="2" y="2" width="196" height="56" rx="13" ry="13" />
                  </svg>
                </Link>
              }

              {
                (!user || !user.role === "USER") && (
                  <div className="employee-dropdown text-decoration-none text-muted">
                    For employees <i className='fa fa-caret-down'></i>

                    <div className='employee-buttons'>
                      <ul>
                        {
                          user && (
                            <li>
                              <Link to={'/page/jobpostform'} onClick={closeNavBar} className='employee-btn'>Post a job</Link>
                            </li>
                          )
                        }
                        {
                          !user && (
                            <li>
                              <Link to={'/page/recruiterform'} className='employee-btn' onClick={closeNavBar}>Employer Registration</Link>
                            </li>
                          )
                        }
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
              <li className='list-group-item border-0 ps-0' onClick={() => {
                navigate('/profile-performance');
                setShowSidebar(false);
                setNavOpen(false)
              }}>
                <button className='border-0 bg-transparent'>
                  <i className='fa fa-bar-chart me-2'></i> Profile Performance
                </button>
              </li>
              {
                (user && user.role === 'USER') &&
                <>
                  <li className='list-group-item border-0 ps-0' onClick={appliedJobs}>
                    <button className='border-0 bg-transparent'>
                      <i className='fa-solid fa-briefcase me-2'></i> Applied Jobs
                    </button>
                  </li>

                  <li className='list-group-item border-0 ps-0' onClick={savedJobs}>
                    <button className='border-0 bg-transparent'>
                      <i className='fa-solid fa-bookmark me-2'></i> SavedJobs Jobs
                    </button>
                  </li>
                </>
              }
              <li className='list-group-item border-0 ps-0'
                onClick={() => {
                  setShowSidebar(false);
                  setNavOpen(false);
                  navigate('/setting-page')
                }}
              >
                <button className='border-0 bg-transparent'>
                  <i className='fa fa-cog me-2'></i> Settings
                </button>
              </li>
              <li className='list-group-item border-0 ps-0 text-danger' onClick={closePage} style={{ cursor: 'pointer' }}>
                <button className='border-0 bg-transparent'>
                  <i className='fa fa-sign-out me-2'></i> Logout
                </button>
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
