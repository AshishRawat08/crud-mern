const users = require("../models/usersSchema");
const moment = require("moment");
const csv = require("fast-csv");
const fs = require("fs");
const BASE_URL = process.env.BASE_URL;

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

// get all users
exports.userGet = async (req, res) => {
  const search = req.query.search || "";
  const gender = req.query.gender || "";
  const status = req.query.status || "";
  const sort = req.query.sort || "";

  const query = {
    $or: [
      { fname: { $regex: search, $options: "i" } }, // Search by fname
      { lname: { $regex: search, $options: "i" } }, // Search by lname
    ],
  };
  if (gender !== "All") {
    query.gender = gender;
  }
  if (status !== "All") {
    query.status = status;
  }

  try {
    const usersdata = await users
      .find(query)
      .sort({ datecreated: sort == "new" ? -1 : 1 });
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

// edit/update user
exports.userEdit = async (req, res) => {
  const { id } = req.params;
  const {
    fname,
    lname,
    email,
    mobile,
    gender,
    location,
    status,
    user_profile,
  } = req.body;
  const file = req.file ? req.file.filename : user_profile;

  const dateupdated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
  try {
    const updateUser = await users.findByIdAndUpdate(
      { _id: id },
      {
        fname,
        lname,
        email,
        mobile,
        gender,
        location,
        status,
        profile: file,
        dateupdated,
      },
      { new: true }
    );
    await updateUser.save();
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(401).json(error);
  }
};

//delete user

exports.userDelete = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await users.findByIdAndDelete({ _id: id });
    res.status(200).json(deleteUser);
  } catch (error) {
    res.status(401).json(error);
  }
};

// change or update user status
exports.userStatusUpdate = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  try {
    const statusUpadte = await users.findByIdAndUpdate(
      { _id: id },
      { status: data },
      { new: true }
    );
    res.status(200).json(statusUpadte);
  } catch (error) {
    res.status(401).json(error);
  }
};

// export user
exports.userExport = async (req, res) => {
  try {
    const usersdata = await users.find();

    const csvStream = csv.format({ headers: true });

    if (!fs.existsSync("public/files/export")) {
      if (!fs.existsSync("public/files")) {
        fs.mkdirSync("public/files");
      }
      if (!fs.existsSync("public/files/export")) {
        fs.mkdirSync("./public/files/export");
      }
    }

    const writablestream = fs.createWriteStream(
      "public/files/export/users.csv"
    );
    csvStream.pipe(writablestream);

    writablestream.on("finish", function () {
      res
        .status(200)
        .json({ downloadUrl: `${BASE_URL}/files/export/users.csv` });
    });

    if (usersdata.length > 0) {
      usersdata.map((user) => {
        csvStream.write({
          First_Name: user.fname ? user.fname : "-",
          Last_Name: user.lname ? user.lname : "-",
          Mobile: user.mobile ? user.mobile : "-",
          Email: user.email ? user.email : "-",
          Status: user.status ? user.status : "-",
          Gender: user.gender ? user.gender : "-",
          Location: user.location ? user.location : "-",
          Date_Created: user.datecreated ? user.datecreated : "-",
          Date_Updated: user.dateupdate ? user.dateupdate : "-",
        });
      });
    }
    csvStream.end();
    writablestream.end();
  } catch (error) {
    res.status(401).json(error);
  }
};
