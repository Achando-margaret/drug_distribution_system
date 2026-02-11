import React from "react";
import { Link } from "react-router-dom";
function HomePage() {
    return (
        <div style={{ textAlign: "center", marginTop: "50px"}}>
            <hi>Drug Distribution System</hi>
            <h2>Welcome! Please Sign In:</h2>
            <div style={{ marginTop: "20px"}}>
                <Link to="/pharma-login">
                <button style={{ margin: "10px", padding: "10px 20px"}}>
                    Sign in as M.J Pharmaceutical
                </button>
                
                </Link>
                <Link to="/hospital-login">
                <button style={{ margin: "10px", paddin: "10px 20px"}}>
                    Sign in as Hospital
                </button>
                </Link>
            </div>
        </div>

    );
}
export default HomePage;