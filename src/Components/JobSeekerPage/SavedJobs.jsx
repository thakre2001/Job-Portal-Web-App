import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Services } from "../../BackendAPIs/Services";
import { UserContext } from "../UserContext";

const SavedJobs = () => {
    const { token } = useContext(UserContext)
    const [savedJobs, setSavedJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    // Fetch all saved jobs for the logged-in user
    useEffect(() => {
        const fetchSavedJobs = async () => {
            try {
                const res = await Services.fetchSavedJobByUser(token);
                console.log("saved job page jobs", savedJobs);

                if (res.status === 200) {
                    setSavedJobs(res.data);
                }
            } catch (error) {
                console.error("Error fetching saved jobs:", error);
            }
        };

        if (token) {
            fetchSavedJobs();
        }
    }, [token]);

    const handleUnsaveJob = async (jobId) => {
        try {
            const res = await Services.removeSavedJob(jobId, token);
            if (res.status === 200) {
                setSavedJobs(savedJobs.filter((job) => job.jobId !== jobId));
            }
        } catch (error) {
            console.error("Error unsaving job:", error);
        }
    };

    const handleApplyJob = (jobId) => {
        navigate(`/apply/${jobId}`);
    };

    const handleViewDetails = (job) => {
        setSelectedJob(job);
        setShowModal(true);
    };

    return (
        <div className="container" style={{ paddingTop: 100 }}>
            <h3 className="mb-3">Saved Jobs</h3>
            {savedJobs.length === 0 ? (
                <p>No saved jobs yet.</p>
            ) : (
                <ul className="list-group">
                    {savedJobs.map((job) => (
                        <li
                            key={job.jobId}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            <div>
                                <h5>{job.jobTitle}</h5>
                                <p className="mb-1 text-muted">
                                    {job.companyName} | {job.location?.join(", ")}
                                </p>
                                <small>{job.employmentType}</small>
                            </div>
                            <div className="d-flex gap-2">
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => handleApplyJob(job.jobId)}
                                >
                                    Apply
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleUnsaveJob(job.jobId)}
                                >
                                    Unsave
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => handleViewDetails(job)}
                                >
                                    View Details
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {/* Modal for Job Details */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{selectedJob?.jobTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedJob && (
                        <>
                            <p>
                                <strong>Company:</strong> {selectedJob.companyName}
                            </p>
                            <p>
                                <strong>Location:</strong>{" "}
                                {selectedJob.location?.join(", ")}
                            </p>
                            <p>
                                <strong>Employment Type:</strong> {selectedJob.employmentType || "Not mentioned"}
                            </p>
                            <p>
                                <strong>Experience:</strong>{" "}
                                {selectedJob.experienceMin} - {selectedJob.experienceMax} years
                            </p>
                            <hr />
                            <p>
                                <strong>Description:</strong>
                            </p>
                            <p>{selectedJob.jobDescription}</p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleApplyJob(selectedJob.jobId)}>
                        Apply
                    </Button>
                    <Button variant="danger" onClick={() => handleUnsaveJob(selectedJob.jobId)}>
                        Unsave
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default SavedJobs;
