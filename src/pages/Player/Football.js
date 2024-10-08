import React, { useState } from "react";
import Navbar from "../../components/UserNavbar";
import { Navigate } from "react-router-dom";

export default function Football() {
  const [formData, setFormData] = useState({
    tot: "",
    t1: "",
    t2: "",
    s1: "",
    s2: "",
    wt: null,
    goal:"",
    
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);

    var myHeaders = new Headers();
    myHeaders.append("playerAuth", sessionStorage.getItem("playerAuth"));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      tot: formData.tot,
      t1: formData.t1,
      t2: formData.t2,
      s1: formData.s1,
      s2: formData.s2,
      wt: formData.wt === "True" ? true : false,
      goal: formData.goal
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://viceroys-of-victory.onrender.com/player/football/addmatch", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.hasOwnProperty('error')) {
          window.alert(result.error);
        } else {
          window.alert(result.message);
          setFormData({
            tot: "",
            t1: "",
            t2: "",
            s1: "",
            s2: "",
            wt: "",
            goal: ""
          });
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      {sessionStorage.length === 0 ? (
        <Navigate to="/" replace={true} />
      ) : (
        <div className="container">
          <Navbar />
          <div className="details" id="info">
            <h4 className="heading">Football</h4>
            <p className="paragraph">
              Enter the details of your football matches
            </p>
            <div className="input-form-container">
              <form className="input-form">
                <input
                  type="text"
                  id="t1"
                  placeholder="Your Team Name"
                  className="input-field"
                  // autoComplete="off"
                  required
                  value={formData.t1}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  id="t2"
                  placeholder="Opponent Team Name"
                  className="input-field"
                  //autocomplete="off"
                  required
                  value={formData.t2}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  id="s1"
                  placeholder="Your Team Goals"
                  className="input-field"
                  // autoComplete="off"
                  required
                  value={formData.s1}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  id="s2"
                  placeholder="Opponent Team Goals"
                  className="input-field"
                  // autoComplete="off"
                  required
                  value={formData.s2}
                  onChange={handleInputChange}
                />
                <input
                  type="number"
                  id="goal"
                  placeholder="Your Goals"
                  className="input-field-extras"
                  // autoComplete="off"
                  value={formData.goal}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  id="wt"
                  placeholder="Winning Team"
                  className="input-field-extras"
                  value={formData.wt}
                  // autoComplete="off"
                  onChange={handleInputChange}
                />
                <select
                  className="select-field"
                  id="tot"
                  value={formData.tot}
                  onChange={handleInputChange}
                >
                  <option value="" disabled selected>
                    Type of Tournament
                  </option>
                  <option value="Ventura">Ventura</option>
                  <option value="Inter IIIT">Inter IIIT</option>
                  <option value="Pratistha">Pratistha</option>
                </select>
                <button
                  class="button-user not-allowed"
                  id="submit"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
