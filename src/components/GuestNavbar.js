import React, { useState } from "react";
import "../pages/AdminDash.css";
import { NavLink } from "react-router-dom";

export default function GuestNavbar(props) {
  const [activeTab, setActiveTab] = useState("");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    props.onSetTab(tabName);
  };

  return (
    <div className="header">
      <div className="header-text">
        <h1 className="navText">Viceroys of Victories</h1>
      </div>
      <div className="header-menu">
        <NavLink to="/PlayerDash" className="linker">
          Home
        </NavLink>
        <button
          onClick={() => handleTabClick("cricket")}
          className={activeTab === "cricket" ? "linkeractive" : "linker"}
        >
          Cricket
        </button>
        <button
          onClick={() => handleTabClick("badminton")}
          className={activeTab === "badminton" ? "linkeractive" : "linker"}
        >
          Badminton
        </button>
        <button
          onClick={() => handleTabClick("tt")}
          className={activeTab === "tt" ? "linkeractive" : "linker"}
        >
          TT
        </button>
        <button
          onClick={() => handleTabClick("football")}
          className={activeTab === "football" ? "linkeractive" : "linker"}
        >
          Football
        </button>
      </div>
    </div>
  );
}
