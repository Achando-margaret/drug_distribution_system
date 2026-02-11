import React from "react";

function PharmaLogin() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>M.J Pharmaceutical Login</h1>
      <form>
        <input type="text" placeholder="Username" /><br /><br />
        <input type="password" placeholder="Password" /><br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default PharmaLogin;
