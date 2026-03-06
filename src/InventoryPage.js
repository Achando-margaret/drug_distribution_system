import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function InventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/inventory")
      .then(response => {
        setInventory(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching inventory:", err);
        setError("Failed to load inventory data.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading inventory...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div className="inventory-page">
      <h1>Inventory Management</h1>
      {inventory.length === 0 ? (
        <p>No drugs found in inventory.</p>
      ) : (
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Drug Name</th>
              <th>Quantity</th>
              <th>Expiry Date</th>
              <th>Batch Number</th>
              <th>Supplier</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.ID}>
                <td>{item.Name}</td>
                <td>{item.Quantity}</td>
                <td>{item.Expiry_Date}</td>
                <td>{item.Batch_Number}</td>
                <td>{item.Supplier}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default InventoryPage;