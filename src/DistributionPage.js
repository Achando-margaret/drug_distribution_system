import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function DistributionPage() {
  const [inventory, setInventory] = useState([]);
  const [distributions, setDistributions] = useState([]);
  const [formData, setFormData] = useState({
    drugId: "",
    quantity: "",
    recipient: ""
  });

  useEffect(() => {
    // Fetch inventory for dropdown
    axios.get("http://localhost:5000/inventory")
      .then(response => setInventory(response.data))
      .catch(error => console.error(error));

    // Fetch past distributions
    axios.get("http://localhost:5000/distributions")
      .then(response => setDistributions(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/distribute", formData)
      .then(response => {
        alert("Distribution recorded!");
        setDistributions([...distributions, response.data]);
        setFormData({ drugId: "", quantity: "", recipient: "" });
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="distribution-page">
      <h1>Drug Distribution</h1>

      {/* Distribution Form */}
      <form className="distribution-form" onSubmit={handleSubmit}>
        <label>
          Drug:
          <select name="drugId" value={formData.drugId} onChange={handleChange} required>
            <option value="">Select a drug</option>
            {inventory.map(item => (
              <option key={item.ID} value={item.ID}>
                {item.Name} (Stock: {item.Quantity})
              </option>
            ))}
          </select>
        </label>

        <label>
          Quantity:
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
        </label>

        <label>
          Recipient:
          <input type="text" name="recipient" value={formData.recipient} onChange={handleChange} required />
        </label>

        <button type="submit">Distribute</button>
      </form>

      {/* Past Distributions Table */}
      <h2>Past Distributions</h2>
      <table className="distribution-table">
        <thead>
          <tr>
            <th>Drug</th>
            <th>Quantity</th>
            <th>Recipient</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {distributions.map((dist, index) => (
            <tr key={index}>
              <td>{dist.drugName}</td>
              <td>{dist.quantity}</td>
              <td>{dist.recipient}</td>
              <td>{dist.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DistributionPage;