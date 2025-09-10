import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../UserContext";
import { Services } from "../../BackendAPIs/Services";
import defaultProfileImage from "../../Assests/defaultprofile.jpg";
import ImageCropper from "../CropperComponents/ImageCropper";
import { useNavigate } from "react-router-dom";

const RecruiterProfile = () => {
    const { user, setUser, token } = useContext(UserContext);
    const navigate = useNavigate()

    const [editMode, setEditMode] = useState(false);
    const [formValues, setFormValues] = useState(user);
    const fileInputRef = useRef(null);
    const [profilePhotoURL, setProfilePhotoURL] = useState(
        user?.profilePhoto ? `data:image/jpeg;base64,${user?.profilePhoto}` : null
    );
    const [cropMode, setCropMode] = useState(false);
    const [tempPhotoURL, setTempPhotoURL] = useState(null);

    const [recruiterJobs, setRecruiterJobs] = useState([])
    const [jobToDelete, setJobToDelete] = useState(null)

    // ✅ Update form state when user changes
    useEffect(() => {
        setFormValues(user);
        if (user?.profilePhoto) {
            setProfilePhotoURL(`data:image/jpeg;base64,${user?.profilePhoto}`);
        }

        if (user?.role === 'RECRUITER') {
            const fetchRecruiterJobs = async () => {
                try {
                    const res = await Services.getRecruiterJobs(token);
                    if (res.status === 200) {
                        setRecruiterJobs(res.data)
                    }
                } catch (error) {

                }
            }
            fetchRecruiterJobs()
        }
    }, [user]);

    // 📷 Handle Photo Upload + Crop
    const handleProfilePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const photoURL = URL.createObjectURL(file);
            setTempPhotoURL(photoURL);
            setCropMode(true);
        }
    };

    const handleCropDone = async (croppedURL, croppedBlob) => {
        setProfilePhotoURL(croppedURL);
        setCropMode(false);
        setTempPhotoURL(null);

        const formData = new FormData();
        formData.append("file", croppedBlob);

        try {
            const response = await Services.uploadPhoto(formData, token);
            setUser(response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
        } catch (error) {
            console.error("Photo upload failed", error);
        }
    };

    const handleCropCancel = () => {
        setCropMode(false);
        setTempPhotoURL(null);
    };

    // ✍️ Editing Profile
    const handleEditClick = () => setEditMode(true);
    const handleCancelClick = () => {
        setEditMode(false);
        setFormValues(user);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSaveClick = async () => {
        setEditMode(false);
        try {
            console.log('recruiter updating fields',formValues);
            
            const response = await Services.updateRecruiter(formValues, token);
            if (response.status === 200) {
                setUser(response.data);
                localStorage.setItem("user", JSON.stringify(response.data));
            }
        } catch (error) {
            console.error("Failed to update recruiter", error);
        }
    };

    const handleDeleteJob = async () => {
        try {
            const res = await Services.deleteJob(jobToDelete, token);
            if (res.status === 200) {
                setRecruiterJobs(recruiterJobs.filter((e) => e.jobId !== jobToDelete))
                setJobToDelete(null)
            }
        } catch (error) {

        }
    }

    const [applications, setApplications] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);

    const fetchApplications = async (jobId) => {
        try {
            const res = await Services.getApplicationsByJob(jobId, token);
            console.log('applications', res.data);

            if (res.status === 200) {
                setApplications(res.data);
                setSelectedJob(jobId);
            }
        } catch (error) {
            console.error("Failed to fetch applications", error);
        }
    };

    const changeJobStatus = async (jobId, status) => {

        try {
            const response = await Services.changeJobStatus(jobId, token, status);
            if (response.status === 200) {
                setRecruiterJobs(recruiterJobs.map(job => job.jobId === jobId ? { ...job, status } : job))
            }
        } catch (error) {
            console.error("Failed to update status", error);
        }

    }

    const updateApplicationStatus = async (appId, status) => {
        try {
            const res = await Services.updateApplicationStatus(appId, status, token);
            if (res.status === 200) {
                setApplications(applications.map(a =>
                    a.id === appId ? { ...a, status } : a
                ));
            }
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    const downloadResume = async (applicationId) => {
        try {
            const response = await fetch(`http://localhost:8093/job-application/${applicationId}/resume`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error("Download failed");

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `resume_${applicationId}.pdf`;
            link.click();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error(err);
        }
    };


    const statusColors = {
        DRAFT: "secondary",
        ACTIVE: "success",
        DELETED: "danger",
        HIDDEN: "dark",
        CLOSED: "warning",
        FILLED: "primary",
        CANCELLED: "info"
    };

    const closeJobPermanently = (jobId) => {
        window.confirm("Do you really want to close job");

        changeJobStatus(jobId, "CLOSED")
    }



    return (
        <div className="profile-wrapper">
            <div className="profile-card bg-light">
                {/* Header with Photo */}
                <div className="profile-header bg-white d-flex gap-3">
                    <div className="d-flex align-items-center gap-3">
                        <div className="photo-container">
                            <img
                                src={profilePhotoURL || defaultProfileImage}
                                className="profile-photo"
                                alt="profile"
                                onClick={() => {
                                    if (user?.profilePhoto) {
                                        setTempPhotoURL(`data:image/jpeg;base64,${user?.profilePhoto}`);
                                        setCropMode(true);
                                    }
                                }}
                            />
                            <label
                                htmlFor="profile-upload"
                                className="edit-photo-label"
                                onClick={() => fileInputRef.current.click()}
                            >
                                <i className="fa fa-camera"></i>
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleProfilePhotoChange}
                                style={{ display: "none" }}
                                id="profile-upload"
                            />
                        </div>
                        <div>
                            {editMode ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={formValues?.name || ""}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p className="fs-3 fw-bold">{user?.name}</p>
                            )}
                            <span className="badge bg-info">{user?.role}</span>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="p-4">
                        <div className="info-row gap-2">
                            <i className="fa fa-envelope"></i>
                            <span>{user?.email}</span>
                        </div>

                        <div className="info-row gap-2">
                            <i className="fa fa-phone"></i>
                            {editMode ? (
                                <input
                                    type="tel"
                                    name="mobile"
                                    value={formValues?.mobile || ""}
                                    onChange={handleChange}
                                />
                            ) : (
                                <span>{user?.mobile}</span>
                            )}
                        </div>

                        <div className="info-row gap-2">
                            <i className="fa fa-id-badge"></i>
                            {editMode ? (
                                <input
                                    type="text"
                                    name="recruiterDesignation"
                                    value={formValues?.recruiterDesignation || ""}
                                    onChange={handleChange}
                                    placeholder="e.g. HR Manager"
                                />
                            ) : (
                                <span>{user?.recruiterDesignation}</span>
                            )}
                        </div>

                        <div className="info-row gap-2">
                            <i className="fa fa-phone-square"></i>
                            {editMode ? (
                                <input
                                    type="text"
                                    name="alternateContact"
                                    value={formValues?.alternateContact || ""}
                                    onChange={handleChange}
                                />
                            ) : (
                                <span>{user?.alternateContact}</span>
                            )}
                        </div>

                        <div className="action-buttons mt-3 text-end">
                            {editMode ? (
                                <>
                                    <button
                                        className="btn btn-secondary me-2"
                                        onClick={handleCancelClick}
                                    >
                                        Cancel
                                    </button>
                                    <button className="btn btn-success" onClick={handleSaveClick}>
                                        Save
                                    </button>
                                </>
                            ) : (
                                <button className="btn btn-primary" onClick={handleEditClick}>
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Company Info */}
                <div className="profile-body p-4 bg-white" style={{ borderRadius: '20px' }}>
                    <h5>Company Information</h5>
                    <p><strong>{user?.company?.companyName}</strong></p>
                    <p>{user?.company?.industryType}</p>
                    <p>{user?.company?.companyWebsite}</p>
                    <p>{user?.company?.address?.city}</p>
                </div>

                {/* Jobs Management Section */}
                <div className="jobs-section bg-white p-4 mt-4" style={{ borderRadius: '20px', overflow: 'hidden' }}>
                    <h5>Jobs Posted</h5>
                    {/* TODO: Fetch recruiter jobs from backend */}
                    <button className="btn btn-outline-primary mb-3" onClick={() => navigate('/page/jobpostform')}>
                        + Post New Job
                    </button>
                    <ul className="list-group">
                        {/* map recruiterJobs here */}
                        <ul className="list-group">
                            {
                                recruiterJobs !== null && recruiterJobs.map((job) => (
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        <div>
                                            <h6 className="mb-1">{job.jobTitle}</h6>
                                            <small className="text-muted">Posted on {job.postedAt}</small>
                                        </div>

                                        <div className="d-flex gap-2 align-items-center">

                                            {/* Status badge */}
                                            <span className={`badge rounded-pill bg-${statusColors[job.status] || 'secondary'}`}>
                                                {job.status}
                                            </span>


                                            <div className="d-flex gap-2">
                                                {
                                                    ["DRAFT", "ACTIVE", "HIDDEN"].includes(job.status) && (
                                                        <button className="btn btn-sm btn-outline-info">Edit</button>
                                                    )
                                                }

                                                {
                                                    ["CLOSED", "ARCHIVED"].includes(job.status) && (
                                                        <button className="btn btn-sm btn-outline-secondary" disabled>Edit Disabled</button>
                                                    )
                                                }

                                                {job.status === "DRAFT" && (
                                                    <button className="btn btn-sm btn-success" onClick={() => changeJobStatus(job.jobId, "ACTIVE")}>
                                                        Publish
                                                    </button>
                                                )}

                                                {job.status === "ACTIVE" && (
                                                    <>
                                                        <button className="btn btn-sm btn-warning" onClick={() => changeJobStatus(job.jobId, "HIDDEN")}>
                                                            Hide
                                                        </button>
                                                        <button className="btn btn-sm btn-danger" onClick={() => closeJobPermanently(job.jobId)}>
                                                            Close
                                                        </button>
                                                    </>
                                                )}

                                                {job.status === "HIDDEN" && (
                                                    <>
                                                        <button className="btn btn-sm btn-success" onClick={() => changeJobStatus(job.jobId, "ACTIVE")}>
                                                            Activate
                                                        </button>
                                                        <button className="btn btn-sm btn-secondary" onClick={() => changeJobStatus(job.jobId, "ARCHIVED")}>
                                                            Archive
                                                        </button>
                                                    </>
                                                )}

                                                {job.status === "CLOSED" && (
                                                    <button className="btn btn-sm btn-secondary" onClick={() => changeJobStatus(job.jobId, "ARCHIVED")}>
                                                        Archive
                                                    </button>
                                                )}
                                            </div>


                                            <button className="btn btn-sm btn-outline-primary" onClick={() => fetchApplications(job.jobId)}>
                                                Applications ({job.applicationCount})
                                            </button>
                                        </div>
                                    </li>
                                ))
                            }

                        </ul>

                        {selectedJob && (
                            <div className="position-fixed w-100 start-0  d-flex align-items-center justify-content-center bg-dark bg-opacity-50">
                                <div className="bg-white rounded-lg p-4 shadow-lg w-75">
                                    <h4>Applications for Job #{selectedJob}</h4>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Applicant</th>
                                                <th>Email</th>
                                                <th>Applied On</th>
                                                <th>Status</th>
                                                <th>Change Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {applications.map(app => (
                                                <tr key={app.id}>
                                                    <td>{app.applicantName}</td>
                                                    <td>{app.applicantEmail}</td>
                                                    <td>{app.appliedAt}</td>
                                                    <td>
                                                        <span className={`badge bg-${app.status === "HIRED" ? "success" : app.status === "REJECTED" ? "danger" : "secondary"}`}>
                                                            {app.status}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        {

                                                            <select
                                                                disabled={app.jobStatus === "CLOSED"}
                                                                value={app.status}
                                                                onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                                                                className="form-select"
                                                            >
                                                                <option value="PENDING">Pending</option>
                                                                <option value="REVIEWED">Reviewed</option>
                                                                <option value="SHORTLISTED">Shortlisted</option>
                                                                <option value="INTERVIEW_SCHEDULED">Interview scheduled</option>
                                                                <option value="INTERVIEWED">Interviwed</option>
                                                                <option value="OFFERED">Offered</option>
                                                                <option value="REJECTED">Rejected</option>
                                                                <option value="HIRED">Hired</option>
                                                            </select>

                                                        }
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-sm btn-outline-success"
                                                            onClick={() => downloadResume(app.id)}
                                                        >
                                                            Download Resume
                                                        </button>

                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>
                                    <button className="btn btn-secondary mt-3" onClick={() => setSelectedJob(null)}>Close</button>
                                </div>
                            </div>
                        )}

                        {jobToDelete && (
                            <div className="position-fixed inset-0 d-flex align-items-center justify-content-center bg-dark bg-opacity-50">
                                <div className="bg-white rounded-lg p-6 shadow-lg w-80 text-center">
                                    <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
                                    <p className="mb-6">Are you sure you want to delete this job?</p>
                                    <div className="d-flex justify-content-between">
                                        <button
                                            onClick={() => setJobToDelete(null)}
                                            className="px-4 py-2 bg-secondary rounded-md"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleDeleteJob}
                                            className="px-4 py-2 bg-danger text-white rounded-md"
                                        >
                                            Yes, Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </ul>
                </div>
            </div>

            {/* Image Cropper Overlay */}
            {cropMode && (
                <div className="crop-overlay">
                    <ImageCropper
                        imageSrc={tempPhotoURL}
                        onCropDone={handleCropDone}
                        onCancel={handleCropCancel}
                    />
                </div>
            )}
        </div>
    );
};

export default RecruiterProfile;
