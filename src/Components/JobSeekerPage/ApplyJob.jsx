import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Services } from "../../BackendAPIs/Services";
import { UserContext } from "../UserContext";
import { toast } from "react-toastify";

const ApplyJob = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const { token } = useContext(UserContext);
    const [job, setJob] = useState(null);
    const [formData, setFormData] = useState({
        resume: null,
        coverLetter: "",
    });

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await Services.getJobById(jobId);
                console.log(res.data);
                if (res.status === 200) {
                    setJob(res.data);
                }
            } catch (error) {
                toast.error("Failed to load job details");
            }
        };
        fetchJob();
    }, [jobId]);

    const handleFileChange = (e) => {
        setFormData({ ...formData, resume: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            navigate("/page/login");
            return;
        }

        try {
            const formDataObj = new FormData();
            formDataObj.append("resume", formData.resume);
            formDataObj.append("coverLetter", formData.coverLetter);

            const res = await Services.applyToJob(jobId, formDataObj, token);

            if (res.status === 200) {
                toast.success(res.data?.message || "Application submitted!");
                navigate("/page/jobpage");
            }
        } catch (error) {
            toast.error("Failed to apply for the job");
        }
    };

    if (!job)
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
                <div className="spinner-border text-primary" role="status"></div>
            </div>
        );

    return (
        <div className="container" style={{ paddingTop: 100 }}>
            {/* Job Card */}
            <div className="card shadow-lg border-0 rounded-4 mb-5">
                <div className="card-body p-4 d-flex flex-column flex-md-row align-items-start gap-4">
                    {/* Company Logo */}
                    <div
                        className="d-flex align-items-center justify-content-center rounded overflow-hidden"
                        style={{
                            width: "80px",
                            height: "80px",
                            backgroundColor: "#f4f6f9",
                            flexShrink: 0,
                        }}
                    >
                        {job.companyLogo ? (
                            <img
                                src={job.companyLogo}
                                alt={`${job.companyName} Logo`}
                                className="img-fluid"
                                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                            />
                        ) : (
                            <i className="bi bi-building text-secondary fs-1"></i>
                        )}
                    </div>

                    {/* Job Info */}
                    <div className="flex-grow-1">
                        <h3 className="fw-bold text-dark mb-1">{job.jobTitle}</h3>
                        <h5 className="text-primary fw-semibold mb-2">{job.companyName}</h5>

                        <p className="text-muted mb-2">
                            <i className="bi bi-geo-alt-fill me-2 text-danger"></i>
                            {job.companyAddress.city}, {job.companyAddress.state},{" "}
                            {job.companyAddress.country}
                        </p>

                        {/* Extra job highlights */}
                        <div className="d-flex flex-wrap gap-2 mt-2">
                            <span className="badge rounded-pill bg-light text-dark px-3 py-2">
                                Full Time
                            </span>
                            <span className="badge rounded-pill bg-light text-dark px-3 py-2">
                                Experience: {job.experience || "Not Mentioned"}
                            </span>
                            <span className="badge rounded-pill bg-light text-dark px-3 py-2">
                                Posted: {job.postedAt}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="border-top px-4 py-3">
                    <h5 className="fw-semibold">Job Description</h5>
                    <p className="text-muted">{job.jobDescription}</p>
                </div>
            </div>

            {/* Apply Form */}
            <div className="card shadow-lg border-0 rounded-4">
                <div className="card-body p-4">
                    <h4 className="fw-semibold mb-4 text-success">Apply for this Job</h4>
                    <form onSubmit={handleSubmit}>
                        {/* Resume Upload */}
                        <div className="mb-4">
                            <label className="form-label fw-semibold">Upload Resume</label>
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                className="form-control"
                                onChange={handleFileChange}
                                required
                            />
                            <div className="form-text text-muted">
                                Accepted formats: PDF, DOC, DOCX
                            </div>
                        </div>

                        {/* Cover Letter */}
                        <div className="mb-4">
                            <label className="form-label fw-semibold">Cover Letter</label>
                            <textarea
                                rows={5}
                                className="form-control"
                                placeholder="Write a short cover letter to stand out..."
                                value={formData.coverLetter}
                                onChange={(e) =>
                                    setFormData({ ...formData, coverLetter: e.target.value })
                                }
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="btn btn-success px-4 py-2 rounded-pill shadow-sm"
                        >
                            Submit Application
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ApplyJob;
