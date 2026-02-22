import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

function PharmaDashboard() {
  return (
    <div className="pharma-page">
      <h1>Pharmaceutical Dashboard</h1>

      <div className="pharma-content">
        <Link to="/inventory" className="pharma-card">
          <h2>Inventory Management</h2>
          <p>Track available drugs, update stock levels, and monitor expiry dates.</p>
        </Link>

        <Link to="/distribution" className="pharma-card">
          <h2>Distribution Records</h2>
          <p>View and manage all distribution transactions with hospitals.</p>
        </Link>

        <Link to="/reports" className="pharma-card">
          <h2>Reports</h2>
          <p>Generate detailed reports on supply chain, usage, and performance.</p>
        </Link>
      </div>
    </div>
  );
}

export default PharmaDashboard;