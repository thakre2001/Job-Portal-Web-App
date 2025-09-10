import React, { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import './ResumeBuilder.css';

const ResumeBuilder = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    education: [{ type: '', institution: '', startYear: '', endYear: '', percentage: '' }],
    experience: '',
    skills: '',
    projects: '',
    achievements: '',
    summary: '',
  });

  const resumeRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEducation = [...form.education];
    updatedEducation[index][name] = value;
    setForm({ ...form, education: updatedEducation });
  };

  const addEducation = () => {
    setForm({
      ...form,
      education: [...form.education, { type: '', institution: '', startYear: '', endYear: '', percentage: '' }],
    });
  };

  const handleDownload = () => {
    const opt = {
      margin: 0.5,
      filename: 'My_Resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().set(opt).from(resumeRef.current).save();
  };

  return (
    <div className="container" style={{paddingTop:100}}>
      <h2 className="text-center mb-4">Advanced Resume Builder</h2>
      <div className="row">
        {/* Form Section */}
        <div className="col-md-6">
          <div className="form-section p-3 bg-white shadow rounded mb-4">
            {['fullName', 'email', 'phone', 'address', 'summary', 'experience', 'skills', 'projects', 'achievements'].map((field) => (
              <div className="mb-3" key={field}>
                <label className="form-label text-capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                <textarea
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  rows={field === 'summary' ? 3 : 2}
                  className="form-control"
                  placeholder={`Enter your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}...`}
                />
              </div>
            ))}

            <h5 className="mt-4">Education</h5>
            {form.education.map((edu, index) => (
              <div key={index} className="mb-3 border rounded p-3">
                <input
                  type="text"
                  name="type"
                  placeholder="Education Type (e.g. B.Sc, M.Tech)"
                  value={edu.type}
                  onChange={(e) => handleEducationChange(index, e)}
                  className="form-control mb-2"
                />
                <input
                  type="text"
                  name="institution"
                  placeholder="Institution Name"
                  value={edu.institution}
                  onChange={(e) => handleEducationChange(index, e)}
                  className="form-control mb-2"
                />
                <input
                  type="text"
                  name="startYear"
                  placeholder="Start Year"
                  value={edu.startYear}
                  onChange={(e) => handleEducationChange(index, e)}
                  className="form-control mb-2"
                />
                <input
                  type="text"
                  name="endYear"
                  placeholder="End Year"
                  value={edu.endYear}
                  onChange={(e) => handleEducationChange(index, e)}
                  className="form-control mb-2"
                />
                <input
                  type="text"
                  name="percentage"
                  placeholder="Percentage (Optional)"
                  value={edu.percentage}
                  onChange={(e) => handleEducationChange(index, e)}
                  className="form-control"
                />
              </div>
            ))}
            <button className="btn btn-secondary mb-3" onClick={addEducation}>Add More Education</button>

            <button className="btn btn-primary" onClick={handleDownload}>Download as PDF</button>
          </div>
        </div>

        {/* Preview Section */}
        <div className="col-md-6">
          <div className="resume-preview p-4 bg-light rounded shadow" ref={resumeRef}>
            <h2 className="text-center">{form.fullName}</h2>
            <p className="text-center">{form.email} | {form.phone} | {form.address}</p>
            <hr />
            <section>
              <h5>Summary</h5>
              <p>{form.summary}</p>
            </section>
            <section>
              <h5>Education</h5>
              {form.education.map((edu, index) => (
                <div key={index}>
                  <p><strong>{edu.type}</strong> at {edu.institution} ({edu.startYear} - {edu.endYear}) {edu.percentage && ` - ${edu.percentage}%`}</p>
                </div>
              ))}
            </section>
            <section>
              <h5>Experience</h5>
              <p>{form.experience}</p>
            </section>
            <section>
              <h5>Skills</h5>
              <p>{form.skills}</p>
            </section>
            <section>
              <h5>Projects</h5>
              <p>{form.projects}</p>
            </section>
            <section>
              <h5>Achievements</h5>
              <p>{form.achievements}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
