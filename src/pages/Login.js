import React, { useState } from "react";
import "./dash.css";
import { NavLink, Navigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function Dash() {
  const [isLogin, setIsLogin] = useState(true);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
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
      .then((result) => {
        console.log(result.message);
        if (result.message === "Login done!") {
          sessionStorage.setItem("authToken", result.token);
          setLogin(true);
          setUser("admin");
        } else {
          setIsLoading(false);
          setTimeout(() => alert("Invalid Credentials"), 500);
        }
      })
      .catch((error) => console.log("error", error));
    setLogin(false);
    setFormData({
      email: "",
      password: "",
    });
  };

  const handlePlayerSubmit = (e) => {
    setIsLoading(true);
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
      "https://easy-teal-dibbler-cape.cyclic.app/player/login",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.message === "Login done!") {
          sessionStorage.setItem("playerAuth", result.token);
          setLogin(true);
          setUser("player");
        } else {
          setIsLoading(false);
          setTimeout(() => alert("Invalid Credentials"), 500);
        }
      })
      .catch((error) => console.log("error", error));
    setLogin(false);
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div>
      {!login ? (
        <div>
          {!isLoading ? (
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
                    <h2
                      className="form-title"
                      id="signup"
                      onClick={handleAdminClick}
                    >
                      ADMIN
                    </h2>
                    <div className="form-holder">
                      <form onSubmit={handleAdminSubmit} id="adminform">
                        <input
                          type="email"
                          className="input"
                          placeholder="Email"
                          name="email"
                          required
                          autoComplete="off"
                          onChange={handleChange}
                          value={formData.email}
                        />
                        <input
                          type="password"
                          className="input"
                          placeholder="Password"
                          name="password"
                          required
                          autoComplete="off"
                          onChange={handleChange}
                          value={formData.password}
                        />
                      </form>
                    </div>
                    <button
                      className="submit-btn"
                      type="submit"
                      form="adminform"
                    >
                      Sign In
                    </button>
                    <div className="guest">
                      <NavLink to="/GuestDash" className="link-guest">
                        Continue as Guest
                      </NavLink>
                    </div>
                  </div>

                  <div className={`login ${isLogin ? "slide-up" : ""}`}>
                    <div className="center">
                      <h2
                        className="form-title"
                        id="login"
                        onClick={handlePlayerClick}
                      >
                        PLAYER
                      </h2>
                      <div className="form-holder">
                        <form onSubmit={handlePlayerSubmit} id="player-form">
                          <input
                            type="email"
                            className="input"
                            placeholder="Email"
                            name="email"
                            required
                            // autoComplete="off"
                            onChange={handleChange}
                            value={formData.email}
                          />
                          <input
                            type="password"
                            className="input"
                            placeholder="Password"
                            name="password"
                            required
                            autoComplete="off"
                            onChange={handleChange}
                            value={formData.password}
                          />
                        </form>
                      </div>
                      <button
                        className="submit-btn"
                        type="submit"
                        form="player-form"
                      >
                        Sign In
                      </button>
                      <NavLink to="/GuestDash" className="playlink">
                        Continue as Guest
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          ) : (
            <div className="loader"></div>
          )}
        </div>
      ) : user === "admin" ? (
        <Navigate to="/AdminDash" replace={true} />
      ) : (
        <Navigate to="/PlayerDash" replace={true} />
      )}
    </div>
  );
}
