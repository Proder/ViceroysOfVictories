import React, { useState } from "react";
import "./dashboard.css";

export default function Dashboard() {
  const [buttonState, setButtonState] = useState(true);
  const [buttonState1, setButtonState1] = useState(true);

  const handleClick = () => {
    if (buttonState) {
      console.log("clicked");
      setButtonState(false);
    }
  };

  const handleClick1 = () => {
    if (buttonState1) {
      console.log("clicked");
      setButtonState1(false);
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

  const handleSubmit = () => {
    // e.preventDefault();
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
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="container">
      <div className="left">
        <img
          src={process.env.PUBLIC_URL + "/banner.png"}
          alt="LOADING"
          className="flyer"
        />
      </div>
      <div className="right">
        <p className="titles">
          <div className="admin">
            <div
              className={`button ${
                buttonState ? "button-state" : "card-state"
              }`}
              onClick={handleClick}
            >
              <div className="button-content">ADMIN</div>
              <div className="card-content">
                <input
                  type="email"
                  placeholder="Email"
                  className="form-input"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="form-input"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                />
                <button className="signin-button" onClick={handleSubmit}>
                  Sign In
                </button>
              </div>
            </div>
          </div>
          <br />
          <div className="user">
            <div
              className={`button ${
                buttonState1 ? "button-state" : "card-state"
              }`}
              onClick={handleClick1}
            >
              <div className="button-content">USER</div>
              <div className="card-content">
                <input
                  type="email"
                  placeholder="Email"
                  className="form-input"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="form-input"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                />
                <button className="signin-button" onClick={handleSubmit}>
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </p>
      </div>
    </div>
  );
}
