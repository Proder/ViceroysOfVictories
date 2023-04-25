import React from "react";
import "../pages/AdminDash.css";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  
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
          <NavLink to="/CricGuest" className="link">
            Cricket
          </NavLink>
          <NavLink to="/BadGuest" className="link">
            Badminton
          </NavLink>
          <NavLink to="/TtGuest" className="link">
            TT
          </NavLink>
          <NavLink to="/FootGuest" className="link">
            Football
          </NavLink>
          
        </div>
      </div>
    </>
  );
}
