import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import "./register.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Select from "react-select";

const Register = () => {
  const [inputData, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: "",
  });
  // console.log(inputData);

  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState("");
  

  //staus option
  const options = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  //setInput value
  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };
  //status set
  const setStatusValue = (e) => {
    setStatus(e.value);
  };
  //profile set
  const setProfileValue = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="container">
      <h2 className="text-center mt-1">Hello Register Your Details</h2>
      <Card className="shadow mt-3 p-3">
        <div className="profile_div text-center">
          <img src="/man.png" alt="" />
        </div>
        <Form>
          <Row>
            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                name="fname"
                onChange={setInputValue}
                placeholder="Enter your first name"
              />
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                name="lname"
                onChange={setInputValue}
                placeholder="Enter your last name"
              />
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={setInputValue}
                placeholder="Enter your email"
              />
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="number"
                name="mobile"
                onChange={setInputValue}
                placeholder="Enter your mobile number"
              />
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Select your gender</Form.Label>
              <Form.Check
                type={"radio"}
                name="gender"
                label={`Male`}
                value={"Male"}
                onChange={setInputValue}
              />
              <Form.Check
                type={"radio"}
                name="gender"
                label={`Female`}
                value={"Female"}
                onChange={setInputValue}
              />
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Select your status</Form.Label>
              <Select options={options} onChange={setStatusValue} />
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Upload your profile</Form.Label>
              <Form.Control
                type="file"
                name="user_profile"
                onChange={setProfileValue}
              />
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Enter your location </Form.Label>
              <Form.Control
                type="text"
                name="location"
                onChange={setInputValue}
                placeholder="Enter your location"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
