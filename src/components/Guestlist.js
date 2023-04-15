import Card from "./Card";
import React, { useState, useEffect } from "react";
import "../pages/AdminDash.css";
// import PlayerDisplay from "../pages/PlayerDisplay";

export default function Guestlist() {
  const [cards, setCards] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function () {
    var myHeaders = new Headers();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      "https://easy-teal-dibbler-cape.cyclic.app/guest/view/players",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setCards(result);   
        setIsLoading(false);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div>
      {!isLoading ? (
        <section class="hero-section">
          <div class="card-grid">
            {cards.map((card) => (
              <Card cardid={card._id} email={card.email} name={card.name} />
            ))}
          </div>
        </section>
      ) : (
        <div className="loader"></div>
      )}
    </div>
  );
}
