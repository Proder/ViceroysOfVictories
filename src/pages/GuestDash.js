import React from "react";
import { Navigate } from "react-router-dom";

import "./AdminDash.css";
import Cardlist from "../components/Cardlist";
import Navbar from "../components/GuestNavbar";


export default function AdminDash() {
  return (
    <div>
      
      <div class="container">
        <Navbar />
        <div>
          <Cardlist />
        </div>
      </div>
     
    </div>
  );
}
