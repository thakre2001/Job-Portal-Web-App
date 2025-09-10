import React, { useState } from 'react';

const ContactUs = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to send data to backend
    console.log(form);
    alert("Your message has been sent!");
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="container" style={{paddingTop:100}}>
      <h2 className="mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit} className="shadow p-4 bg-white rounded">
        <div className="mb-3">
          <label>Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Message</label>
          <textarea name="message" value={form.message} onChange={handleChange} className="form-control" rows="5" required />
        </div>
        <button type="submit" className="btn btn-primary">Send Message</button>
      </form>
    </div>
  );
};

export default ContactUs;
