import React, { useContext, useState } from "react";
import { Services } from "../../BackendAPIs/Services";
import { UserContext } from "../UserContext";

const EducationForm = () => {

  const { user, setUser, token } = useContext(UserContext)

  const [showEduForm, setShowEduForm] = useState(false);
  const [editingEdu, setEditingEdu] = useState(null);

  const [form, setForm] = useState(
    editingEdu || {
      educationType: "",
      organization: "",
      startYear: "",
      endYear: "",
      percentage: "",
    }
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSaveEdu = async (e) => {
    e.preventDefault();
    // const educationId=editingEdu.id;
    try {
      let res;
      if (editingEdu) {
        res = await Services.updateEducation(editingEdu.id, form, token);
      } else {
        res = await Services.addEducation(form, token);
      }
      setUser({ ...user, education: user.education.map((edu) => edu.id === res.data.id ? res.data : edu) });
      setShowEduForm(false);
      setEditingEdu(null);
    } catch (err) {
      console.error("Error saving education", err);
    }
  };

  const handleDeleteEdu = async (id) => {
    try {
      await Services.deleteEducation(id, token);
      setUser({ ...user, education: user.education.filter((e) => e.id !== id) });
    } catch (err) {
      console.error("Error deleting education", err);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md" style={{borderRadius:"20px",marginBottom: "30px"}}>

      <h3 className="text-lg font-semibold">Education</h3>
      <ul className="mt-4 ps-0 ">
        {user?.education?.map((edu) => (
          <li key={edu.id} className="mb-2 rounded">
            {editingEdu?.id === edu.id ? (
              // Inline edit mode
              <div>
                <div className="d-flex justify-content-between align-items-center">
                  <h3 className="font-bold mb-2">
                    Edit Education
                  </h3>
                  <i className="fa fa-trash text-danger fs-5 cursor-pointer"
                    onClick={() => handleDeleteEdu(edu.id)}
                  ></i>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveEdu(e);
                  }}
                >
                  <input
                    type="text"
                    name="educationType"
                    value={form.educationType}
                    onChange={handleChange}
                    className="border p-1 w-full mb-1"
                    required
                  />
                  <input
                    type="text"
                    name="organization"
                    value={form.organization}
                    onChange={handleChange}
                    className="border p-1 w-full mb-1"
                    required
                  />
                  <input
                    type="number"
                    name="startYear"
                    value={form.startYear}
                    onChange={handleChange}
                    className="border p-1 w-full mb-1"
                    required
                  />
                  <input
                    type="number"
                    name="endYear"
                    value={form.endYear}
                    onChange={handleChange}
                    className="border p-1 w-full mb-1"
                  />
                  <input
                    type="number"
                    name="percentage"
                    value={form.percentage}
                    onChange={handleChange}
                    className="border p-1 w-full mb-1"
                  />
                  <div className="d-flex justify-content-end gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingEdu(null);
                        setForm({
                          educationType: "",
                          organization: "",
                          startYear: "",
                          endYear: "",
                          percentage: "",
                        });
                      }}
                      className="btn btn-danger px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-success text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              // Normal view mode
              <>
                <div className="d-flex flex-column">
                  <div className="d-flex gap-2 mt-1 align-items-center">
                    <strong>{edu.educationType}</strong>
                    <i className="fa fa-pen me-1 text-primary cursor-pointer"
                      onClick={() => {
                        setEditingEdu(edu);
                        setForm(edu);
                        setShowEduForm(false);
                      }}
                    ></i>
                  </div>
                  <span>{edu.organization}</span>
                  <span>{edu.startYear} → {edu.endYear || "Ongoing"}</span>
                  <span>{edu.percentage}%</span>
                </div>
              </>
            )}
          </li>
        ))}

      </ul>
      {showEduForm && !editingEdu && (
        <div>
          <h3 className="font-bold mb-2">
            Add Education
          </h3>
          <form onSubmit={handleSaveEdu}>
            <input
              type="text"
              name="educationType"
              placeholder="Education Type"
              value={form.educationType}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
              required
            />
            <input
              type="text"
              name="organization"
              placeholder="Organization"
              value={form.organization}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
              required
            />
            <input
              type="number"
              name="startYear"
              placeholder="Start Year"
              value={form.startYear}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
              required
            />
            <input
              type="number"
              name="endYear"
              placeholder="End Year"
              value={form.endYear}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />
            <input
              type="number"
              name="percentage"
              placeholder="Percentage"
              value={form.percentage}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
              step="0.01"
            />
            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowEduForm(false)
                  setEditingEdu(null)
                }}
                className="btn btn-danger px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-success text-white px-4 py-2 rounded"
              >
                {editingEdu ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
      <button
        onClick={() => {
          setShowEduForm(true);
          setEditingEdu(null);
        }}
        className="btn btn-secondary px-3 py-1 rounded mt-1"
      >
        + Add Education
      </button>
    </div>
  );
};

export default EducationForm;
