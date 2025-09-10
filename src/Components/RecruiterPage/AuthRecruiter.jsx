import React from 'react'
import RecruiterLogin from './RecruiterLogin'
import RecruiterRegistration from './RecruiterRegistration'
import './AuthRecruiter.css'

const AuthRecruiter = () => {
  return (
    <div className='AuthRecruiter' style={{paddingTop:80}}>
      <div className="form-container" >
        <div className="form-field login">
            <RecruiterLogin/>
        </div>
        <div className="form-field register">
            <RecruiterRegistration/>
        </div>
      </div>
    </div>
  )
}

export default AuthRecruiter
