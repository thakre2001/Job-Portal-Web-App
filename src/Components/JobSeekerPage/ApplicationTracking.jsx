import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Services } from "../../BackendAPIs/Services";

const getStatusBadge = (status) => {
    switch (status) {
        case "PENDING":
            return <span className="badge bg-primary">{status}</span>;
        case "REVIEWED":
            return <span className="badge bg-info text-dark">{status}</span>;
        case "SHORTLISTED":
            return <span className="badge bg-warning text-dark">{status}</span>;
        case "INTERVIEW_SCHEDULED":
            return <span className="badge bg-secondary">{status}</span>;
        case "INTERVIEWED":
            return <span className="badge bg-dark">{status}</span>;
        case "OFFERED":
            return <span className="badge bg-success">{status}</span>;
        case "HIRED":
            return <span className="badge bg-success">{status}</span>;
        case "REJECTED":
            return <span className="badge bg-danger">{status}</span>;
        default:
            return <span className="badge bg-light text-dark">{status}</span>;
    }
};


export default function ApplicationTracking() {
    const { user, token } = useContext(UserContext)
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const response = await Services.fetchApplicantAppliedJob(token);
                console.log(response.data);

                setApplications(response.data)

            } catch (error) {

            }
        }

        fetchAppliedJobs()
    }, [user])
    return (
        <div className="container" style={{ paddingTop: 100 }}>
            <h2 className="fw-bold mb-4">My Applications</h2>
            <div className="row g-3">
                {applications.map((app) => (
                    <div key={app.id} className="col-12">
                        <div className="card shadow-sm border-0 rounded-3">
                            <div className="card-body d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="card-title mb-1">{app.jobTitle}</h5>
                                    <p className="card-text text-muted mb-1">{app.company}</p>
                                    <small className="text-secondary">
                                        Applied on {app.appliedAt}
                                    </small>
                                </div>
                                <div>{getStatusBadge(app.status)}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
