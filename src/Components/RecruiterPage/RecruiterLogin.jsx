import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RecruiterLogin = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({});
    const [showPass, setShowPass] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: ''
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Dummy validation
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            // ✅ Perform actual login/authentication here
            console.log('Logging in...', formData);
            navigate('/dashboard'); // or desired route
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow p-4" style={{ width: '100%', maxWidth: 400 }}>
                <h3 className="text-center mb-4">Recruiter Login</h3>
                <form onSubmit={handleSubmit} className="needs-validation">
                    {/* Email */}
                    <div className="mb-3 position-relative">
                        <input
                            type="email"
                            name="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            placeholder="Email ID"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <i className="fa fa-user position-absolute top-50 end-0 translate-middle-y pe-3 text-muted"></i>
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    {/* Password */}
                    <div className="mb-3 position-relative">
                        <input
                            type={showPass ? 'text' : 'password'}
                            name="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <i
                            className={`fa ${showPass ? 'fa-eye-slash' : 'fa-eye'} position-absolute top-50 end-0 translate-middle-y pe-3 text-muted`}
                            style={{ cursor: 'pointer' }}
                            onClick={() => setShowPass(!showPass)}
                        ></i>
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>

                    {/* Submit */}
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RecruiterLogin
