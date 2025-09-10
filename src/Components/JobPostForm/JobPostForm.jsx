import React, { useState } from 'react'
import Step1 from './JobPostStep1'
import Step2 from './JobPostStep2'
import Step3 from './JobPostStep3'
import Step4 from './JobPostStep4'
import Step5 from './JobPostStep5'
import './JobPostForm.css'

const JobPostForm = () => {
    const [step, setStep] = useState(1)
    const steps = ['Job Details', 'Candidate Preferences', 'Contact & Application Settings', 'Salary & Benefits', 'Review & Publish']

    const [formData,setFormData]=useState({
        // step 1
        jobTitle:'',
        jobDescription:'',
        jobLocations:[],
        employmentType:'',
        jobCategory:'',
        jobRole:'',
        industryType:'',
        workMode:'',
        noOfOpenings:'',
        shiftTime:'',
        joiningDate:'',
        applicationDeadline:'',

        // step 2
        educationMin:'',
        prefferedQualification:[],
        experienceMin:'',
        experienceMax:'',
        skills:[],
        languageKnown:[],
        noticePeriod:'',
        certificationRequired:[],

        // step 4
        applicationMode:'internal',
        applicationLink:'',
        requiredResumeUpload:true,
        requiredCoverLetter:false,

        // step 5
        salaryMin:'',
        salaryMax:'',
        salaryNegotiable:false,
        bonuses:'',
        perks:[]
    })

    const nextStep=()=>setStep(step+1)
    const previousStep=()=>setStep(step-1)

    const handleChange=(e)=>{
        const {name,value}=e.target

        setFormData((prev)=>({...prev,[name]:value}))
    }

    const renderStep = () => {
        switch (step) {
            case 1: return <Step1 formData={formData} handleChange={handleChange} nextStep={nextStep} />;
            case 2: return <Step2 formData={formData} handleChange={handleChange} nextStep={nextStep} previousStep={previousStep} />;
            case 3: return <Step3 formData={formData} handleChange={handleChange} nextStep={nextStep} previousStep={previousStep} />;
            case 4: return <Step4 formData={formData} handleChange={handleChange} nextStep={nextStep} previousStep={previousStep} />;
            case 5: return <Step5 formData={formData} handleChange={handleChange} previousStep={previousStep} setFormData={setFormData} />;
            default: return <Step1 />;
        }
    }
    return (

        <>
            <div className="job-post-form-container d-flex">
                <div className="stepper w-25 border-end">
                    <ul>
                        {
                            steps.map((label, index) => (
                                <li
                                    key={index}
                                    style={{
                                        fontWeight: step === index + 1 ? 'bold' : 'normal',
                                        cursor: 'pointer',
                                        marginBottom: '10px'
                                    }}
                                    onClick={() => { setStep(index + 1) }}
                                >
                                    {label}
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <div className="form-content">
                    {renderStep()}
                </div>
            </div>
        </>
    )
}

export default JobPostForm
