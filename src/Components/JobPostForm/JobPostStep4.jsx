import React from 'react'

const JobPostStep4 = ({ formData, handleChange, nextStep, previousStep }) => {
    return (
        <div className='container-fluid'>
            <div className="card shadow-sm p-4">
                <h2 className="mb-4 text-primary">Contact & Application Settings</h2>

                <form className="p-4 rounded-3 fs-4">

                    <div className="mb-3">
                        <label htmlFor="contactName" className="form-label">Contact Person Name</label>
                        <input type="text" className="form-control" id="contactName" placeholder="Enter full name" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="contactEmail" className="form-label">Contact Email</label>
                        <input type="email" className="form-control" id="contactEmail" placeholder="example@company.com" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="contactPhone" className="form-label">Contact Phone</label>
                        <input type="tel" className="form-control" id="contactPhone" placeholder="e.g. +91 9876543210" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label d-block">How to Apply</label>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="applyMode" id="applyInternal" value="internal" />
                            <label className="form-check-label" htmlFor="applyInternal">Via this platform</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="applyMode" id="applyExternal" value="external" />
                            <label className="form-check-label" htmlFor="applyExternal">External Link</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="applyMode" id="applyEmail" value="email" />
                            <label className="form-check-label" htmlFor="applyEmail">Email</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="applyMode" id="applyWalkin" value="walkin" />
                            <label className="form-check-label" htmlFor="applyWalkin">Walk-In</label>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="applicationLink" className="form-label">Application Link</label>
                        <input type="url" className="form-control" id="applicationLink" placeholder="https://apply.example.com" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label d-block">Resume Upload Required</label>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="resumeRequired" id="resumeYes" value="yes" />
                            <label className="form-check-label" htmlFor="resumeYes">Yes</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="resumeRequired" id="resumeNo" value="no" />
                            <label className="form-check-label" htmlFor="resumeNo">No</label>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label d-block">Cover Letter Required</label>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="coverLetterRequired" id="coverYes" value="yes" />
                            <label className="form-check-label" htmlFor="coverYes">Yes</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="coverLetterRequired" id="coverNo" value="no" />
                            <label className="form-check-label" htmlFor="coverNo">No</label>
                        </div>
                    </div>

                </form>

                <div className="d-flex justify-content-between mt-4">
                    <button className="btn btn-info py-2 px-5" onClick={previousStep}>Previous</button>
                    <button className="btn btn-primary py-2 px-5" onClick={nextStep}>Next</button>
                </div>
            </div>

        </div>
    )
}

export default JobPostStep4
