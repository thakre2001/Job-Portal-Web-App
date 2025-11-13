import React, { useState, useEffect } from 'react';
import { Services } from '../../BackendAPIs/Services';

const RecruiterForm1 = ({ formData, setFormData, handleChange, validateStep, nextStep, errors, handleBlur, touched }) => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(formData);

  useEffect(() => {
    // Fetch registered companies from backend
    Services.getAllCompanies() // change API URL as per backend
      .then((res) => setCompanies(res.data))
      .catch((err) => console.error("Error fetching companies:", err));
  }, []);

  const handleCompanySelect = (e) => {
    const value = e.target.value;
    setSelectedCompany(value);

    if (value !== "other" && value !== "") {
      const selected = companies.find(c => c.id.toString() === value);
      setFormData({
        ...formData,
        companyId: selected.id,
        companyName: selected.companyName,
        companyWebsite: selected.companyWebsite || "",
        industryType: selected.industryType || "",
        companySize: selected.companySize || "",
        companyDescription: selected.companyDescription || ""
      });
    } else {
      // Reset for new company
      setFormData({
        ...formData,
        companyId: null,
        companyName: "",
        companyWebsite: "",
        industryType: "",
        companySize: "",
        companyDescription: ""
      });
    }
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setFormData({ ...formData, companyLogo: file });
  //   }
  // };

  return (
    <div className="card shadow-lg p-4 border-0 rounded-3 recruiter-form">
      <h4 className="mb-4 fw-bold text-primary">Company Information</h4>

      <form style={{ fontSize: '14px' }}>
        {/* Dropdown for Existing Company */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Select Company</label>
          <select
            className="form-control"
            value={selectedCompany}
            onChange={handleCompanySelect}
          >
            <option value="">-- Select Company --</option>
            {companies
            .sort()
            .map((company) => (
              <option key={company.id} value={company.id}>
                {company.companyName}
              </option>
            ))}
            <option value="other">Other (Add New Company)</option>
          </select>
          <small className="form-text text-muted">
            Select an existing company or choose "Other" to add a new one.
          </small>
        </div>

        {/* Show fields only if "Other" is chosen */}
        {selectedCompany === "other" && (
          <>
            {/* Company Name */}
            <div className="mb-3">
              <label htmlFor="companyName" className="form-label fw-semibold">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                onBlur={handleBlur}
                id="companyName"
                className={`form-control ${touched.companyName && errors.companyName ? 'is-invalid' : ''}`}
              />
              <small className="form-text text-muted">Enter your registered business name.</small>
              {touched.companyName && errors.companyName && (
                <div className="invalid-feedback">{errors.companyName}</div>
              )}
            </div>

            {/* Company Website */}
            <div className="mb-3">
              <label htmlFor="companyWebsite" className="form-label fw-semibold">Company Website</label>
              <input
                type="text"
                name="companyWebsite"
                value={formData.companyWebsite}
                onChange={handleChange}
                onBlur={handleBlur}
                id="companyWebsite"
                className={`form-control ${touched.companyWebsite && errors.companyWebsite ? 'is-invalid' : ''}`}
              />
              <small className="form-text text-muted">Example: https://yourcompany.com</small>
              {touched.companyWebsite && errors.companyWebsite && (
                <div className="invalid-feedback">{errors.companyWebsite}</div>
              )}
            </div>

            {/* Industry Type */}
            <div className="mb-3">
              <label htmlFor="industryType" className="form-label fw-semibold">Industry Type</label>
              <input
                type="text"
                name="industryType"
                value={formData.industryType}
                onChange={handleChange}
                onBlur={handleBlur}
                id="industryType"
                className={`form-control ${touched.industryType && errors.industryType ? 'is-invalid' : ''}`}
              />
              <small className="form-text text-muted">e.g., IT, Manufacturing, Healthcare</small>
              {touched.industryType && errors.industryType && (
                <div className="invalid-feedback">{errors.industryType}</div>
              )}
            </div>

            {/* Company Size */}
            <div className="mb-3">
              <label htmlFor="companySize" className="form-label fw-semibold">Company Size</label>
              <input
                type="text"
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
                onBlur={handleBlur}
                id="companySize"
                className={`form-control ${touched.companySize && errors.companySize ? 'is-invalid' : ''}`}
              />
              <small className="form-text text-muted">e.g., 50-100 employees</small>
              {touched.companySize && errors.companySize && (
                <div className="invalid-feedback">{errors.companySize}</div>
              )}
            </div>

            {/* Company Description */}
            <div className="mb-3">
              <label htmlFor="companyDescription" className="form-label fw-semibold">Company Description</label>
              <textarea
                name="companyDescription"
                value={formData.companyDescription}
                onChange={handleChange}
                onBlur={handleBlur}
                id="companyDescription"
                className={`form-control ${touched.companyDescription && errors.companyDescription ? 'is-invalid' : ''}`}
                rows="4"
              ></textarea>
              <small className="form-text text-muted">Briefly describe your company’s mission and services.</small>
              {touched.companyDescription && errors.companyDescription && (
                <div className="invalid-feedback">{errors.companyDescription}</div>
              )}
            </div>

            {/* Company Logo */}
            <div className="mb-3">
              <label htmlFor="companyLogo" className="form-label fw-semibold">Company Logo</label>
              <input
                type="file"
                name="companyLogo"
                accept="image/*"
                // onChange={handleFileChange}
                id="companyLogo"
                className="form-control"
              />
              <small className="form-text text-muted">Upload a clear logo (PNG/JPG)</small>
            </div>
          </>
        )}

        {/* Next Button */}
        <div className="d-flex justify-content-end mt-4">
          <button
            className="btn btn-primary px-5 py-2 fw-semibold shadow-sm"
            onClick={nextStep}
            disabled={validateStep}
          >
            Next →
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecruiterForm1;
