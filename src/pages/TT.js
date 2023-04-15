import React, { useState } from "react";
import Navbar from "../components/UserNavbar";
import { Navigate } from "react-router-dom";

export default function Badminton() {
  const [formData, setFormData] = useState({
    tot: "",
    oname: "",
    oid: "",
    s1: "",
    s2: "",
    wt: null,
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
      oname: formData.oname,
      oid: formData.oid,
      s1: formData.s1,
      s2: formData.s2,
      wt: formData.wt === "True" ? true : false,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://vov.cyclic.app/player/tt/addmatch", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if(result.hasOwnProperty('error')){
        window.alert(result.error)
      }else{
      window.alert("New Entry Done");
      setFormData({
        tot: "",
        oname: "",
        oid: "",
        s1: "",
        s2: "",
        wt: "",
      });
    }})
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
            <h4 className="heading">Table Tennis</h4>
            <p className="paragraph">
              Enter the details of your table tennis matches
            </p>
            <div className="input-form-container">
              <form className="input-form">
                <input
                  type="text"
                  id="oname"
                  placeholder="Opponent Name"
                  className="input-field"
                  // autoComplete="off"
                  required
                  value={formData.oname}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  id="oid"
                  placeholder="Opponent Student ID"
                  className="input-field"
                  required
                  value={formData.oid}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  id="s1"
                  placeholder="Your Score"
                  className="input-field"
                  // autoComplete="off"
                  required
                  value={formData.s1}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  id="s2"
                  placeholder="Opponent Score"
                  className="input-field"
                  // autoComplete="off"
                  required
                  value={formData.s2}
                  onChange={handleInputChange}
                />
                <select
                  className="select-field bad"
                  id="wt"
                  value={formData.wt}
                  onChange={handleInputChange}
                >
                  <option value="" disabled selected>
                    Winning Status
                  </option>
                  <option value="True">True</option>
                  <option value="False">False</option>
                </select>
                <select
                  className="select-field bad"
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
