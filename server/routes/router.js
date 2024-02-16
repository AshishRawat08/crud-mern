const express = require("express");
const router = new express.Router();
const userControllers = require("../controllers/userControllers");
const upload = require("../multerConfig/storageConfig");

// resgister route
router.post(
  "/user/register",
  upload.single("user_profile"),
  userControllers.userRegister
);

//  get users route
router.get("/user/details", userControllers.userGet);

// get single user data
router.get("/user/:id", userControllers.getSingleUser);

module.exports = router;
