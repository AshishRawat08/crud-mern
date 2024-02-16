import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import "./profile.css";
import Spiner from "../../components/Spiner/Spiner";
import { useParams } from "react-router-dom";
import { getSingleUserFunction } from "../../services/Apis";
import { BASE_URL } from "../../services/helper";
import moment from "moment";

const Profile = () => {
  const [showSpin, setShowSpin] = useState(true);
  const [userProfile, setUserProfile] = useState({});

  const { id } = useParams();
  console.log(id);

  const userProfileGet = async () => {
    const response = await getSingleUserFunction(id);
    // console.log(response);
    if (response.status === 200) {
      setUserProfile(response.data);
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    userProfileGet();
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, [id]);

  return (
    <>
      {showSpin ? (
        <Spiner />
      ) : (
        <div className="container">
          <Card className="card-profile shadow col-lg-6 mx-auto mt-5">
            <Card.Body>
              <Row>
                <div className="col">
                  <div className="card-profile-stats d-flex justify-content-center">
                    <img src={`${BASE_URL}/uploads/${userProfile.profile}`} />
                  </div>
                </div>
              </Row>
              <div className="text-center">
                <h3>{userProfile.fname + " " + userProfile.lname}</h3>
                <h4>
                  <i class="fa-solid fa-envelope" style={{ color: "red" }}></i>
                  &nbsp;:- <span>{userProfile.email}</span>
                </h4>
                <h5>
                  <i
                    class="fa-solid fa-mobile-retro"
                    style={{ color: "black" }}
                  ></i>
                  &nbsp;:- <span>{userProfile.mobile}</span>
                </h5>
                <h4>
                  <i class="fa-solid fa-person" style={{ color: "black" }}></i>
                  &nbsp;:- <span>{userProfile.gender}</span>
                </h4>
                <h4>
                  <i
                    class="fa-solid fa-location-dot"
                    style={{ color: "royalblue" }}
                  ></i>
                  &nbsp;:- <span>{userProfile.location}</span>
                </h4>
                <h4>
                  Status &nbsp;:- <span>{userProfile.status}</span>
                </h4>
                <h5>
                  <i
                    class="fa-solid fa-calendar-days"
                    style={{ color: "purple" }}
                  ></i>
                  &nbsp; Date created :-{" "}
                  <span>
                    {moment(userProfile.datecreated).format("DD-MM-YYYY")}
                  </span>
                </h5>
                <h5>
                  <i
                    class="fa-solid fa-calendar-days"
                    style={{ color: "purple" }}
                  ></i>
                  &nbsp; Date updated :- <span>{userProfile.dateupdated}</span>
                </h5>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
};

export default Profile;
