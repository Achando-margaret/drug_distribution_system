import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function ReportPage() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/inventory")
      .then(response => {
        setInventory(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching report data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading report...</p>;
  }

  // 🔍 Calculate summary stats
  const totalDrugs = inventory.length;
  const lowStock = inventory.filter(item => item.Quantity < 20); // threshold
  const expiringSoon = inventory.filter(item => {
    const expiry = new Date(item.Expiry_Date);
    const today = new Date();
    const diffDays = (expiry - today) / (1000 * 60 * 60 * 24);
    return diffDays <= 30; // within 30 days
  });

  return (
    <div className="report-page">
      <h1>Inventory Report</h1>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card">Total Drugs: {totalDrugs}</div>
        <div className="card">Low Stock: {lowStock.length}</div>
        <div className="card">Expiring Soon: {expiringSoon.length}</div>
      </div>

      {/* Expiring Drugs Table */}
      <h2>Drugs Expiring Soon</h2>
      <table className="report-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {expiringSoon.map(item => (
            <tr key={item.Id}>
              <td>{item.Name}</td>
              <td>{item.Quantity}</td>
              <td>{item.Expiry_Date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Low Stock Table */}
      <h2>Low Stock Drugs</h2>
      <table className="report-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {lowStock.map(item => (
            <tr key={item.Id}>
              <td>{item.Name}</td>
              <td>{item.Quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReportPage;