import React from "react";
import Guestlist from "../../components/Guestlist";
import Navbar from "../../components/GuestNavbar";


export default function GuestDash() {
  return (
    <div>
      
      <div class="container">
        <Navbar />
        <div>
          <Guestlist />
        </div>
      </div>
     
    </div>
  );
}
