import React, { useContext, useEffect, useState } from "react";
import "./home.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import Tables from "../../components/Tables/Tables";
import Spiner from "../../components/Spiner/Spiner";
import { updatedata, addData, deletedata } from "../../components/Context/ContextProvider";
import Alert from "react-bootstrap/Alert";
import { deleteUserFunction, getAllUsersFunction } from "../../services/Apis";
import { toast } from "react-toastify";

const Home = () => {
  const [usersData, setUsersData] = useState("");
  const [showSpin, setShowSpin] = useState(true);

  const { useradd, setUseradd } = useContext(addData);
  const { updateUser, setUpdateUser } = useContext(updatedata);
  const {deleteUserdata, setDeleteUserdata} = useContext(deletedata)

  const navigate = useNavigate();
  const addUser = () => {
    navigate("/register");
  };

  // get all user
  const getAllUsers = async () => {
    const response = await getAllUsersFunction();
    // console.log(response);
    if (response.status === 200) {
      setUsersData(response.data);
    } else {
      console.log("erro while getting user data");
    }
  };

  // delete a user
  const deleteUser = async (id) => {
    // console.log(id);
    const response = await deleteUserFunction(id);
    if (response.status === 200) {
      getAllUsers();
    } else {
      toast.error("error");
    }
  };

  useEffect(() => {
    getAllUsers();
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, []);

  return (
    <>
      {useradd ? (
        <Alert variant="success" onClose={() => setUseradd("")} dismissible>
          {useradd.fname.toUpperCase()} Successfully Added
        </Alert>
      ) : (
        ""
      )}

      {updateUser ? (
        <Alert variant="primary" onClose={() => setUpdateUser("")} dismissible>
          {updateUser.fname.toUpperCase()} Successfully Updated
        </Alert>
      ) : (
        ""
      )}

      <div className="container">
        <div className="main_div">
          {/* search and add btn  */}
          <div className="search_add mt-4 d-flex justify-content-between">
            <div className="search col-lg-4">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="success" className="search_btn">
                  Search
                </Button>
              </Form>
            </div>
            <div className="add_btn">
              <Button variant="primary" onClick={addUser}>
                <i class="fa-solid fa-plus"></i>&nbsp;Add User
              </Button>
            </div>
          </div>
          {/* export gender short status   */}

          {/* export to csv*/}
          <div className="filter_div mt-5 d-flex justify-content-sm-between flex-wrap">
            <div className="export_csv">
              <Button className="export_btn">Export to Csv</Button>
            </div>
            {/* filter by gender  */}
            <div className="filter_gender">
              <div className="filter">
                <h3>Filter By Gender</h3>
                <div className="gender d-flex justify-content-around flex-wrap">
                  <Form.Check
                    type={"radio"}
                    name="gender"
                    label={"All"}
                    value={"All"}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    name="gender"
                    label={"Male"}
                    value={"Male"}
                  />
                  <Form.Check
                    type={"radio"}
                    name="gender"
                    label={"Female"}
                    value={"Female"}
                  />
                </div>
              </div>
            </div>
            {/* short or filter by createdtime */}
            <div className="filter_newold">
              <h3>Short By Value</h3>
              <Dropdown className="text-center">
                <Dropdown.Toggle className="dropdown_btn" id="dropdown-basic">
                  <i class="fa-solid fa-sort"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>New</Dropdown.Item>
                  <Dropdown.Item>Old</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            {/* filter by status */}
            <div className="filter_status">
              <div className="status">
                <h3>Filter By Status</h3>
                <div className="status d-flex justify-content-around flex-wrap">
                  <Form.Check
                    type={"radio"}
                    name="status"
                    label={"All"}
                    value={"All"}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    name="status"
                    label={"Active"}
                    value={"Active"}
                  />
                  <Form.Check
                    type={"radio"}
                    name="status"
                    label={"Inactive"}
                    value={"Inactive"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {showSpin ? (
          <Spiner />
        ) : (
          <Tables usersData={usersData} deleteUser={deleteUser} />
        )}
      </div>
    </>
  );
};

export default Home;
