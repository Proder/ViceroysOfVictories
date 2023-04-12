import React, { useState, useEffect } from "react";
import "./AdminDash.css";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function PlayerDisplay() {
  const [playerData, setPlayerData] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("cricket");
  const location = useLocation();
  const { id } = location?.state;
  const [sportsData, setSportsData] = useState([]);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("authToken", sessionStorage.getItem("authToken"));
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://easy-teal-dibbler-cape.cyclic.app/view/players/${activeTab}/${id}`,
          requestOptions
        );
        const data = await response.json();
        setSportsData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [activeTab, id]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("authToken", sessionStorage.getItem("authToken"));
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://easy-teal-dibbler-cape.cyclic.app/view/players/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setPlayerData(result);
        setIsDataLoaded(true);
        setIsLoading(false);
      })
      .catch((error) => console.log("error", error));
  }, [id]);

  return (
    <div>
      {sessionStorage.length === 0 ? (<Navigate to ="/" replace />):(
    <div className="container">
    <Navbar />
    {isDataLoaded ? (
      <>
        <div className="left-profile">
          <section class="profile-card">
            <div class="proCard">
              <header>
                <a class="profile">
                  <img src={require("../assets/profile.jpg")} alt="Profile" />
                </a>
              </header>

              <article>
                <h1>{playerData.name}</h1>
                <h2>{playerData.email}</h2>

                <div class="info">
                  <div>
                    <span>{playerData.height}</span>
                    <span>
                      Height
                      <br />
                      (cm)
                    </span>
                  </div>
                  <div>
                    <span>{playerData.weight}</span>
                    <span>
                      Weight
                      <br />
                      (kg)
                    </span>
                  </div>
                  <div>
                    <span>{playerData.gender}</span>
                    <span>Gender</span>
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
                  <h1 className="error-msg">No Data Found</h1>
                ) : (
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
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {activeTab === "badminton" && (
              <div className="badminton">
                {sportsData.length === 0 ? (
                  <h1 className="error-msg">No Data Found</h1>
                ) : (
                  <table className="stats">
                    <thead>
                      <tr>
                        <th>Opponent Name</th>
                        <th>Score</th>
                        <th>Winner</th>
                        <th>Tournament Type</th>
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
                              ? playerData.name
                              : badminton.oname}
                          </td>
                          <td>{badminton.tot}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
            {activeTab === "tt" && (
              <div className="tt">
                {sportsData.length === 0 ? (
                  <h1 className="error-msg">No Data Found</h1>
                ) : (
                  <table className="stats">
                    <thead>
                      <tr>
                        <th>Opponent Name</th>
                        <th>Score</th>
                        <th>Winner</th>
                        <th>Tournament Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sportsData.map((match) => (
                        <tr key={match._id}>
                          <td>{match.oname}</td>
                          <td>{match.s1}</td>
                          <td>
                            {match.wt === id ? playerData.name : match.oname}
                          </td>
                          <td>{match.tot}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
            {activeTab === "football" && (
              <div className="football">
                {sportsData.length === 0 ? (
                  <h1 className="error-msg">No Data Found</h1>
                ) : (
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
                            {foot.wt === true ? playerData.name : foot.oname}
                          </td>
                          <td>{foot.goal}</td>
                          <td>{foot.tot}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
  

)}