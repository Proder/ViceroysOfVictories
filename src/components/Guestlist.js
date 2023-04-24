import Card from "./GuestCard";
import React, { useState, useEffect } from "react";
import "../pages/AdminDash.css";
// import PlayerDisplay from "../pages/PlayerDisplay";

export default function Guestlist() {
  const [cards, setCards] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch( `https://vov.cyclic.app/guest/search/players/${searchWord}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setCards(result);
        setIsLoading(false);
      })
      .catch(error => console.log('error', error));
    
    },[searchWord]);

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
        <>
        <div class="search-bar">
          <input 
          type="text" 
          placeholder="Search" 
          class="search-input"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          />
        </div>
        <section class="hero-section">
          <div class="card-grid">
          {cards.map((card) => (
              <Card cardid={card._id} email={card.email} name={card.name} />
            ))}
          </div>
        </section>
      </>
      ) : (
        <div className="loader"></div>
      )}
    </div>
  );
}
