import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import PharmaLogin from "./PharmaLogin";
import HospitalLogin from "./HospitalLogin";
import "./App.css";

function App() {
  return (
   
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pharma-login" element={<PharmaLogin />} />
          <Route path="/hospital-login" element={<HospitalLogin />} />
        </Routes>
      </BrowserRouter>
  
  );

  
}

export default App;