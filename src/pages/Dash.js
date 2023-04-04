import React, { useState } from "react";
import "./dash.css";
import { NavLink } from "react-router-dom";

export default function Dash() {
  const [isLogin, setIsLogin] = useState(true); 

  const handleAdminClick = () => {
    if (!isLogin) {
      setIsLogin(true);
    }
  };

  const handlePlayerClick = () => {
    if (isLogin) {
      setIsLogin(false);
    }
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: formData.email,
      password: formData.password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://easy-teal-dibbler-cape.cyclic.app/admin/login",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => localStorage.setItem("authToken", result.token))
      .catch((error) => console.log("error", error));
  };

  const handlePlayerSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    headers.append('Access-Control-Allow-Credentials', 'true');
  
    headers.append('GET', 'POST', 'OPTIONS');

    var raw = JSON.stringify({
      email: formData.email,
      password: formData.password,
    });

    var requestOptions = {
      method: "POST",
      headers: headers,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://easy-teal-dibbler-cape.cyclic.app/player/login",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => localStorage.setItem("authToken", result.token))
      .catch((error) => console.log("error", error));
  };


  return (
    <div className="dash-container">
      <div className="left">
        <div className="title-one">
          <h1>Viceroys of</h1>
        </div>
        <div className="title-two">
          <h2>VICTORY</h2>
        </div>
      </div>
      <div className="right">
        <div className="form-structor">
          <div className={`signup ${isLogin ? "" : "slide-up"}`}>
            <h2 className="form-title" id="signup" onClick={handleAdminClick}>
              ADMIN
            </h2>
            <div className="form-holder">
              <input
                type="email"
                className="input"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={formData.email}
              />
              <input
                type="password"
                className="input"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={formData.password}
              />
            </div>
            <button className="submit-btn" onClick={handleAdminSubmit}>
              <NavLink to="/AdminDash" className="link">
                Sign In
              </NavLink>
            </button>
          </div>
          <div className={`login ${isLogin ? "slide-up" : ""}`}>
            <div className="center">
              <h2 className="form-title" id="login" onClick={handlePlayerClick}>
                Player
              </h2>
              <div className="form-holder">
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                />
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                />
              </div>
              <button className="submit-btn" onClick={handlePlayerSubmit}>
                <NavLink to="/Sports" className='link'>Sign In</NavLink>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
