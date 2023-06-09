import React from "react";
import { Navigate } from "react-router-dom";


import Cardlist from "../../components/Cardlist";
import Navbar from "../../components/Navbar";


export default function AdminDash() {
  return (
    <div>
      {sessionStorage.length === 0 ? (<Navigate to ="/" replace={true} />):(
      <div class="container">
        <Navbar />
        <div>
          <Cardlist />
        </div>
      </div>
      )}
    </div>
  );
}
