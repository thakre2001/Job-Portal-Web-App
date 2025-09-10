import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [step, setStep] = useState(1)
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirm, setConfirm] = useState("");
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false)

    const sendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("")
        try {
            const res = await axios.post("http://localhost:8093/password/forgot-password", { email })
            setMessage(res.data.message)
            setStep(2)
        } catch (error) {
            setMessage(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false)
        }
    }

    const verifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("")
        try {
            const res = await axios.post("http://localhost:8093/password/verify-otp", { email, otp })
                setMessage(res.data.message)
                setStep(3)
        } catch (error) {
            setMessage(error?.response?.data?.message || "Invalid or expired OTP");
        } finally {
            setLoading(false)
        }
    }

    const resetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirm) {
            setMessage("Passwords do not match")
            return;
        }
        setLoading(true);
        setMessage("")
        try {
            const res = await axios.post("http://localhost:8093/password/reset-password", {
                email,
                otp,
                newPassword,
            });
            setMessage(res.data.message || "Password reset successfully.");
            setStep(1);
            setEmail('');
            setOtp('');
            setNewPassword('');
            navigate('/page/login')
        } catch (err) {
            setMessage(err?.response?.data?.message || "Failed to reset password");
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow" style={{ width: '400px' }}>
                <h3 className="text-center mb-3">Forgot Password</h3>

                {step === 1 && (
                    <>
                        <input
                            type="email"
                            className="form-control mb-3"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button className="btn btn-primary w-100" onClick={sendOtp}>
                            {loading ? "Sending..." : "Send OTP"}
                        </button>
                    </>
                )}

                {step === 2 && (

                    <form>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input className="form-control" type="email" value={email} disabled />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Enter OTP</label>
                            <input
                                type='text'
                                inputMode='numeric'
                                pattern='\d{6}'
                                placeholder='6-digit code'
                                required
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>

                        <div className="d-flex gap-2">
                            <button type="button" className="btn btn-outline-secondary"
                                onClick={async () => {
                                    setLoading(true); setMessage("");
                                    try {
                                        await axios.post("http://localhost:8093/password/forgot-password", { email })
                                        setMessage("OTP resent to your email");
                                    } catch {
                                        setMessage("Failed to resend OTP");
                                    } finally {
                                        setLoading(false);
                                    }
                                }}>
                                Resend OTP
                            </button>
                            <button onClick={verifyOtp} className="btn btn-primary flex-fill" disabled={loading}>
                                {loading ? "Verifying..." : "Verify OTP"}
                            </button>
                        </div>

                    </form>

                )}

                {step === 3 && (
                    <form onSubmit={resetPassword}>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input className="form-control" type="email" value={email} disabled />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">OTP (for safety)</label>
                            <input className="form-control"
                                type="text"
                                inputMode="numeric"
                                pattern="\d{6}"
                                required
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">New Password</label>
                            <input className="form-control"
                                type="password"
                                minLength={6}
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Confirm New Password</label>
                            <input className="form-control"
                                type="password"
                                minLength={6}
                                required
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)} />
                        </div>
                        <button className="btn btn-success w-100" disabled={loading}>
                            {loading ? "Updating..." : "Reset Password"}
                        </button>
                    </form>
                )}

                {message && <p className="text-center mt-3 text-muted">{message}</p>}
            </div>
        </div>
    )
}

export default ForgotPassword
