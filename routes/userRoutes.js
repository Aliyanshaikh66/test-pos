const express = require("express");
const {
  register,
  login,
} = require("./../controllers/userController");

const router = express.Router();

//routes
//Method - get
router.post("/login", login);

//MEthod - POST
router.post("/register", register);

module.exports = router;
