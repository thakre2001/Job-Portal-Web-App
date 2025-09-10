import React, { useState } from 'react'

import Step1 from './RecruiterForm1'
import Step2 from './RecruiterForm2'
import Step3 from './RecruiterForm3'
import Step4 from './RecruiterForm4'
import Step5 from './RecruiterForm5'
import Step6 from './RecruiterReview'
import * as Yup from "yup";


const RecruiterRegistration = () => {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        // Step 1: Company Information
        companyId:null,
        companyName: '',
        companyWebsite: '',
        industryType: '',
        companySize: '',
        companyDescription: '',
        companyLogo: null, // file upload

        // Step 2: Recruiter / Contact Details
        recruiterName: '',
        recruiterEmail: '',
        recruiterPhone: '',
        recruiterDesignation: '',
        alternateContact: '',

        // Step 3: Office Address
        country: '',
        state: '',
        city: '',
        streetAddress: '',
        postalCode: '',

        // Step 4: Account Credentials
        password: '',
        confirmPassword: '',

        // Step 5: Optional Fields (optional additions)
        gstNumber: '',
        panNumber: '',
        linkedinProfile: '',
        hiringPlan: '', // e.g., "Occasional", "Monthly", "High-volume"


    })

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const stepSchemas = {
        1: Yup.object().shape({
            companyName: Yup.string().required("Company Name is required"),
            companyWebsite: Yup.string().url("Enter a valid URL").required("Company Website is required"),
            industryType: Yup.string().required("Industry Type is required"),
            companySize: Yup.string().required("Company Size is required"),
            companyDescription: Yup.string().required("Company Description is required")
        }),
        2: Yup.object().shape({
            recruiterName: Yup.string().required("Recruiter Name is required"),
            recruiterEmail: Yup.string().email("Enter a valid email").required("Recruiter Email is required"),
            recruiterPhone: Yup.string().required("Phone number is required"),
            recruiterDesignation: Yup.string().required("Designation is required")
        }),
        3: Yup.object().shape({
            country: Yup.string().required("Country is required"),
            state: Yup.string().required("State is required"),
            city: Yup.string().required("City is required"),
            streetAddress: Yup.string().required("Street address is required"),
            postalCode: Yup.string().required("Postal code is required")
        }),
        4: Yup.object().shape({
            password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Confirm Password is required")
        })
    };

    const validateStep = async () => {
        const schema = stepSchemas[step];

        if(step ===1 && formData.companyId){
            setErrors({})
            return true;
        }
        if (!schema) return true; // skip validation if no schema (e.g. Step5)

        try {
            await schema.validate(formData, { abortEarly: false });
            setErrors({});
            return true;
        } catch (err) {
            const stepErrors = {};
            err.inner.forEach((e) => {
                stepErrors[e.path] = e.message;
            });
            setErrors(stepErrors);
            return false;
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        validateStep(name, value);
    }

    const nextStep = async () => {
        const valid = await validateStep();
        if(valid) setStep(step + 1);
    };


    const previousStep = () => setStep(step - 1)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        setErrors((prevError) => ({ ...prevError, [name]: undefined }));
    }

    

    const renderForm = () => {
        const commonProps = {
            formData,
            handleChange,
            handleBlur,
            errors,
            touched,
            nextStep,
            previousStep,
            setFormData
        };

        switch (step) {
            case 1: return <Step1 {...commonProps} />
            case 2: return <Step2 {...commonProps} />
            case 3: return <Step3 {...commonProps} />
            case 4: return <Step4 {...commonProps} />
            case 5: return <Step5 {...commonProps} />
            case 6: return <Step6 {...commonProps} />
            default: return <Step1 {...commonProps}/>
        }
    }

    return (
        <>
            <div className="recruiter-registration-form w-100" style={{ paddingTop: 100 }}>
                <div className="form-content w-100">
                    <h1>Welcome to recruiter page</h1>
                    {renderForm()}
                </div>
            </div>
        </>
    )
}

export default RecruiterRegistration
