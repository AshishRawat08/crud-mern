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

// update or edit user data
router.put(
  "/user/edit/:id",
  upload.single("user_profile"),
  userControllers.userEdit
);

// delete a user
router.delete("/user/delete/:id", userControllers.userDelete);

// update status
router.put("/user/status/:id", userControllers.userStatusUpdate);

// export user
router.get("/userexport", userControllers.userExport);

module.exports = router;
