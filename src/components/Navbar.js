import React from "react";
import "../pages/AdminDash.css";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const handleLogOut = () => {
    var myHeaders = new Headers();
    myHeaders.append("authToken", sessionStorage.getItem("authToken"));

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://viceroys-of-victory.onrender.com/admin/logout",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

      sessionStorage.removeItem("authToken");

  };
  return (
    <>
      <div class="header">
        <div class="header-text">
          <h1 className="navText">Viceroys of Victories</h1>
        </div>
        <div class="header-menu">
          <NavLink to="/AdminDash" className="link">
            Home
          </NavLink>
          <NavLink to="/NewUser" className="link">
            Create New Player
          </NavLink>
          <NavLink to="/" className="link" onClick={handleLogOut}>
            Logout
          </NavLink>
        </div>
      </div>
    </>
  );
}
