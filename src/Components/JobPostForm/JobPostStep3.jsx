import React from 'react'

const JobPostStep3 = ({ formData, handleChange, nextStep, previousStep }) => {
    return (
        <div className='container-fluid'>
            <div className="card shadow-sm p-4">
                <h2 className="mb-4 text-primary">Contact & Application Settings</h2>

                <form className="p-4 rounded-3 fs-4">

                    {/* Application Mode */}
                    <div className="mb-3">
                        <label className="form-label d-block">How to Apply</label>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="applicationMode"
                                value="internal"
                                checked={formData.applicationMode === "internal"}
                                onChange={handleChange}
                            />
                            <label className="form-check-label">Via this platform</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="applicationMode"
                                value="external"
                                checked={formData.applicationMode === "external"}
                                onChange={handleChange}
                            />
                            <label className="form-check-label">External Link</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="applicationMode"
                                value="email"
                                checked={formData.applicationMode === "email"}
                                onChange={handleChange}
                            />
                            <label className="form-check-label">Email</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="applicationMode"
                                value="walkin"
                                checked={formData.applicationMode === "walkin"}
                                onChange={handleChange}
                            />
                            <label className="form-check-label">Walk-In</label>
                        </div>
                    </div>

                    {/* Application Link */}
                    <div className="mb-3">
                        <label htmlFor="applicationLink" className="form-label">Application Link</label>
                        <input
                            type="url"
                            className="form-control"
                            id="applicationLink"
                            name="applicationLink"
                            value={formData.applicationLink}
                            onChange={handleChange}
                            placeholder="https://apply.example.com"
                        />
                    </div>

                    {/* Resume Upload */}
                    <div className="mb-3">
                        <label className="form-label d-block">Resume Upload Required</label>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="requiredResumeUpload"
                                value="true"
                                checked={formData.requiredResumeUpload === true}
                                onChange={(e) =>
                                    handleChange({
                                        target: { name: "requiredResumeUpload", value: e.target.value === "true" }
                                    })
                                }
                            />
                            <label className="form-check-label">Yes</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="requiredResumeUpload"
                                value="false"
                                checked={formData.requiredResumeUpload === false}
                                onChange={(e) =>
                                    handleChange({
                                        target: { name: "requiredResumeUpload", value: e.target.value === "true" }
                                    })
                                }
                            />
                            <label className="form-check-label">No</label>
                        </div>
                    </div>

                    {/* Cover Letter */}
                    <div className="mb-3">
                        <label className="form-label d-block">Cover Letter Required</label>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="requiredCoverLetter"
                                value="true"
                                checked={formData.requiredCoverLetter === true}
                                onChange={(e) =>
                                    handleChange({  
                                        target: { name: "requiredCoverLetter", value: e.target.value === "true" }
                                    })
                                }
                            />
                            <label className="form-check-label">Yes</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="requiredCoverLetter"
                                value="false"
                                checked={formData.requiredCoverLetter === false}
                                onChange={(e) =>
                                    handleChange({
                                        target: { name: "requiredCoverLetter", value: e.target.value === "true" }
                                    })
                                }
                            />
                            <label className="form-check-label">No</label>
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

export default JobPostStep3
