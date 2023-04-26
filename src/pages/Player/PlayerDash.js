import React, { useState, useEffect } from "react";
import Navbar from "../../components/UserNavbar";
import { Navigate, useNavigate } from "react-router-dom";
import "../Extras/dashboard.css";

export default function PlayerDash() {
  const [playerData, setPlayerData] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("cricket");
  const [sportsData, setSportsData] = useState([]);
  const [buttonState, setButtonState] = useState(true);
  const navigate = useNavigate();

  const handleClick = () => {
    if (buttonState) {
      console.log("clicked");
      setButtonState(false);
    }
  };
  const [formData, setFormData] = useState({
    oldpwd: "",
    newpwd: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("playerAuth", sessionStorage.getItem("playerAuth"));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      oldpwd: formData.oldpwd,
      newpwd: formData.newpwd,
    });

    // var raw = JSON.stringify({
    //   height: playerData[0].height,
    //   weight: playerData[0].weight,
    // });

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://vov.cyclic.app/self/update/password", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if(result.message=="Old password incorrect!"){
          window.alert(result.message);
          setButtonState(true);
          return
        }else{
        window.alert(result.message);
        setFormData({
          oldpwd: "",
          newpwd: "",
        });
        setButtonState(true);
        handleLogOut();
      }
      })
      .catch((error) => console.log("error", error));
  };

  const handleLogOut = () => {
    var myHeaders = new Headers();
    myHeaders.append("playerAuth", sessionStorage.getItem("playerAuth"));

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://vov.cyclic.app/player/logout",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

      sessionStorage.removeItem("playerAuth");

  };

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("playerAuth", sessionStorage.getItem("playerAuth"));
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const fetchData = async () => {
      try {
        // setIsDataLoaded(false)
        const response = await fetch(
          `https://vov.cyclic.app/self/players/${activeTab}`,
          requestOptions
        );
        const data = await response.json();
        setSportsData(data);
        setIsDataLoaded(true);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [activeTab]);

  const handleTabClick = (tabName) => {
    setIsDataLoaded(false);
    setTimeout(() => {
      setActiveTab(tabName);
      setIsDataLoaded(true);
    }, 1500);
  };

  const handleAddClick = () => {
    switch (activeTab) {
      case "cricket":
        return navigate("/CRICKET");
      case "football":
        return navigate("/Football");

      case "badminton":
        return navigate("/Badminton");
      case "tt":
        return navigate("/TT");
    }
  };

  const handleDelete = (key, e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("playerAuth", sessionStorage.getItem("playerAuth"));
    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://vov.cyclic.app/self/players/delete/${activeTab}/${key}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        window.alert(result.message);
        setIsDataLoaded(true);
      })
      .then(() => {
        var myHeaders = new Headers();
        myHeaders.append("playerAuth", sessionStorage.getItem("playerAuth"));
        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };
        fetch("https://vov.cyclic.app/self/players/detail", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            setPlayerData(result);
            setIsDataLoaded(true);
          })
          .catch((error) => console.log("error", error));
      })
      .catch((error) => console.log("error", error));
    e.target.parentElement.parentElement.remove();
  };

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("playerAuth", sessionStorage.getItem("playerAuth"));
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch("https://vov.cyclic.app/self/players/detail", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setPlayerData(result);
        setIsDataLoaded(true);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div>
      {sessionStorage.length === 0 ? (
        <Navigate to="/" replace={true} />
      ) : (
        <div className="container">
          <Navbar />

          {isDataLoaded && playerData ? (
            <>
              <div className="left-profile">
                <section class="profile-card">
                  <div class="proCard">
                    <header>
                      <a class="profile">
                        <img
                          src={require("../../assets/profile.jpg")}
                          alt="Profile"
                        />
                      </a>
                    </header>

                    <article>
                      {/* <div className="update">
                        <i
                          class="fa-solid fa-user-pen"
                          id="updateButton"
                          title="Update Details"
                        ></i>
                      </div>
                      <form onSubmit={handleUpdate}>
                        <div className="updateForm">
                          <label htmlFor="height">Height</label>
                          <input
                            type="number"
                            name="height"
                            id="height"
                            value={playerData[0].height}
                            onChange={(e) => {
                              setPlayerData([
                                {
                                  ...playerData[0],
                                  height: e.target.value,
                                },
                              ]);
                            }}
                          />
                          <label htmlFor="weight">Weight</label>
                          <input
                            type="number"
                            name="weight"
                            id="weight"
                            value={playerData[0].weight}
                            onChange={(e) => {
                              setPlayerData([
                                {
                                  ...playerData[0],
                                  weight: e.target.value,
                                },
                              ]);
                            }}
                          />
                        </div>
                      </form>
                      <div className="updateButton">
                        <button
                          onClick={handleUpdate}
                          className="updateButton"
                          type="submit"
                        >
                          Update
                        </button>
                      </div> */}

                      <h1>{playerData[0].name}</h1>
                      <h2>{playerData[0].email}</h2>

                      <div class="info">
                        <div>
                          <span>{playerData[0].height}</span>
                          <span>
                            Height
                            <br />
                            (cm)
                          </span>
                        </div>
                        <div>
                          <span>{playerData[0].weight}</span>
                          <span>
                            Weight
                            <br />
                            (kg)
                          </span>
                        </div>
                        <div>
                          <span>{playerData[0].gender}</span>
                          <span>Gender</span>
                        </div>
                      </div>
                      {/* Password updating */}
                      <div className="Update">
                        <div
                          className={`button ${
                            buttonState ? "button-state" : "card-state"
                          }`}
                          onClick={handleClick}
                        >
                          <div className="button-content">
                            <i class="fa-solid fa-key"></i>
                          </div>
                          <div className="card-content">
                            <input
                              type="text"
                              placeholder="Old"
                              className="form-input"
                              name="oldpwd"
                              onChange={handleChange}
                              value={formData.oldpwd}
                            />
                            <input
                              type="password"
                              placeholder="New"
                              className="form-input"
                              name="newpwd"
                              onChange={handleChange}
                              value={formData.newpwd}
                            />
                            <button
                              className="signin-button"
                              onClick={handleUpdate}
                              id="updateButton"
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                </section>
              </div>
              <div className="right-profile">
                <div class="button-container">
                  <button
                    className={activeTab === "cricket" ? "active" : ""}
                    onClick={() => handleTabClick("cricket")}
                  >
                    Cricket
                  </button>
                  <button
                    className={activeTab === "badminton" ? "active" : ""}
                    onClick={() => handleTabClick("badminton")}
                  >
                    Badminton
                  </button>
                  <button
                    className={activeTab === "tt" ? "active" : ""}
                    onClick={() => handleTabClick("tt")}
                  >
                    TT
                  </button>
                  <button
                    className={activeTab === "football" ? "active" : ""}
                    onClick={() => handleTabClick("football")}
                  >
                    Football
                  </button>
                </div>
                <div className="container-display">
                  {activeTab === "cricket" && (
                    <div className="cricket">
                      {sportsData.length === 0 ? (
                        <>
                          <h1 className="error-msg">No Data Found</h1>
                          <div className="addMatchNO">
                            <button
                              title="Add Match"
                              className="addbuttonNO"
                              onClick={handleAddClick}
                            >
                              Add Match
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="stats-container">
                            <table className="stats">
                              <thead>
                                <tr>
                                  <th>MyTeam</th>
                                  <th>Score 1</th>
                                  <th>Opponent</th>
                                  <th>Score 2</th>
                                  <th>Winner</th>
                                  <th>Runs</th>
                                  <th>Wickets</th>
                                  <th>Tournament Type</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {sportsData.map((cricket) => (
                                  <tr key={cricket._id}>
                                    <td>{cricket.t1}</td>
                                    <td>{cricket.s1}</td>
                                    <td>{cricket.t2}</td>
                                    <td>{cricket.s2}</td>
                                    <td>{cricket.wt}</td>
                                    <td>{cricket.run}</td>
                                    <td>{cricket.wicket}</td>
                                    <td>{cricket.tot}</td>
                                    <td>
                                      <i
                                        class="fa-solid fa-trash"
                                        title="Delete Record"
                                        id="delete"
                                        onClick={(e) =>
                                          handleDelete(cricket._id, e)
                                        }
                                      ></i>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <div className="addMatch">
                            <button
                              title="Add Match"
                              className="addbutton"
                              onClick={handleAddClick}
                            >
                              +
                            </button>
                          </div>
                          <div className="extra-comp">
                            <table className="extra-stats">
                              <thead>
                                <tr>
                                  <th>Total Runs</th>
                                  <th>Total Wickets</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{playerData[2].run}</td>
                                  <td>{playerData[2].wicket}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {activeTab === "badminton" && (
                    <div className="badminton">
                      {sportsData.length === 0 ? (
                        <>
                          <h1 className="error-msg">No Data Found</h1>
                          <div className="addMatchNO">
                            <button
                              title="Add Match"
                              className="addbuttonNO"
                              onClick={handleAddClick}
                            >
                              Add Match
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="stats-container">
                            <table className="stats">
                              <thead>
                                <tr>
                                  <th>Opponent Name</th>
                                  <th>Score</th>
                                  <th>Winner</th>
                                  <th>Tournament Type</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {sportsData.map((badminton) => (
                                  <tr key={badminton._id}>
                                    <td>{badminton.oname}</td>
                                    <td>
                                      {badminton.s1}/{badminton.s2}{" "}
                                    </td>
                                    <td>
                                      {badminton.wt === true
                                        ? playerData[0].name
                                        : badminton.oname}
                                    </td>
                                    <td>{badminton.tot}</td>
                                    <td>
                                      <i
                                        class="fa-solid fa-trash"
                                        title="Delete Record"
                                        id="delete"
                                        onClick={(e) =>
                                          handleDelete(badminton._id, e)
                                        }
                                      ></i>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <div className="addMatch">
                            <button
                              title="Add Match"
                              className="addbutton"
                              onClick={handleAddClick}
                            >
                              +
                            </button>
                          </div>
                          <div className="extra-comp">
                            <table className="extra-stats">
                              <thead>
                                <tr>
                                  <th>Total Matches Won</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{playerData[3].mw}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                  {activeTab === "tt" && (
                    <div className="tt">
                      {sportsData.length === 0 ? (
                        <>
                          <h1 className="error-msg">No Data Found</h1>
                          <div className="addMatchNO">
                            <button
                              title="Add Match"
                              className="addbuttonNO"
                              onClick={handleAddClick}
                            >
                              Add Match
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="stats-container">
                            <table className="stats">
                              <thead>
                                <tr>
                                  <th>Opponent Name</th>
                                  <th>Score</th>
                                  <th>Winner</th>
                                  <th>Tournament Type</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {sportsData.map((match) => (
                                  <tr key={match._id}>
                                    <td>{match.oname}</td>
                                    <td>{match.s1}</td>
                                    <td>
                                      {match.wt === true
                                        ? playerData[0].name
                                        : match.oname}
                                    </td>
                                    <td>{match.tot}</td>
                                    <td>
                                      <i
                                        class="fa-solid fa-trash"
                                        title="Delete Record"
                                        id="delete"
                                        onClick={(e) =>
                                          handleDelete(match._id, e)
                                        }
                                      ></i>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <div className="addMatch">
                            <button
                              title="Add Match"
                              className="addbutton"
                              onClick={handleAddClick}
                            >
                              +
                            </button>
                          </div>
                          <div className="extra-comp">
                            <table className="extra-stats">
                              <thead>
                                <tr>
                                  <th>Total Matches Won</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{playerData[4].mw}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                  {activeTab === "football" && (
                    <div className="football">
                      {sportsData.length === 0 ? (
                        <>
                          <h1 className="error-msg">No Data Found</h1>
                          <div className="addMatchNO">
                            <button
                              title="Add Match"
                              className="addbuttonNO"
                              onClick={handleAddClick}
                            >
                              Add Match
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          {isDataLoaded ? (
                            <>
                              <div className="stats-container">
                                <table className="stats">
                                  <thead>
                                    <tr>
                                      <th>Team 1</th>
                                      <th>Score 1</th>
                                      <th>Team 2</th>
                                      <th>Score 2</th>
                                      <th>Winner</th>
                                      <th>Goals</th>
                                      <th>Tournament Type</th>
                                      <th>Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {sportsData.map((foot) => (
                                      <tr key={foot._id}>
                                        <td>{foot.t1}</td>
                                        <td>{foot.s1}</td>
                                        <td>{foot.t2}</td>
                                        <td>{foot.s2}</td>
                                        <td>
                                          {foot.wt === true ? foot.t1 : foot.t2}
                                        </td>
                                        <td>{foot.goal}</td>
                                        <td>{foot.tot}</td>
                                        <td>
                                          <i
                                            class="fa-solid fa-trash"
                                            title="Delete Record"
                                            id="delete"
                                            onClick={(e) =>
                                              handleDelete(foot._id, e)
                                            }
                                          ></i>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                              <div className="addMatch">
                                <button
                                  title="Add Match"
                                  className="addbutton"
                                  onClick={handleAddClick}
                                >
                                  +
                                </button>
                              </div>
                              <div className="extra-comp">
                                <table className="extra-stats">
                                  <thead>
                                    <tr>
                                      <th>Total Goals</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>{playerData[1].goal}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </>
                          ) : (
                            <div className="loader"></div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="loader"></div>
          )}
        </div>
      )}
    </div>
  );
}
