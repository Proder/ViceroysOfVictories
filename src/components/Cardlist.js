import Card from "./Card";
import React, { useState, useEffect } from "react";

export default function Cardlist() {
  const [cards, setCards] = useState([]);

  useEffect(function () {
    var myHeaders = new Headers();
    myHeaders.append("authToken", localStorage.getItem("authToken"));
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      "https://easy-teal-dibbler-cape.cyclic.app/view/players",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setCards(result))
      .catch((error) => console.log("error", error));
  }, []);
  return (
    <section class="hero-section">
    <div class="card-grid">
        {cards.map((card) => (
            <Card
                email={card.email}
                name={card.name}
            />
        ))}
        
    </div>
    </section>
  );
}
