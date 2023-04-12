import React from "react";
import "../pages/AdminDash.css";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const handleLogOut = () => {
    var myHeaders = new Headers();
    myHeaders.append("playerAuth", sessionStorage.getItem("playerAuth"));

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://vov.cyclic.app/player/logout",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

      sessionStorage.removeItem("playerAuth");

  };
  return (
    <>
      <div class="header">
        <div class="header-text">
          <h1 className="navText">Viceroys of Victories</h1>
        </div>
        <div class="header-menu">
          <NavLink to="/PlayerDash" className="link">
            Home
          </NavLink>
          <NavLink to="/" className="link" onClick={handleLogOut}>
            Logout
          </NavLink>
        </div>
      </div>
    </>
  );
}
