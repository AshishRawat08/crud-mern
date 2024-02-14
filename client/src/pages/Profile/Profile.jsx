import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import "./profile.css";

const Profile = () => {
  return (
    <>
      <div className="container">
        <Card className="card-profile shadow col-lg-6 mx-auto mt-5">
          <Card.Body>
            <Row>
              <div className="col">
                <div className="card-profile-stats d-flex justify-content-center">
                  <img src="/man.png" alt="" />
                </div>
              </div>
            </Row>
            <div className="text-center">
              <h3>Ashish Singh Rawat</h3>
              <h4>
                <i class="fa-solid fa-envelope" style={{ color: "red" }}></i>
                &nbsp;:- <span>test1@gmail.com</span>
              </h4>
              <h5>
                <i
                  class="fa-solid fa-mobile-retro"
                  style={{ color: "black" }}
                ></i>
                &nbsp;:- <span>012356789</span>
              </h5>
              <h4>
                <i class="fa-solid fa-person" style={{ color: "black" }}></i>
                &nbsp;:- <span>012356789</span>
              </h4>
              <h4>
                <i
                  class="fa-solid fa-location-dot"
                  style={{ color: "royalblue" }}
                ></i>
                &nbsp;:- <span>India</span>
              </h4>
              <h4>
                Status &nbsp;:- <span>Active</span>
              </h4>
              <h5>
                <i
                  class="fa-solid fa-calendar-days"
                  style={{ color: "purple" }}
                ></i>
                &nbsp; Date created :- <span>11/feb/2024</span>
              </h5>
              <h5>
                <i
                  class="fa-solid fa-calendar-days"
                  style={{ color: "purple" }}
                ></i>
                &nbsp; Date updated :- <span>12/feb/2024</span>
              </h5>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Profile;
