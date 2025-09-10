import React, { useContext } from 'react'
import { Services } from '../../BackendAPIs/Services'
import { UserContext } from '../UserContext'
import { useNavigate } from 'react-router-dom';

const JobPostStep5 = ({ formData, previousStep, setFormData }) => {

    const { token } = useContext(UserContext);
    const navigate=useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log(formData);
            console.log(token);
            
            
            const res = await Services.addJob(formData, token)
            if (res.status === 200) {
                console.log(formData);
                
                setFormData({
                    jobTitle: '',
                    jobDescription: '',
                    jobLocations: [],
                    employmentType: '',
                    jobCategory: '',
                    jobRole: '',
                    industryType: '',
                    workMode: '',
                    noOfOpenings: '',
                    shiftTime: '',
                    joiningDate: '',
                    applicationDeadline: '',
                    educationMin: '',
                    prefferedQualification: [],
                    experienceMin: '',
                    experienceMax: '',
                    skills: [],
                    languageKnown: [],
                    noticePeriod: '',
                    certificationRequired: [],
                    applicationMode: 'internal',
                    applicationLink: '',
                    requiredResumeUpload: true,
                    requiredCoverLetter: false,
                    salaryMin: '',
                    salaryMax: '',
                    salaryNegotiable: false,
                    bonuses: '',
                    perks: []
                })
                navigate('/page/jobpage')
            }
        } catch (error) {

        }
    }
    return (
        <div>
            <h2 className="mb-4">Review & Publish</h2>

            <div className="card p-4 shadow-sm rounded fs-5">
                {/* STEP 1: Job Details */}
                <h4 className="text-primary mb-3">Job Details</h4>
                <div className="row">
                    <div className="col-md-6">
                        <p><strong>Job Title:</strong> {formData.jobTitle}</p>
                        <p><strong>Job Description:</strong> {formData.jobDescription}</p>
                        <p><strong>Employment Type:</strong> {formData.employmentType}</p>
                        <p><strong>Job Category:</strong> {formData.jobCategory}</p>
                        <p><strong>Job Role:</strong> {formData.jobRole}</p>
                        <p><strong>Industry Type:</strong> {formData.industryType}</p>
                    </div>
                    <div className="col-md-6">
                        <p><strong>Work Mode:</strong> {formData.workMode}</p>
                        <p><strong>Job Location(s):</strong> {formData.jobLocations}</p>
                        <p><strong>Number of Openings:</strong> {formData.noOfOpenings}</p>
                        <p><strong>Shift Type:</strong> {formData.shiftTime}</p>
                        <p><strong>Joining Date:</strong> {formData.joiningDate}</p>
                        <p><strong>Application Deadline:</strong> {formData.applicationDeadline}</p>
                    </div>
                </div>

                {/* STEP 2: Candidate Preferences */}
                <h4 className="text-primary mt-4 mb-3">Candidate Preferences</h4>
                <div className="row">
                    <div className="col-md-6">
                        <p><strong>Minimum Education:</strong> {formData.educationMin}</p>
                        <p><strong>Preferred Qualifications:</strong> {formData.preferredQualification?.join(', ')}</p>
                        <p><strong>Experience Required:</strong> {formData.experienceMin} – {formData.experienceMax} years</p>
                        <p><strong>Skills Required:</strong> {formData.skills?.join(', ')}</p>
                    </div>
                    <div className="col-md-6">
                        <p><strong>Languages Known:</strong> {formData.languageKnown?.join(', ')}</p>
                        <p><strong>Notice Period:</strong> {formData.noticePeriod}</p>
                        <p><strong>Certifications Required:</strong> {formData.certificationRequired}</p>
                        <p><strong>Gender Preference:</strong> {formData.genderPreference}</p>
                        <p><strong>Age Range:</strong> {formData.ageMin} – {formData.ageMax}</p>
                    </div>
                </div>

                {/* STEP 4: Contact & Application Settings */}
                <h4 className="text-primary mt-4 mb-3">Contact & Application Settings</h4>
                <div className="row">
                    <div className="col-md-6">
                        <p><strong>Application Mode:</strong> {formData.applicationMode}</p>
                        {formData.applicationMode === 'external' && (
                            <p><strong>Application Link:</strong> {formData.applicationLink}</p>
                        )}
                        <p><strong>Resume Required:</strong> {formData.requiredResumeUpload ? 'Yes' : 'No'}</p>
                        <p><strong>Cover Letter Required:</strong> {formData.requiredCoverLetter ? 'Yes' : 'No'}</p>
                    </div>
                </div>

                {/* STEP 5: Salary & Benefits */}
                <h4 className="text-primary mt-4 mb-3">Salary & Benefits</h4>
                <div className="row">
                    <div className="col-md-6">
                        <p><strong>Salary Range:</strong> ₹{formData.salaryMin} – ₹{formData.salaryMax} per year</p>
                        <p><strong>Salary Negotiable:</strong> {formData.salaryNegotiable ? 'Yes' : 'No'}</p>
                    </div>
                    <div className="col-md-6">
                        <p><strong>Bonuses/Incentives:</strong> {formData.bonuses}</p>
                        <p><strong>Perks & Benefits:</strong> {formData.perks}</p>
                    </div>
                </div>
            </div>

            <div className='d-flex justify-content-between mt-4'>
                <button className='btn btn-info py-2 px-5' onClick={previousStep}>Previous</button>
                <button className='btn btn-lg btn-success' onClick={handleSubmit}>Submit Application</button>
            </div>
        </div>
    )
}

export default JobPostStep5
