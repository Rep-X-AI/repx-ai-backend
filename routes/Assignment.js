const express = require("express");
const router = express.Router();
const { createAssignment } = require("../controller/Assignment");

router.post("/", createAssignment);


exports.router = router;
