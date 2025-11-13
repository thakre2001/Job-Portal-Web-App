import React, { useCallback, useContext, useEffect, useState } from "react";
import { Services } from "../../BackendAPIs/Services";
import { UserContext } from "../UserContext";
import { Button, Modal, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./JobPage.css";

const JobPage = () => {
    const { user, token } = useContext(UserContext);
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [filteredJobs, setFilteredJobs] = useState([]);

    const [searchJob, setSearchJob] = useState("");
    const [employementFilter, setEmployementFilter] = useState("")
    const [experienceFilter, setExperienceFilter] = useState("")

    const [jobSaved, setJobSaved] = useState([])

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                let res
                if (!user) {
                    res = await Services.getAllJobs();
                } else {
                    res = await Services.getAllJobForUser(token)
                }
                // console.log(res.data);

                if (res.status === 200) {
                    setJobs(res.data);
                    setFilteredJobs(res.data);
                }
            } catch (error) {
                console.error("Error fetching jobs", error);
            }
        };
        fetchJobs();
    }, [user, token]);

    const onSearchChange = (e) => {
        const value = e.target.value;
        setSearchJob(value)

        if (!value.trim()) {
            setFilteredJobs(jobs)
        }
    }

    const applyFilters = useCallback(() => {
        let filtered = jobs;
        if (searchJob.trim()) {
            const terms = searchJob.toLowerCase().split(" ").filter(Boolean)
            filtered = filtered.filter((job) => {
                const jobTitle = job.jobTitle?.toLowerCase() || "";
                const company = (job.companyName && job.companyName?.toLowerCase()) || "";
                const location = (job.companyAddress && job.companyAddress?.city.toLowerCase()) || "";
                const employmentType = (job.employmentType && job.employmentType.toLowerCase()) || "";

                return terms.every(term =>
                    jobTitle.includes(term) ||
                    company.includes(term) ||
                    location.includes(term) ||
                    employmentType.includes(term)
                )
            }
            )

        }

        if (experienceFilter) {

            if (experienceFilter === "0-1") {
                filtered = filtered.filter((job) => job.experienceMin >= 0 && job.experienceMax <= 1)
            } else if (experienceFilter === "1-3") {
                filtered = filtered.filter((job) => job.experienceMin >= 1 && job.experienceMax <= 3)
            } else if (experienceFilter === "3-5") {
                filtered = filtered.filter((job) => job.experienceMin >= 3 && job.experienceMax <= 5)
            } else if (experienceFilter === "5-10") {
                filtered = filtered.filter((job) => job.experienceMin >= 5 && job.experienceMax <= 10)
            } else if (experienceFilter === "10+") {
                filtered = filtered.filter((job) => job.experienceMin >= 10 && job.experienceMax >= 10)
            }

        }

        if (employementFilter) {
            filtered = filtered.filter((job) =>
                job.employmentType &&
                job.employmentType.toLowerCase().includes(employementFilter.toLowerCase()))
        }

        setFilteredJobs(filtered)
    }, [employementFilter, experienceFilter, searchJob,jobs])

    useEffect(() => {
        // console.log("employement Type filter", employementFilter);

        applyFilters()
    }, [applyFilters])

    useEffect(() => {

        const fetchSavedJobByUser = async () => {
            try {
                const res = await Services.fetchSavedJobByUser(token);
                console.log("saved jobs", res);

                if (res.status === 200) {
                    setJobSaved(res.data)
                }
            } catch (error) {

            }
        }

        fetchSavedJobByUser()

    }, [token])

    const handleEmployementTypeSearch = (value) => {
        setEmployementFilter(value)
    }

    const handleExperienceSearch = (value) => {
        setExperienceFilter(value)
        applyFilters()

    }

    const openApplyPage = (jobId) => {
        if (user) {
            window.open(`/apply/${jobId}`, "_blank")
        } else {
            navigate('/page/login')
        }
    }

    const handleSaveJob = async (jobId) => {
        console.log("token", token);

        if (token) {

            setJobSaved(prev => [...prev, { jobId }])
            try {
                const res = await Services.saveJobToUser(jobId, token)
                // console.log(res);
                if (res.status === 200) {
                    if (res.data && Array.isArray(res.data)) {
                        setJobSaved(res.data)
                    }
                } else {
                    setJobSaved(prev => prev.filter(job => job.jobId !== jobId))
                }
            } catch (error) {

            }
        } else {
            navigate('/page/login')
        }
    }

    const handleRemoveJob = async (jobId) => {
        if (token) {
            setJobSaved(prev => prev.filter(job => job.jobId !== jobId))

            try {
                const res = await Services.deleteSavedJobFromUser(jobId, token);
                if (res.status === 200) {
                    setJobSaved(...prev => prev.filter(job => job.jobId !== jobId))
                } else {
                    setJobSaved(prev => [...prev, { jobId }])
                }
            } catch (error) {

            }
        }
    }

    return (
        <div className="jobpage-wrapper bg-light">
            {/* Hero Section */}
            <section className="hero-banner text-center py-5 bg-primary text-white">
                <h1 className="fw-bold">Find Your Dream Job</h1>
                <p className="mb-4">Search from thousands of opportunities</p>

                <div className="search-bar d-flex justify-content-center gap-2">
                    <input
                        type="text"
                        value={searchJob}
                        onChange={onSearchChange}
                        placeholder="Search by job title, company, or location"
                        className="form-control w-25"
                    />
                    <select className="form-select cursor-pointer"
                        style={{ width: '15%' }}
                        onChange={(e) => handleEmployementTypeSearch(e.target.value)}
                        value={employementFilter}
                    >
                        <option value="">Select job</option>
                        <option value="full-time">Full time</option>
                        <option value="part-time">Part time</option>
                        <option value="internship">Internship</option>
                        <option value="contract">Contract</option>
                        <option value="freelance">Freelance</option>
                    </select>
                    <select className="form-select cursor-pointer"
                        style={{ width: '15%' }}
                        onChange={(e) => handleExperienceSearch(e.target.value)}
                        value={experienceFilter}
                    >
                        <option value="">Select experience</option>
                        <option value="0-1">0-1 years</option>
                        <option value="1-3">1-3 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5-10">5-10 years</option>
                        <option value="10+">10+ years</option>

                    </select>
                    <Button variant="warning" onClick={applyFilters}>
                        <i className="fa fa-search me-2"></i> Search
                    </Button>

                    {
                        (searchJob || employementFilter || experienceFilter) && (
                            <Button variant="danger ms-2" onClick={() => {
                                setFilteredJobs(jobs);
                                setSearchJob("")
                                setEmployementFilter("")
                                setExperienceFilter("")
                            }}>
                                <i className="fa fa-x"></i>Remove all filters
                            </Button>
                        )
                    }

                </div>
            </section>

            {/* Jobs Grid */}
            <section className="container py-5">
                <h2 className="mb-4 text-center fw-semibold">Latest Job Openings</h2>
                <div className="row g-4">
                    {filteredJobs.length > 0 ? (
                        filteredJobs
                            .filter((job) => job.status === 'ACTIVE')
                            .map((job) => (
                                <div className="col-lg-4 col-md-6" key={job.jobId}>
                                    <div className="job-card border rounded shadow-sm p-4 h-100 bg-white">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <div className="w-100 d-flex justify-content-between align-items-center">
                                                <h5 className="fw-bold">{job.jobTitle}</h5>
                                                {
                                                    !job.alreadyApplied && (
                                                        <i
                                                            className={`fa-${(jobSaved.some((saved) => saved.jobId === job.jobId) ? "solid" : "regular")} cursor-pointer fa-bookmark text-primary fs-3`}
                                                            onClick={() => {
                                                                if (jobSaved.some((saved) => saved.jobId === job.jobId)) {
                                                                    handleRemoveJob(job.jobId)
                                                                } else {
                                                                    handleSaveJob(job.jobId)
                                                                }
                                                            }}></i>
                                                    )
                                                }
                                            </div>
                                            {job.companyLogo && (
                                                <img
                                                    src={job.companyLogo}
                                                    alt="Company Logo"
                                                    style={{
                                                        width: "50px",
                                                        height: "50px",
                                                        objectFit: "contain",
                                                    }}
                                                />
                                            )}
                                        </div>

                                        <p className="mb-1 text-muted">{job.companyName}</p>
                                        <p className="small text-secondary">
                                            <i className="fa fa-map-marker-alt me-1"></i>
                                            {job.companyAddress?.city}, {job.companyAddress?.state}
                                        </p>

                                        <div className="mt-2">
                                            <Badge bg="info" className="me-2">
                                                {job.employmentType || "N/A"}
                                            </Badge>
                                            <Badge bg="secondary">
                                                {job.workMode || "Not specified"}
                                            </Badge>
                                        </div>

                                        <div className="mt-3 fw-semibold text-success">
                                            💰{" "}
                                            {job.salaryMin && job.salaryMax
                                                ? `${job.salaryMin} - ${job.salaryMax}`
                                                : job.salaryNegotiable
                                                    ? "Negotiable"
                                                    : "Not disclosed"}
                                        </div>

                                        {/* <div className="mt-3 fw-semibold text-success">
                                            {job.experienceMin && job.experienceMax
                                                ? `${job.experienceMin} - ${job.experienceMax}`
                                                : "Not disclosed"}
                                        </div> */}

                                        <div className="d-flex justify-content-between mt-4">
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                onClick={() => {
                                                    setSelectedJob(job);
                                                    setShowDetails(true);
                                                }}
                                            >
                                                View Details
                                            </Button>
                                            {
                                                job.alreadyApplied ? (
                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        disabled
                                                    >
                                                        Already applied
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        variant="success"
                                                        size="sm"
                                                        onClick={() => openApplyPage(job.jobId)}
                                                    >
                                                        Apply
                                                    </Button>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))
                    ) : (
                        <p className="text-center text-muted">No jobs found.</p>
                    )}
                </div>
            </section >

            {/* Job Details Modal */}
            {
                selectedJob && (
                    <Modal
                        show={showDetails}
                        onHide={() => setShowDetails(false)}
                        size="lg"
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>{selectedJob.jobTitle}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h6>Company</h6>
                            <p className="fw-semibold">{selectedJob.companyName}</p>
                            <p className="text-muted">
                                {selectedJob.companyAddress?.streetAddress},{" "}
                                {selectedJob.companyAddress?.city},{" "}
                                {selectedJob.companyAddress?.state},{" "}
                                {selectedJob.companyAddress?.country}{" "}
                                {selectedJob.companyAddress?.postalCode}
                            </p>

                            <h6>Description</h6>
                            <p>{selectedJob.jobDescription}</p>

                            <h6>Requirements</h6>
                            <ul>
                                <li>
                                    Experience: {selectedJob.experienceMin || 0} -{" "}
                                    {selectedJob.experienceMax || "N/A"} years
                                </li>
                                <li>
                                    Education: {selectedJob.educationMin || "Not specified"}
                                </li>
                                <li>Skills: {selectedJob.skills?.join(", ") || "N/A"}</li>
                                <li>
                                    Languages: {selectedJob.languageKnown?.join(", ") || "N/A"}
                                </li>
                                <li>
                                    Certifications:{" "}
                                    {selectedJob.certificationRequired?.join(", ") || "N/A"}
                                </li>
                            </ul>

                            <h6>Salary & Benefits</h6>
                            <p>
                                {selectedJob.salaryMin && selectedJob.salaryMax
                                    ? `${selectedJob.salaryMin} - ${selectedJob.salaryMax}`
                                    : "Negotiable"}
                            </p>
                            <p>Bonuses: {selectedJob.bonuses || "N/A"}</p>
                            <p>Perks: {selectedJob.perks?.join(", ") || "N/A"}</p>

                            <h6>Recruiter Contact</h6>
                            <p>
                                {selectedJob.recruiterName} ({selectedJob.recruiterEmail})
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowDetails(false)}>
                                Close
                            </Button>
                            <Button
                                variant="success"
                                onClick={() => openApplyPage(selectedJob.jobId)}
                            >
                                Apply Now
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )
            }
        </div >
    );
};

export default JobPage;
