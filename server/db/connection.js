const mongoose = require("mongoose");

const DB = process.env.DB_CONNECTION;

mongoose
  .connect(DB)
  .then(() => console.log("DATABASE CONNECTED"))
  .catch((error) => console.log("error" + error.message));
