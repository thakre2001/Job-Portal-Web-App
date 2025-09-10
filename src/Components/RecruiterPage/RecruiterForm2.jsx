import React from 'react';

const RecruiterForm2 = ({ formData, handleChange, handleBlur, nextStep, previousStep, errors, touched }) => {
    return (
        <div className="card shadow-lg p-4 border-0 rounded-3 recruiter-form">
            <h4 className="mb-4 fw-bold text-primary">Contact Details</h4>

            <form style={{ fontSize: '14px' }}>
                {/* Full Name */}
                <div className="mb-3">
                    <label htmlFor="recruiterName" className="form-label fw-semibold">Full Name</label>
                    <input
                        type="text"
                        name="recruiterName"
                        value={formData.recruiterName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="recruiterName"
                        className={`form-control ${touched.recruiterName && errors.recruiterName ? 'is-invalid' : ''}`}
                    />
                    {touched.recruiterName && errors.recruiterName && (
                        <div className="invalid-feedback">{errors.recruiterName}</div>
                    )}
                </div>

                {/* Email */}
                <div className="mb-3">
                    <label htmlFor="recruiterEmail" className="form-label fw-semibold">Email</label>
                    <input
                        type="email"
                        name="recruiterEmail"
                        value={formData.recruiterEmail}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="recruiterEmail"
                        className={`form-control ${touched.recruiterEmail && errors.recruiterEmail ? 'is-invalid' : ''}`}
                    />
                    {touched.recruiterEmail && errors.recruiterEmail && (
                        <div className="invalid-feedback">{errors.recruiterEmail}</div>
                    )}
                </div>

                {/* Phone Number */}
                <div className="mb-3">
                    <label htmlFor="recruiterPhone" className="form-label fw-semibold">Phone Number</label>
                    <input
                        type="tel"
                        name="recruiterPhone"
                        value={formData.recruiterPhone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="recruiterPhone"
                        className={`form-control ${touched.recruiterPhone && errors.recruiterPhone ? 'is-invalid' : ''}`}
                    />
                    {touched.recruiterPhone && errors.recruiterPhone && (
                        <div className="invalid-feedback">{errors.recruiterPhone}</div>
                    )}
                </div>

                {/* Designation */}
                <div className="mb-3">
                    <label htmlFor="recruiterDesignation" className="form-label fw-semibold">Designation</label>
                    <input
                        type="text"
                        name="recruiterDesignation"
                        value={formData.recruiterDesignation}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="recruiterDesignation"
                        className={`form-control ${touched.recruiterDesignation && errors.recruiterDesignation ? 'is-invalid' : ''}`}
                    />
                    {touched.recruiterDesignation && errors.recruiterDesignation && (
                        <div className="invalid-feedback">{errors.recruiterDesignation}</div>
                    )}
                </div>

                {/* Alternate Contact (Optional) */}
                <div className="mb-3">
                    <label htmlFor="alternateContact" className="form-label fw-semibold">Alternate Contact (Optional)</label>
                    <input
                        type="tel"
                        name="alternateContact"
                        value={formData.alternateContact}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="alternateContact"
                        className="form-control"
                    />
                </div>

                {/* Navigation Buttons */}
                <div className='d-flex justify-content-between my-4'>
                    <button className='btn btn-lg btn-secondary px-5 py-2' onClick={previousStep}>Back</button>
                    <button className='btn btn-lg btn-primary px-5 py-2' onClick={nextStep}>Next</button>
                </div>
            </form>
        </div>
    );
};

export default RecruiterForm2;
