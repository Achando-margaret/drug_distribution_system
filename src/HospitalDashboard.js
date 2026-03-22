import React, { useState } from "react";
import axios from "axios";

function HospitalDashboard() {
  const [hospital, setHospital] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    contact_person: "",
    email: "",
    phone: "",
    password: ""   // include password for login later
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleRegister = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/register_hospital", formData)
      .then(response => {
        if (response.data.success) {
          setMessage("You have been registered successfully!");
          setHospital(response.data.hospital);
        } else {
          setMessage("Registration failed. Try again.");
        }
      })
      .catch(error => {
        console.error(error);
        setMessage("Error connecting to server.");
      });
  };

  return (
    <div className="hospital-dashboard">
      <h1>Hospital Dashboard</h1>

      {!hospital ? (
        <form onSubmit={handleRegister}>
          <label>Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <label>Location:
            <input type="text" name="location" value={formData.location} onChange={handleChange} required />
          </label>
          <label>Contact Person:
            <input type="text" name="contact_person" value={formData.contact_person} onChange={handleChange} required />
          </label>
          <label>Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
          <label>Phone:
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
          </label>
          <label>Password:
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </label>
          <button type="submit">Register</button>
        </form>
      ) : (
        <div>
          <h2>Welcome, {hospital.name}</h2>
          <p>Status: {hospital.status}</p>
        </div>
      )}

      {message && <p className="success-message">{message}</p>}
    </div>
  );
}

export default HospitalDashboard;