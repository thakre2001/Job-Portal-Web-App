import React, { useEffect, useState } from "react";

const RecruiterForm3 = ({
  formData,
  handleChange,
  nextStep,
  previousStep,
  errors,
  touched,
  handleBlur,
  companyId,
}) => {
  const [existingAddresses, setExistingAddresses] = useState([]);
  const [useExisting, setUseExisting] = useState(true);

  // Fetch existing addresses for selected company
  useEffect(() => {
    if (companyId) {
      fetch(`/api/companies/${companyId}/locations`)
        .then((res) => res.json())
        .then((data) => setExistingAddresses(data))
        .catch((err) => console.error("Error fetching addresses:", err));
    }
  }, [companyId]);

  const handleExistingSelect = (e) => {
    const selectedId = e.target.value;
    if (selectedId && selectedId !== "new") {
      const selected = existingAddresses.find((addr) => addr.id === Number(selectedId));
      if (selected) {
        // Auto-fill formData with selected address
        handleChange({ target: { name: "addressId", value: selected.id } });
        handleChange({ target: { name: "country", value: selected.country } });
        handleChange({ target: { name: "state", value: selected.state } });
        handleChange({ target: { name: "city", value: selected.city } });
        handleChange({ target: { name: "streetAddress", value: selected.streetAddress } });
        handleChange({ target: { name: "postalCode", value: selected.postalCode } });
      }
      setUseExisting(true);
    } else {
      setUseExisting(false);
    }
  };

  return (
    <div className="card shadow-lg p-4 border-0 rounded-3 recruiter-form">
      <h4 className="mb-4 fw-bold text-primary">Office Address</h4>

      {/* Dropdown for existing addresses */}
      {existingAddresses.length > 0 && (
        <div className="mb-3">
          <label className="form-label fw-semibold">Select Existing Address</label>
          <select
            className="form-select"
            onChange={handleExistingSelect}
            defaultValue=""
          >
            <option value="">-- Select Address --</option>
            {existingAddresses.map((addr) => (
              <option key={addr.id} value={addr.id}>
                {addr.city}, {addr.state} ({addr.streetAddress})
              </option>
            ))}
            <option value="new">+ Add New Address</option>
          </select>
        </div>
      )}

      {/* Address Form (only if adding new OR no existing addresses) */}
      {(!useExisting || existingAddresses.length === 0) && (
        <>
          {/* Country */}
          <div className="mb-3">
            <label htmlFor="country" className="form-label fw-semibold">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              onBlur={handleBlur}
              id="country"
              className={`form-control ${
                touched.country && errors.country ? "is-invalid" : ""
              }`}
            />
            {touched.country && errors.country && (
              <div className="invalid-feedback">{errors.country}</div>
            )}
          </div>

          {/* State */}
          <div className="mb-3">
            <label htmlFor="state" className="form-label fw-semibold">
              State
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              onBlur={handleBlur}
              id="state"
              className={`form-control ${
                touched.state && errors.state ? "is-invalid" : ""
              }`}
            />
            {touched.state && errors.state && (
              <div className="invalid-feedback">{errors.state}</div>
            )}
          </div>

          {/* City */}
          <div className="mb-3">
            <label htmlFor="city" className="form-label fw-semibold">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              onBlur={handleBlur}
              id="city"
              className={`form-control ${
                touched.city && errors.city ? "is-invalid" : ""
              }`}
            />
            {touched.city && errors.city && (
              <div className="invalid-feedback">{errors.city}</div>
            )}
          </div>

          {/* Street Address */}
          <div className="mb-3">
            <label htmlFor="streetAddress" className="form-label fw-semibold">
              Street Address
            </label>
            <input
              type="text"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
              onBlur={handleBlur}
              id="streetAddress"
              className={`form-control ${
                touched.streetAddress && errors.streetAddress ? "is-invalid" : ""
              }`}
            />
            {touched.streetAddress && errors.streetAddress && (
              <div className="invalid-feedback">{errors.streetAddress}</div>
            )}
          </div>

          {/* Postal Code */}
          <div className="mb-3">
            <label htmlFor="postalCode" className="form-label fw-semibold">
              Postal Code
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              onBlur={handleBlur}
              id="postalCode"
              className={`form-control ${
                touched.postalCode && errors.postalCode ? "is-invalid" : ""
              }`}
            />
            {touched.postalCode && errors.postalCode && (
              <div className="invalid-feedback">{errors.postalCode}</div>
            )}
          </div>
        </>
      )}

      {/* Navigation Buttons */}
      <div className="d-flex justify-content-between mt-4">
        <button
          type="button"
          className="btn btn-lg btn-secondary px-5 py-2"
          onClick={previousStep}
        >
          Back
        </button>
        <button
          type="button"
          className="btn btn-lg btn-primary px-5 py-2"
          onClick={nextStep}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RecruiterForm3;
