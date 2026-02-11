import React from "react";

function HospitalLogin() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Hospital Login</h1>
      <form>
        <input type="text" placeholder="Hospital ID" /><br /><br />
        <input type="password" placeholder="Password" /><br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default HospitalLogin;