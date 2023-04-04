import React, { useState } from "react";

export default function NewUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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
      myHeaders.append("authToken", localStorage.getItem("authToken"));
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
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
        // .catch(error => console.log('error', error));
        .then((data) => {
          setFormData({
            name: "",
            email: "",
            password: "",
            height: "",
            weight: "",
            gender: "",
          });
        });
    }
  };

  return (
    <div>
      <h4 className="heading">Create a New Player</h4>
      <div className="details" id="info">
        <p className="paragraph">
          Enter the basic credentials of the player to be created
        </p>
        <form className="details input-form">
          <input
            type="text"
            id="name"
            placeholder="Name"
            className="input-field"
            value={formData.name}
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
            className="input-field"
            value={formData.height}
            onChange={handleInputChange}
          />
          <input
            type="text"
            id="weight"
            placeholder="Weight"
            className="input-field"
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
  );
}