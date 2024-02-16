import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "./register.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spiner from "../../components/Spiner/Spiner";
import { registerFunction } from "../../services/Apis";
import { useNavigate } from "react-router-dom";
import { addData } from "../../components/Context/ContextProvider";
import { useContext } from "react";

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
  const [preview, setPreview] = useState("");
  const [showSpin, setShowSpin] = useState(true);
  const navigate = useNavigate();
  const { useradd, setUseradd } = useContext(addData);

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
  // submit user data
  const submitUserData = async (e) => {
    e.preventDefault();

    const { fname, lname, email, mobile, gender, location } = inputData;
    if (fname === "") {
      toast.error("First name is required !");
    } else if (lname === "") {
      toast.error("Last name is required !");
    } else if (!email.includes("@")) {
      toast.error("Enter valid email !");
    } else if (mobile === "") {
      toast.error("Mobile number is required !");
    } else if (mobile.length > 10) {
      toast.error("Enter valid mobile number !");
    } else if (gender === "") {
      toast.error("Gender name is required !");
    } else if (location === "") {
      toast.error("Location name is required !");
    } else if (status === "") {
      toast.error("Status is required !");
    } else if (image === "") {
      toast.error("Profile Pic is required !");
    } else {
      const data = new FormData();
      data.append("fname", fname);
      data.append("lname", lname);
      data.append("email", email);
      data.append("mobile", mobile);
      data.append("gender", gender);
      data.append("status", status);
      data.append("user_profile", image);
      data.append("location", location);

      const config = {
        "Content-Type": "multipart/form-data",
      };

      const response = await registerFunction(data, config);
      if (response.status === 200) {
        setInputData({
          ...inputData,
          fname: "",
          lname: "",
          email: "",
          mobile: "",
          gender: "",
          location: "",
        });
        setStatus("");
        setImage("");
        setUseradd(response.data);
        navigate("/");
      } else {
        toast.error("something went wrong !");
      }
    }
  };

  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image));
    }
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, [image]);

  return (
    <>
      {showSpin ? (
        <Spiner />
      ) : (
        <div className="container">
          <h2 className="text-center mt-1">Hello Register Your Details</h2>
          <Card className="shadow mt-3 p-3">
            <div className="profile_div text-center">
              <img src={preview ? preview : "/man.png"} alt="" />
            </div>
            <Form>
              <Row>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fname"
                    onChange={setInputValue}
                    placeholder="Enter your first name"
                    value={inputData.fname}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lname"
                    onChange={setInputValue}
                    placeholder="Enter your last name"
                    value={inputData.lname}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    onChange={setInputValue}
                    placeholder="Enter your email"
                    value={inputData.email}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="number"
                    name="mobile"
                    onChange={setInputValue}
                    placeholder="Enter your mobile number"
                    value={inputData.mobile}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Select your gender</Form.Label>
                  <Form.Check
                    type={"radio"}
                    name="gender"
                    label={"Male"}
                    value={"Male"}
                    onChange={setInputValue}
                  />
                  <Form.Check
                    type={"radio"}
                    name="gender"
                    label={"Female"}
                    value={"Female"}
                    onChange={setInputValue}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Select your status</Form.Label>
                  <Select options={options} onChange={setStatusValue} />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Upload your profile</Form.Label>
                  <Form.Control
                    type="file"
                    name="user_profile"
                    onChange={setProfileValue}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Enter your location </Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    onChange={setInputValue}
                    placeholder="Enter your location"
                    value={inputData.location}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  onClick={submitUserData}
                >
                  Submit
                </Button>
              </Row>
            </Form>
          </Card>
          <ToastContainer position="top-center" />
        </div>
      )}
    </>
  );
};

export default Register;
