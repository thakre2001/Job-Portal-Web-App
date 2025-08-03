import React from 'react'

const JobPostStep3 = ({ formData, handleChange, nextStep, previousStep }) => {
    return (
        <div className='container-fluid'>
            <div className="card shadow-sm p-4">
                <h2 className="mb-4 text-primary">Company Information</h2>

                <form className="p-4 bg-white rounded-3 fs-4">

                    <div className="mb-3">
                        <label htmlFor="companyName" className="form-label">Company Name</label>
                        <input type="text" className="form-control" id="companyName" placeholder="Enter your company name" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="aboutCompany" className="form-label">About Company</label>
                        <textarea className="form-control" id="aboutCompany" rows="3" placeholder="Brief description about the company"></textarea>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="companyWebsite" className="form-label">Website</label>
                        <input type="url" className="form-control" id="companyWebsite" placeholder="https://example.com" />
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="companySize" className="form-label">Company Size</label>
                            <select className="form-select" id="companySize">
                                <option value="">Select size</option>
                                <option value="1-10">1-10</option>
                                <option value="11-50">11-50</option>
                                <option value="51-200">51-200</option>
                                <option value="201-500">201-500</option>
                                <option value="501-1000">501-1000</option>
                                <option value="1000+">1000+</option>
                            </select>
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="industry" className="form-label">Industry</label>
                            <select className="form-select" id="industry">
                                <option value="">Select industry</option>
                                <option value="it">IT</option>
                                <option value="sales">Sales</option>
                                <option value="healthcare">Healthcare</option>
                                <option value="education">Education</option>
                                <option value="manufacturing">Manufacturing</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="companyLogo" className="form-label">Company Logo</label>
                        <input className="form-control" type="file" id="companyLogo" />
                        <div className="form-text">Upload a square image (preferably 1:1 ratio)</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="companyAddress" className="form-label">Company Address</label>
                        <textarea className="form-control" id="companyAddress" rows="2" placeholder="Full office address"></textarea>
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
