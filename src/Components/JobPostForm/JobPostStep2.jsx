import React from "react";

const JobPostStep2 = ({ formData, handleChange, nextStep, previousStep }) => {
    // ✅ Handle checkbox for arrays
    const handleCheckboxChange = (e, key) => {
        const { value, checked } = e.target;
        const currentValues = formData[key] || []; // ensure array

        if (checked) {
            handleChange({
                target: {
                    name: key,
                    value: [...currentValues, value],
                },
            });
        } else {
            handleChange({
                target: {
                    name: key,
                    value: currentValues.filter((v) => v !== value),
                },
            });
        }
    };

    // ✅ Handle number input
    const handleNumberChange = (e) => {
        const { name, value } = e.target;
        handleChange({
            target: {
                name,
                value: value === "" ? "" : Number(value), // convert to number
            },
        });
    };

    return (
        <div className="container-fluid">
            <div className="card p-4 shadow-sm">
                <h2 className="mb-4 text-primary">Candidate Preferences</h2>

                <form className="bg-white p-4 fs-4">
                    {/* Minimum Education */}
                    <div className="mb-3">
                        <label htmlFor="minEducation" className="form-label">
                            Minimum Education
                        </label>
                        <select
                            className="form-select"
                            id="minEducation"
                            name="educationMin"
                            value={formData.educationMin}
                            onChange={handleChange}
                        >
                            <option value="">Select education level</option>
                            <option value="bachelors">Bachelor's</option>
                            <option value="masters">Master's</option>
                            <option value="diploma">Diploma</option>
                        </select>
                    </div>

                    {/* Preferred Qualifications */}
                    <div className="mb-3">
                        <label className="form-label">Preferred Qualifications</label>
                        {["MBA", "B.Tech", "MCA", "Others"].map((val, i) => (
                            <div className="form-check" key={val}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`pq${i}`}
                                    value={val}
                                    checked={formData.preferredQualification?.includes(val) || false}
                                    onChange={(e) =>
                                        handleCheckboxChange(e, "preferredQualification")
                                    }
                                />
                                <label className="form-check-label" htmlFor={`pq${i}`}>
                                    {val}
                                </label>
                            </div>
                        ))}
                    </div>

                    {/* Experience */}
                    <div className="mb-3">
                        <label htmlFor="experience" className="form-label">
                            Experience Required (in years)
                        </label>
                        <div className="row gap-2">
                            <div className="col-md-3">
                                <input
                                    type="number"
                                    name="experienceMin"
                                    className="form-control"
                                    placeholder="Min. Experience"
                                    value={formData.experienceMin}
                                    onChange={handleNumberChange}
                                />
                            </div>
                            <div className="col-md-3">
                                <input
                                    type="number"
                                    name="experienceMax"
                                    className="form-control"
                                    placeholder="Max. Experience"
                                    value={formData.experienceMax}
                                    onChange={handleNumberChange}
                                />
                            </div>
                        </div>
                        <div className="form-text">
                            Select the minimum required experience
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-3">
                        <label className="form-label">Skills Required</label>
                        {["JavaScript", "React", "Python", "SQL"].map((val, i) => (
                            <div className="form-check" key={val}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`skill${i}`}
                                    value={val}
                                    checked={formData.skills?.includes(val) || false}
                                    onChange={(e) => handleCheckboxChange(e, "skills")}
                                />
                                <label className="form-check-label" htmlFor={`skill${i}`}>
                                    {val}
                                </label>
                            </div>
                        ))}
                    </div>

                    {/* Languages */}
                    <div className="mb-3">
                        <label className="form-label">Languages Known</label>
                        {["English", "Hindi", "Marathi", "Other"].map((val, i) => (
                            <div className="form-check" key={val}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`lang${i}`}
                                    value={val}
                                    checked={formData.languageKnown?.includes(val) || false}
                                    onChange={(e) => handleCheckboxChange(e, "languageKnown")}
                                />
                                <label className="form-check-label" htmlFor={`lang${i}`}>
                                    {val}
                                </label>
                            </div>
                        ))}
                    </div>

                    {/* Notice Period */}
                    <div className="mb-3">
                        <label htmlFor="noticePeriod" className="form-label">
                            Notice Period
                        </label>
                        <select
                            className="form-select"
                            id="noticePeriod"
                            name="noticePeriod"
                            value={formData.noticePeriod}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="immediate">Immediate</option>
                            <option value="15">15 Days</option>
                            <option value="30">30 Days</option>
                        </select>
                    </div>

                    {/* Certification */}
                    <div className="mb-3">
                        <label htmlFor="certification" className="form-label">
                            Certification Required (Optional)
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="certification"
                            name="certificationRequired"
                            placeholder="e.g., AWS, PMP, Google Ads"
                            value={formData.certificationRequired.join(", ")}
                            onChange={(e) =>
                                handleChange({
                                    target: {
                                        name: "certificationRequired",
                                        value: e.target.value.split(",").map(s => s.trim())
                                    }
                                })
                            }
                        />
                    </div>
                </form>

                {/* Navigation */}
                <div className="d-flex justify-content-between mt-4">
                    <button className="btn btn-info py-2 px-5" onClick={previousStep}>
                        Previous
                    </button>
                    <button className="btn btn-primary py-2 px-5" onClick={nextStep}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobPostStep2;
