import React, { useState } from 'react'

const JobPostStep5 = ({ formData, handleChange, nextStep, previousStep }) => {
    return (
        <div>
            <div className="card p-4 shadow-sm">
                <h2 className="mb-4 text-primary">Salary & Benefits</h2>

                <form className="row g-3 fs-4 p-4">

                    <div className="col-12 mb-3">
                        <label className="form-label">Salary Range (₹)</label>

                        <div className="row g-2 align-items-center">
                            <div className="col-md-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Min Salary"
                                    min={0}
                                    step={1000}
                                    value={formData.salaryMin}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Max Salary"
                                    min={0}
                                    step={1000}
                                    value={formData.salaryMax}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>


                    <div className="col-12">
                        <label className="form-label d-block">Is Salary Negotiable?</label>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="salaryNegotiable" id="negotiableYes" value="yes" />
                            <label className="form-check-label" htmlFor="negotiableYes">Yes</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="salaryNegotiable" id="negotiableNo" value="no" />
                            <label className="form-check-label" htmlFor="negotiableNo">No</label>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="bonus" className="form-label">Incentives / Bonus</label>
                        <input type="text" className="form-control" id="bonus" placeholder="e.g., Performance bonus, stock options" />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="perks" className="form-label">Perks & Benefits</label>
                        <select className="form-select py-3" id="perks">
                            <option value="">Select benefit</option>
                            <option value="insurance">Health Insurance</option>
                            <option value="flexible">Flexible Hours</option>
                            <option value="hybrid">Hybrid Work</option>
                            <option value="gym">Gym Membership</option>
                            <option value="others">Others</option>
                        </select>
                    </div>

                </form>

                <div className="d-flex justify-content-between mt-4">
                    <button className="btn btn-info px-5 py-2" onClick={previousStep}>Previous</button>
                    <button className="btn btn-primary px-5 py-2" onClick={nextStep}>Next</button>
                </div>
            </div>

        </div>
    )
}

export default JobPostStep5
