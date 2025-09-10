import React from 'react';

const RecruiterForm5 = ({ formData, handleChange, nextStep, previousStep, errors, touched, handleBlur }) => {
  return (
    <div className="card shadow-lg p-4 border-0 rounded-3 recruiter-form">
      <h4 className="mb-4 fw-bold text-primary">Additional Information</h4>

      <form style={{ fontSize: "14px" }}>
        {/* GST Number (optional) */}
        <div className="mb-3">
          <label htmlFor="gstNumber" className="form-label fw-semibold">GST Number (optional)</label>
          <input
            type="text"
            name="gstNumber"
            value={formData.gstNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            id="gstNumber"
            className="form-control"
          />
        </div>

        {/* PAN Number (optional) */}
        <div className="mb-3">
          <label htmlFor="panNumber" className="form-label fw-semibold">PAN Number (optional)</label>
          <input
            type="text"
            name="panNumber"
            value={formData.panNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            id="panNumber"
            className="form-control"
          />
        </div>

        {/* LinkedIn Profile (optional) */}
        <div className="mb-3">
          <label htmlFor="linkedinProfile" className="form-label fw-semibold">LinkedIn Profile (optional)</label>
          <input
            type="url"
            name="linkedinProfile"
            value={formData.linkedinProfile}
            onChange={handleChange}
            onBlur={handleBlur}
            id="linkedinProfile"
            className="form-control"
          />
        </div>

        {/* Hiring Plan (required) */}
        <div className="mb-3">
          <label htmlFor="hiringPlan" className="form-label fw-semibold">Hiring Plan</label>
          <select
            name="hiringPlan"
            value={formData.hiringPlan}
            onChange={handleChange}
            onBlur={handleBlur}
            id="hiringPlan"
            className={`form-select ${touched.hiringPlan && errors.hiringPlan ? 'is-invalid' : ''}`}
          >
            <option value="">Select Plan</option>
            <option value="Occasional">Occasional</option>
            <option value="Monthly">Monthly</option>
            <option value="High-volume">High-volume</option>
          </select>
          {touched.hiringPlan && errors.hiringPlan && (
            <div className="invalid-feedback">{errors.hiringPlan}</div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-lg btn-secondary px-4 py-2" onClick={previousStep}>⬅ Back</button>
          <button className="btn btn-lg btn-primary px-5 py-2" onClick={nextStep}>Next</button>
        </div>
      </form>
    </div>
  );
};

export default RecruiterForm5;
