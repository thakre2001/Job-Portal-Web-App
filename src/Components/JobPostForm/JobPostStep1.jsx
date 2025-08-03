import React from 'react'

const JobPostStep1 = ({ formData, setFormData, nextStep ,handleChange}) => {
    return (
        <div className="container-fluid">
            <div className="card shadow-sm p-4">
                <h2 className="mb-4 text-primary">Job Details</h2>

                <form className='rounded-3 p-4 row gy-4 fs-4'>

                    <div className="col-md-6">
                        <label htmlFor="title" className="form-label">Job Title</label>
                        <input 
                        name='jobTitle'
                        type="text" 
                        className="form-control" 
                        id="title" 
                        placeholder="e.g. Frontend Developer" 
                        onChange={handleChange}
                        value={formData.jobTitle}
                        />
                    </div>

                    <div className="col-12">
                        <label htmlFor="description" className="form-label">Job Description</label>
                        <textarea 
                        className="form-control" 
                        id="description" 
                        rows="4" 
                        name='jobDescription'
                        onChange={handleChange}
                        value={formData.jobDescription}
                        placeholder="Write a clear description of the role..."></textarea>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="location" className="form-label">Job Location</label>
                        <input type="text" 
                        className="form-control" 
                        id="location" 
                        name='jobLocations'
                        onChange={handleChange}
                        value={formData.jobLocations}
                        placeholder="e.g. Pune, Mumbai" />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="employment" className="form-label">Employment Type</label>
                        <select className="form-select" 
                        name='employmentType' 
                        onChange={handleChange} 
                        id="employment" value={formData.employmentType}
                        >
                            <option value="">Select Type</option>
                            <option value="full-time">Full Time</option>
                            <option value="part-time">Part Time</option>
                            <option value="contract">Contract</option>
                            <option value="internship">Internship</option>
                            <option value="freelance">Freelance</option>
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="category" className="form-label">Job Category</label>
                        <select className="form-select" 
                        name='jobCategory' 
                        value={formData.jobCategory} onChange={handleChange} id="category"
                        >
                            <option value="">Select Category</option>
                            <option value="sales">Sales</option>
                            <option value="developer">Developer</option>
                            <option value="hr">HR</option>
                            <option value="tester">Tester</option>
                            <option value="devops">DevOps Engineer</option>
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="role" className="form-label">Job Role</label>
                        <input type="text"
                         className="form-control"
                         name='jobRole'
                         onChange={handleChange}
                         value={formData.jobRole}
                          id="role" placeholder="e.g. UI Developer" />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="industry" className="form-label">Industry Type</label>
                        <select className="form-select" id="industry"
                        value={formData.industryType}
                        name='industryType'
                        onChange={handleChange}
                        >
                            <option value="">Select Industry</option>
                            <option value="it">IT Services</option>
                            <option value="healthcare">Healthcare</option>
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="workmode" className="form-label">Work Mode</label>
                        <select className="form-select" id="workmode"
                        name='workMode'
                        value={formData.workMode}
                        onChange={handleChange}
                        >
                            <option value="">Select Mode</option>
                            <option value="onsite">On-site</option>
                            <option value="hybrid">Hybrid</option>
                            <option value="remote">Remote</option>
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="openings" className="form-label">Number of Openings</label>
                        <input type="number" 
                        className="form-control" 
                        id="openings"
                        name='noOfOpenings'
                        value={formData.noOfOpenings}
                        onChange={handleChange}
                         min="1" placeholder="e.g. 5" 
                         />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="shift" className="form-label">Shift Type</label>
                        <select className="form-select" id="shift"
                        name='shiftTime'
                        value={formData.shiftTime}
                        onChange={handleChange}
                        >
                            <option value="">Select Shift</option>
                            <option value="day">Day</option>
                            <option value="night">Night</option>
                            <option value="rotational">Rotational</option>
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="joiningDate" className="form-label">Joining Date</label>
                        <input type="date" 
                        className="form-control" 
                        name='joiningDate'
                        value={formData.joiningDate}
                        onChange={handleChange}
                        id="joiningDate" 
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="deadline" className="form-label">Application Deadline</label>
                        <input type="date" className="form-control" id="deadline" 
                        name='applicationDeadline'
                        value={formData.applicationDeadline}
                        onChange={handleChange}
                        />
                    </div>
                </form>

                <div className="d-flex justify-content-end mt-4">
                    <button className="btn btn-primary px-5 py-2" onClick={nextStep}>Next</button>
                </div>
            </div>
        </div>
    )
}

export default JobPostStep1
