require("dotenv").config();
const express = require("express");
require("./db/connection");
const app = express();
const cors = require("cors");
const router = require("./routes/router");

const PORT = 6010;

app.use(cors());
app.use(express.json());
app.use(router);
app.use("/uploads", express.static("./uploads"));

app.listen(PORT, () => {
  console.log(`Server is started at port no. ${PORT}`);
});
