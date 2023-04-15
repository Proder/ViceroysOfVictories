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
          <NavLink to="/CricketDisplay" className="link">
            Cricket
          </NavLink>
          <NavLink to="/CricketDisplay" className="link">
            Badminton
          </NavLink>
          <NavLink to="/BadDisplay" className="link">
            Cricket
          </NavLink>
          <NavLink to="/TtDisplay" className="link">
            TT
          </NavLink>
          <NavLink to="/FootDisplay" className="link">
            Football
          </NavLink>
          
        </div>
      </div>
    </>
  );
}
