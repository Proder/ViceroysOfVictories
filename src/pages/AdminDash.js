import React from "react";

import "./AdminDash.css";
import Cardlist from "../components/Cardlist";
import Navbar from "../components/Navbar";


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
