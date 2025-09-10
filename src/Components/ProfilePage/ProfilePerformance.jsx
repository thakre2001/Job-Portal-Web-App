import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { UserContext } from "../UserContext";
import { Services } from "../../BackendAPIs/Services";

const ProfilePerformance = () => {
    const { user, token } = useContext(UserContext);
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

    const jobStats = [
        { status: "Applied", count: applications.length },
        { status: "Shortlisted", count: applications.filter((app)=>app.status==='SHORTLISTED').length },
        { status: "Interview", count: 2 },
        { status: "Rejected", count: applications.filter((app)=>app.status==='REJECTED').length },
        { status: "Offers", count: applications.filter((app)=>app.status==='HIRED').length  },
    ];


    const calculateProfilezCompletion = (user) => {
        let completion = 0;

        if (user) {
            if (user.name) completion += 10;
            if (user.email) completion += 10;
            if (user.mobile) completion += 10;
            if (user.profilePhoto) completion += 15;
            if (user.resume) completion += 20;
            if (user.skills && user.skills.length > 0) completion += 10;
            if (user.education && user.education.length > 0) completion += 15;
            if (user.experience && user.experience.length > 0) completion += 10;
        }

        return completion;
    }

    const profileStrength = calculateProfilezCompletion(user);

    return (
        <div className="container" style={{ paddingTop: 100 }}>
            <h2 className="mb-4">Profile Performance</h2>

            {/* Profile Strength */}
            <Card className="mb-4 p-3 shadow-sm">
                <h5>Profile Strength</h5>
                <div className="progress mt-2">
                    <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${profileStrength}%` }}
                        aria-valuenow={profileStrength}
                        aria-valuemin="0"
                        aria-valuemax="100"
                    >
                        {profileStrength}%
                    </div>
                </div>
                <small className="text-muted">
                    Complete your profile with skills, resume, and experience to improve
                    visibility.
                </small>
            </Card>

            {/* Profile Views */}
            <Card className="mb-4 p-3 shadow-sm">
                <h5>Profile Views (Last 30 Days)</h5>
                <h3 className="text-primary mt-2">128</h3>
                <p className="text-muted">Recruiters viewed your profile recently.</p>
            </Card>

            {/* Job Application Analytics */}
            <Card className="p-3 shadow-sm">
                <h5 className="mb-3">Job Application Status</h5>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={jobStats}>
                        <XAxis dataKey="status" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#0d6efd" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </Card>
        </div>
    );
};

export default ProfilePerformance;
