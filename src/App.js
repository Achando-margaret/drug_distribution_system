import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import PharmaLogin from "./PharmaLogin";
import PharmaDashboard from "./PharmaDashboard";
import InventoryPage from "./InventoryPage";
import DistributionPage from "./DistributionPage";
import ReportsPage from "./ReportsPage";
import HospitalLogin from "./HospitalLogin";
import "./App.css";

function App() {
  return (
   
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pharma-login" element={<PharmaLogin />} />
          <Route path="/hospital-login" element={<HospitalLogin />} />
          <Route path="/pharma-dashboard" element={<PharmaDashboard/>} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/distribution" element={<DistributionPage />} />
          <Route path="/reports" element={<ReportsPage/>}/>
        </Routes>
      </BrowserRouter>
  
  );

  
}

export default App;