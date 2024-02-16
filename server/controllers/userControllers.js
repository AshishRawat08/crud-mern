const users = require("../models/usersSchema");
const moment = require("moment");

// register user
exports.userRegister = async (req, res) => {
  const file = req.file.filename;
  const { fname, lname, email, mobile, gender, location, status } = req.body;
  if (
    !fname ||
    !lname ||
    !email ||
    !mobile ||
    !gender ||
    !location ||
    !status ||
    !file
  ) {
    res.status(401).json({ error: "all fields are required" });
  }
  try {
    const userExist = await users.findOne({ email: email });
    if (userExist) {
      res.status(401).json({ error: "user already exist" });
    } else {
      const datecreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
      const userData = new users({
        fname,
        lname,
        email,
        mobile,
        gender,
        location,
        status,
        profile: file,
        datecreated,
      });
      await userData.save();
      res.status(200).json(userData);
    }
  } catch (error) {
    res.status(401).json({ error: "error" });
    console.log("Error from catch block");
  }
};

// get users
exports.userGet = async (req, res) => {
  try {
    const usersdata = await users.find();
    res.status(200).json(usersdata);
  } catch (error) {
    res.status(401).json(error);
    console.log("error");
  }
};

//get single user
exports.getSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const userdata = await users.findOne({ _id: id });
    res.status(200).json(userdata);
  } catch (error) {
    res.status(401).json(error);
    console.log("error");
  }
};
