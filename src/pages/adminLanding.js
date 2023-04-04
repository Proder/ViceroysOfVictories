import React from "react";
import { NavLink } from "react-router-dom";
// import { HashLink } from 'react-router-hash-link';
import "../index.css";

export default function adminLanding() {
  return (
    <div className="adminLanding">
      <button class="button-28">
        <NavLink to="/AdminDash" className="link">View Players</NavLink>
      </button>
      <button class="button-28">
        <NavLink to="/NewUser" className='link'>Create New User</NavLink>
      </button>
    </div>
  );
}
