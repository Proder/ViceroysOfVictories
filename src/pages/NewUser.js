import React, { useState } from "react";
import Navbar from "../components/Navbar";

export default function NewUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    studentid:"",
    height: "",
    weight: "",
    gender: "",
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    const { email } = formData;
    const format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email.match(format)) {
      var myHeaders = new Headers();
      myHeaders.append("authToken", sessionStorage.getItem("authToken"));
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        studentid:formData.studentid,
        gender: formData.gender,
        height: formData.height,  
        weight: formData.weight
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "https://easy-teal-dibbler-cape.cyclic.app/admin/setplayer",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => console.log(result))
        .then((result) => {
          window.alert(`New Player ${result.name} Created`);
          setFormData({
            name: "",
            email: "",
            password: "",
            studentid:"",
            height: "",
            weight: "",
            gender: "",
          });
        })
        .catch(error => console.log('error', error));
    }
  };

  return (
    <div className="container">
      <Navbar />
      <div className="details" id="info">
      <h4 className="heading">Create a New Player</h4>
        <p className="paragraph">
          Enter the basic credentials of the player to be created
        </p>
        <div className='input-form-container'>
        <form className="input-form">
          <input
            type="text"
            id="name"
            placeholder="Name"
            className="input-field"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            id="studentid"
            placeholder="Student ID"
            className="input-field"
            value={formData.studentid}
            onChange={handleInputChange}
          />
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="input-field"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="input-field"
            value={formData.password}
            onChange={handleInputChange}
          />
          
          <input
            type="text"
            id="height"
            placeholder="Height"
            className="input-field-extras"
            value={formData.height}
            onChange={handleInputChange}
          />
          <input
            type="text"
            id="weight"
            placeholder="Weight"
            className="input-field-extras"
            value={formData.weight}
            onChange={handleInputChange}
          />
          <select
            className="select-field"
            id="gender"
            value={formData.gender}
            onChange={handleInputChange}
          >
            <option value="" disabled selected>
              Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <button class="button-user not-allowed"  id="submit" type="submit" onClick={handleSubmit}>
            CREATE
          </button>
        </form>
        </div>
      </div>
    </div>
  );
}
