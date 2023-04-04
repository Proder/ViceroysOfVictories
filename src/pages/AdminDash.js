import React,{useState,useEffect} from "react";
import { NavLink } from "react-router-dom";
import "./AdminDash.css";
import Cardlist from "../components/Cardlist";



export default function AdminDash() {
  return (
    <div>
      <div class="container">
        <div class="header">
          <div class="header-menu">
            <NavLink to="/" className="link">
              Home
            </NavLink>
            <NavLink to="#" className="link">
              View Players
            </NavLink>
            <NavLink to="/NewUser" className="link">
              Create New User
            </NavLink>
          </div>
          <div class="search-bar">
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div class="main">
          <Cardlist />
        </div>
      </div>
    </div>
  );
}
