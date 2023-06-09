import React from "react";
import "./player.css"

export default function Sports() {

  const handleCricket = () => {
    console.log("clicked");
  };

  const handleFootball = () => {
    console.log("clicked");
  };

  const handleTT = () => {
    console.log("clicked");
  };

  const handleBadminton = () => {
    console.log("clicked");
  };
  return (
    
      <div class="container-sports">
        <div class="card">
          <div class="box">
            <div class="content">
              <img
                src="https://e0.pxfuel.com/wallpapers/381/205/desktop-wallpaper-best-cricket-iphone.jpg"
                alt=""
                width="200px"
                height="250px"
                
              />
              <h1>Cricket</h1>
              <a href="/Tournaments" onClick={handleCricket}>Explore</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="box">
            <div class="content">
              <img
                src="https://wallpaperboat.com/wp-content/uploads/2019/09/Messi-Wallpaper-hd-vertical.jpg"
                alt=""
                width="200px"
                height="250px"
              />
              <h1>Football</h1>
              <a href="/Tournaments" onClick={handleFootball}>Explore</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="box">
            <div class="content">
              <img
                src="https://wallpapercave.com/wp/wp1961370.jpg"
                alt=""
                width="200px"
                height="250px"
              />
              <h1>Table Tennis</h1>
              <a href="/Tournaments" onClick={handleTT}>Explore</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="box">
            <div class="content">
              <img
                src="https://thumbs.dreamstime.com/b/badminton-action-shuttlecock-fast-racket-motion-sport-167143422.jpg"
                alt=""
                width="200px"
                height="250px"
              />
              <h1>Badminton</h1>
              <a href="/Tournaments" onClick={handleBadminton}>Explore</a>
            </div>
          </div>
        </div>
      </div>
    
  );
}
