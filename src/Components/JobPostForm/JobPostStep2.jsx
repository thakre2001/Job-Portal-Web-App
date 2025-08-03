import React from 'react'

const JobPostStep2 = ({ formData, handleChange, nextStep, previousStep }) => {

    const handleCheckboxChange = (e, key) => {
        const { value, checked } = e.target;
        if (checked) {
            handleChange({
                target: {
                    name: key,
                    value: [...formData[key], value],
                },
            });
        } else {
            handleChange({
                target: {
                    name: key,
                    value: formData[key].filter((v) => v !== value),
                },
            });
        }
    };

    return (
        <div className='container-fluid'>
            <div className=" card p-4 shadow-sm">
                <h2 className="mb-4 text-primary">Candidate Preferences</h2>

                <form className="bg-white p-4 fs-4">

                    <div className="mb-3">
                        <label htmlFor="minEducation" className="form-label">Minimum Education</label>
                        <select className="form-select" id="minEducation"
                            name='educationMin'
                            value={formData.educationMin}
                            onChange={handleChange}
                        >
                            <option value="">Select education level</option>
                            <option value="bachelors">Bachelor's</option>
                            <option value="masters">Master's</option>
                            <option value="diploma">Diploma</option>
                        </select>
                    </div>

                    {/* <div className="mb-3">
                        <label className="form-label">Preferred Qualifications</label>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="pq1" />
                            <label className="form-check-label" htmlFor="pq1">MBA</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="pq2" />
                            <label className="form-check-label" htmlFor="pq2">B.Tech</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="pq3" />
                            <label className="form-check-label" htmlFor="pq3">MCA</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="pq4" />
                            <label className="form-check-label" htmlFor="pq4">Others</label>
                        </div>
                    </div> */}

                    <div className="mb-3">
                        <label className="form-label">Preferred Qualifications</label>
                        {["MBA", "B.Tech", "MCA", "Others"].map((val, i) => (
                            <div className="form-check" key={val}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`pq${i}`}
                                    value={val}
                                    checked={formData.prefferedQualification.includes(val)}
                                    onChange={(e) => handleCheckboxChange(e, "prefferedQualification")}
                                />
                                <label className="form-check-label" htmlFor={`pq${i}`}>{val}</label>
                            </div>
                        ))}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="experience" className="form-label">Experience Required (in years)</label>
                        <div className="row gap-2">
                            <div className="col-md-3">
                                <input
                                    type="number"
                                    name=""
                                    id=""
                                    className='form-control'
                                    placeholder='Min. Experience'
                                />
                            </div>
                            <div className="col-md-3">
                                <input type="number"
                                    name=""
                                    id=""
                                    className='form-control'
                                    placeholder='Max. Experience'
                                />
                            </div>
                        </div>
                        <div className="form-text">Select the minimum required experience</div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Skills Required</label>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="skill1" value="JavaScript" />
                            <label className="form-check-label" htmlFor="skill1">JavaScript</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="skill2" value="React" />
                            <label className="form-check-label" htmlFor="skill2">React</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="skill3" value="Python" />
                            <label className="form-check-label" htmlFor="skill3">Python</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="skill4" value="SQL" />
                            <label className="form-check-label" htmlFor="skill4">SQL</label>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Languages Known</label>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="lang1" />
                            <label className="form-check-label" htmlFor="lang1">English</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="lang2" />
                            <label className="form-check-label" htmlFor="lang2">Hindi</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="lang3" />
                            <label className="form-check-label" htmlFor="lang3">Marathi</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="lang4" />
                            <label className="form-check-label" htmlFor="lang4">Other</label>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="noticePeriod" className="form-label">Notice Period</label>
                        <select className="form-select" id="noticePeriod">
                            <option value="">Select</option>
                            <option value="immediate">Immediate</option>
                            <option value="15">15 Days</option>
                            <option value="30">30 Days</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="certification" className="form-label">Certification Required (Optional)</label>
                        <input type="text" className="form-control" id="certification" placeholder="e.g., AWS, PMP, Google Ads" />
                    </div>
                </form>

                <div className='d-flex justify-content-between mt-4'>
                    <button className='btn btn-info py-2 px-5' onClick={previousStep}>Previous</button>
                    <button className='btn btn-primary py-2 px-5' onClick={nextStep}>Next</button>
                </div>

            </div>
        </div>
    )
}

export default JobPostStep2
