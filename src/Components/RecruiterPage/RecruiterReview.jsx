import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Services } from '../../BackendAPIs/Services';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';

const RecruiterReview = ({ formData, previousStep,setFormData }) => {
  const {login}=useContext(UserContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const navigate=useNavigate()

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const res=await Services.recruiterRegistration(formData);
      if(res.status !==200){
        alert("Something Went wrong try again")
        return;
      }
      login(res.data)
      setIsSubmitting(false);
      setSubmitMessage('✅ Registration successful!');
      setFormData({
        companyName: '',
        companyWebsite: '',
        industryType: '',
        companySize: '',
        companyDescription: '',
        companyLogo: null,
        recruiterName: '',
        recruiterEmail: '',
        recruiterPhone: '',
        recruiterDesignation: '',
        alternateContact: '',
        country: '',
        state: '',
        city: '',
        streetAddress: '',
        postalCode: '',
        password: '',
        confirmPassword: '',
        gstNumber: '',
        panNumber: '',
        linkedinProfile: '',
        hiringPlan: '', 
    })
      navigate('/page/jobpage')
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      setSubmitMessage('❌ Submission failed. Please try again.');
    }
  };

  const renderField = (label, value) => (
    <div className="col-md-6 mb-3">
      <label className="form-label fw-bold">{label}</label>
      <div className="form-control bg-light">{value || 'N/A'}</div>
    </div>
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🔍 Review Your Information</h2>

      {/* Section 1: Company Information */}
      <h5 className="text-primary">🏢 Company Information</h5>
      <div className="row">
        {renderField('Company Name', formData.companyName)}
        {renderField('Website', formData.companyWebsite)}
        {renderField('Industry Type', formData.industryType)}
        {renderField('Company Size', formData.companySize)}
        {renderField('Description', formData.companyDescription)}
        {renderField('Company Logo', formData.companyLogo?.name || 'No file selected')}
      </div>

      {/* Section 2: Recruiter Details */}
      <h5 className="text-primary mt-4">👤 Recruiter / Contact Details</h5>
      <div className="row">
        {renderField('Full Name', formData.recruiterName)}
        {renderField('Email', formData.recruiterEmail)}
        {renderField('Phone Number', formData.recruiterPhone)}
        {renderField('Designation', formData.recruiterDesignation)}
        {renderField('Alternate Contact', formData.alternateContact)}
      </div>

      {/* Section 3: Office Address */}
      <h5 className="text-primary mt-4">📍 Office Address</h5>
      <div className="row">
        {renderField('Country', formData.country)}
        {renderField('State', formData.state)}
        {renderField('City', formData.city)}
        {renderField('Street Address', formData.streetAddress)}
        {renderField('Postal Code', formData.postalCode)}
      </div>

      {/* Section 4: Account Credentials */}
      <h5 className="text-primary mt-4">🔐 Account Credentials</h5>
      <div className="row">
        {renderField('Login Email', formData.loginEmail)}
        {renderField('Password', '*******')}
        {renderField('Confirm Password', '*******')}
      </div>

      {/* Section 5: Optional Fields */}
      <h5 className="text-primary mt-4">⚙️ Optional Fields</h5>
      <div className="row">
        {renderField('GST Number', formData.gstNumber)}
        {renderField('PAN Number', formData.panNumber)}
        {renderField('LinkedIn Profile', formData.linkedinProfile)}
        {renderField('Hiring Plan', formData.hiringPlan)}
      </div>

      {/* Buttons */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <button className="btn btn-secondary" onClick={previousStep} disabled={isSubmitting}>
          ⬅ Back
        </button>
        <button className="btn btn-primary" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Registration'}
        </button>
      </div>

      {submitMessage && (
        <div className="mt-3 text-center fw-bold" style={{ color: submitMessage.includes('✅') ? 'green' : 'red' }}>
          {submitMessage}
        </div>
      )}
    </div>
  );
};

export default RecruiterReview;
