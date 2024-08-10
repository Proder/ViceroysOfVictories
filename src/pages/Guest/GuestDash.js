import React, { useState, useEffect } from "react";
import "../AdminDash.css";
import GuestCard from "../../components/GuestCard";
import GuestNavbar from "../../components/GuestNavbar";


export default function GuestDash() {

   const [cards, setCards] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [tab,setTab] = useState("cricket");

  const tabHandler = (tabName) => {
    setTab(tabName);
  };
  
  useEffect(() => {
    var myHeaders = new Headers();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://viceroys-of-victory.onrender.com/guest/view/players/${tab}`,
          requestOptions
        );
        const data = await response.json();
         setCards(data);
         setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [tab]);

  return (
    <div>
      {!isLoading ? (
        <div className="container">
          <GuestNavbar onSetTab={tabHandler}/>
          <section class="hero-section">
            <div class="card-grid">
              {cards.map((card) => (
                <GuestCard
                  cardid={card._id}
                  email={card.email}
                  name={card.name}
                />
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className="loader"></div>
      )}
    </div>
  );
}
