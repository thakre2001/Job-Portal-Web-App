import React from 'react';

const RecruiterForm4 = ({ formData, handleChange, nextStep, previousStep, errors, touched, handleBlur }) => {
  return (
    <div className="card shadow-lg p-4 border-0 rounded-3 recruiter-form">
      <h4 className="mb-4 fw-bold text-primary">Create Password</h4>

      <form style={{ fontSize: "14px" }}>
        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label fw-semibold">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            id="password"
            className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
          />
          {touched.password && errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label fw-semibold">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            id="confirmPassword"
            className={`form-control ${touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''}`}
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <div className="invalid-feedback">{errors.confirmPassword}</div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-lg btn-secondary px-5 py-2" onClick={previousStep}>Back</button>
          <button className="btn btn-lg btn-primary px-5 py-2" onClick={nextStep}>Next</button>
        </div>
      </form>
    </div>
  );
};

export default RecruiterForm4;
