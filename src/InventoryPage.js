// InventoryPage.js
import React from "react";
import "./App.css";

function InventoryPage() {
  const inventory = [
    { id: 1, name: "Paracetamol", quantity: 120, expiry: "2026-08-15" },
    { id: 2, name: "Amoxicillin", quantity: 75, expiry: "2026-05-10" },
    { id: 3, name: "Ibuprofen", quantity: 200, expiry: "2027-01-20" },
  ];

  return (
    <div className="inventory-page">
      <h1>Inventory Management</h1>
      
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Drug Name</th>
            <th>Quantity</th>
            <th>Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.expiry}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryPage;