import React, { useState} from "react";
import { Link } from "react-router-dom";
import "./App.css";
function HomePage() {
    const [showOptions, setShowOptions] = useState(false);

    return (
        <div className="homepage">
             <div className="navbar">
        <div className="nav-left">
          <h1>M.J PHARMACEUTICAL</h1>
        </div>
        <div className="nav-right">
          <button className="login-btn" onClick={() => setShowOptions(!showOptions)}>
            Login
          </button>
          {showOptions && (
            <div className="dropdown">
              <Link to="/pharma-login">
                <button className="option-btn">Pharmaceutical</button>
              </Link>
              <Link to="/hospital-login">
                <button className="option-btn">Hospital</button>
              </Link>
            </div>
          )}
        </div>
      </div>

            
            <h2>Mission</h2>
            <p className="mission">
                To ensure safe, efficient, and reliable distribution of pharmaceutical products, bridging the gap between manufacturers and hospitals to improve patient care and community health.
            </p>
            <h2>Vision</h2>
            <p className="vision">
                To be the leading pharmaceutical distributor recognized for innovation, trust, and excellence in delivering life saving medicines across healthcare institutiins. 
            </p>
            
        </div>

    );
}
export default HomePage;