import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";

const SettingsPage = () => {
    const [notifications, setNotifications] = useState(true);
    const [privacy, setPrivacy] = useState("public");

    return (
        <div className="container" style={{ paddingTop: 100 }}>
            <h2 className="mb-4">Settings</h2>

            {/* Account Settings */}
            <Card className="p-3 mb-4 shadow-sm">
                <h5>Account Settings</h5>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Update Email" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Update Password" />
                    </Form.Group>
                    <Button variant="primary">Save Changes</Button>
                </Form>
            </Card>

            {/* Notifications */}
            <Card className="p-3 mb-4 shadow-sm d-flex flex-row justify-content-between align-items-center">
                <div>
                    <h5>Job Notifications</h5>
                    <small className="text-muted">
                        Receive alerts for new jobs and recruiter messages.
                    </small>
                </div>
                <Form.Check
                    type="switch"
                    id="notifications-switch"
                    label=""
                    checked={notifications}
                    onChange={() => setNotifications(!notifications)}
                />
            </Card>

            {/* Privacy */}
            <Card className="p-3 mb-4 shadow-sm">
                <h5>Privacy</h5>
                <Form.Select
                    value={privacy}
                    onChange={(e) => setPrivacy(e.target.value)}
                >
                    <option value="public">Visible to all recruiters</option>
                    <option value="restricted">Visible to selected recruiters</option>
                    <option value="private">Hidden from recruiters</option>
                </Form.Select>
            </Card>

            {/* Job Preferences */}
            <Card className="p-3 mb-4 shadow-sm">
                <h5>Job Preferences</h5>
                <Form.Group className="mb-2">
                    <Form.Control
                        type="text"
                        placeholder="Preferred Role (e.g., Full Stack Developer)"
                    />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Control
                        type="text"
                        placeholder="Preferred Location (e.g., Bangalore)"
                    />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Control type="number" placeholder="Expected Salary (LPA)" />
                </Form.Group>
                <Button variant="primary">Save Preferences</Button>
            </Card>

            {/* Danger Zone */}
            <Card className="p-3 shadow-sm border border-danger">
                <h5 className="text-danger">Danger Zone</h5>
                <Button variant="danger" className="mt-2">
                    Delete Account
                </Button>
            </Card>
        </div>
    );
};

export default SettingsPage;
