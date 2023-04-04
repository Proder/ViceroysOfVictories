import React from "react";
import "../pages/AdminDash.css";

export default function Card({email,name}) {
    return (
     
              <a class="card" href="#">
                <div class="card__background">
                <div class="card__content">
                  <p class="card__category">{email}</p>
                  <h3 class="card__heading">{name}</h3>
                </div>
                </div>
              </a>
            
    );
  }