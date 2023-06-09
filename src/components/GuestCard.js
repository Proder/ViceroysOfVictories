import React from "react";
import "../pages/AdminDash.css";
import { Link } from "react-router-dom";



export default function GuestCard({ cardid, email, name}) {

  return (
    <Link to="#" className="player-card" state={{id:cardid}}>
      <div class="card__background">
        <div class="card__content">
          <p class="card__category">{email}</p>
          <h3 class="card__heading">{name}</h3>
        </div>
      </div>
    </Link>
  );
}
