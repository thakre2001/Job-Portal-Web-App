import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Services } from "../../BackendAPIs/Services";

const ExperienceForm = () => {
  const { user, setUser, token } = useContext(UserContext);

  const [showExpForm, setShowExpForm] = useState(false);
  const [editingExp, setEditingExp] = useState(null);

  const [form, setForm] = useState({
    companyName: "",
    jobTitle: "",
    fromDate: "",
    toDate: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSaveExp = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (editingExp) {
        res = await Services.updateExperience(editingExp.id, form, token);
        setUser({
          ...user,
          experience: user.experience.map((exp) =>
            exp.id === res.data.id ? res.data : exp
          ),
        });
      } else {
        res = await Services.addExperience(form, token);
        setUser({
          ...user,
          experience: [...(user.experience || []), res.data],
        });
      }
      setShowExpForm(false);
      setEditingExp(null);
      setForm({
        companyName: "",
        jobTitle: "",
        fromDate: "",
        toDate: "",
        description: "",
      });
    } catch (err) {
      console.error("Error saving experience", err);
    }
  };

  const handleDeleteExp = async (id) => {
    try {
      await Services.deleteExperience(id, token);
      setUser({
        ...user,
        experience: user.experience.filter((e) => e.id !== id),
      });
    } catch (err) {
      console.error("Error deleting experience", err);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md" style={{ borderRadius: "20px", marginBottom: "30px" }} >
      <h3 className="text-lg font-semibold">Experience</h3>
      <ul className="mt-4 ps-0">
        {user?.experience?.map((exp) => (
          <li key={exp.id} className="ms-0 ps-0 mb-2 rounded">
            {editingExp?.id === exp.id ? (
              // Inline Edit Form
              <div>
                <div className="d-flex justify-content-between align-items-center">
                  <h3>Edit experience</h3>
                  <i className="fa fa-trash text-danger"
                    onClick={() => handleDeleteExp(exp.id)}
                  ></i>
                </div>
                <form onSubmit={handleSaveExp}>
                  <input
                    type="text"
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    className="border p-1 w-75 mb-1"
                    placeholder="Company Name"
                    required
                  />
                  <input
                    type="text"
                    name="jobTitle"
                    value={form.jobTitle}
                    onChange={handleChange}
                    className="border p-1 w-75 mb-1"
                    placeholder="Job Title"
                    required
                  />
                  <input
                    type="date"
                    name="fromDate"
                    value={form.fromDate}
                    onChange={handleChange}
                    className="border p-1 w-75 mb-1"
                    required
                  />
                  <input
                    type="date"
                    name="toDate"
                    value={form.toDate}
                    onChange={handleChange}
                    className="border p-1 w-75 mb-1"
                  />
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="border p-1 w-75 mb-1"
                    placeholder="Description"
                  />
                  <div className="d-flex justify-content-end gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingExp(null);
                        setForm({
                          companyName: "",
                          jobTitle: "",
                          fromDate: "",
                          toDate: "",
                          description: "",
                        });
                      }}
                      className="btn btn-danger px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-success px-3 py-1 rounded"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>

            ) : (
              // Normal View
              <>
                <div className="d-flex flex-column">
                  <div className="d-flex gap-3 align-items-center">
                    <strong>{exp.jobTitle}</strong>
                    <i className="fa fa-pen me-1 text-primary"
                      onClick={() => {
                        setEditingExp(exp);
                        setForm(exp);
                        setShowExpForm(false);
                      }}
                    ></i>
                  </div>
                  <strong>{exp.companyName}</strong>
                  <p>
                    {exp.fromDate} → {exp.toDate || "Present"}
                  </p>
                  <p className="mt-0">{exp.description}</p>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Add New Experience */}
      {showExpForm && !editingExp && (
        <div>
          <h3 className="font-bold mb-2">Add Experience</h3>
          <form onSubmit={handleSaveExp}>
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={form.companyName}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
              required
            />
            <input
              type="text"
              name="jobTitle"
              placeholder="Job Title"
              value={form.jobTitle}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
              required
            />
            <input
              type="date"
              name="fromDate"
              value={form.fromDate}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
              required
            />
            <input
              type="date"
              name="toDate"
              placeholder="To Date"
              value={form.toDate}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="border p-2 w-100 mb-2"
            ></textarea>
            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                onClick={() => setShowExpForm(false)}
                className="btn btn-danger px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-success text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        onClick={() => {
          setShowExpForm(true);
          setEditingExp(null);
        }}
        className="btn btn-secondary px-3 py-1 rounded mt-1"
      >
        + Add Experience
      </button>
    </div>
  );
};

export default ExperienceForm;
