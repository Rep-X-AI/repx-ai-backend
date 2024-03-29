const express = require("express");
const { fetchUserById, createUser } = require("../controller/User");
const router = express.Router();


router.get("/fetchuser/:useruid", fetchUserById)
      .post("/signup", createUser)


exports.router = router;