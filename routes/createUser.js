const express = require("express");
const router = express.Router();
const { User } = require("../model/User");

router.post("/adduser", async (req, res) => {
  const {email, name, role} = req.body;
  try {
    const user = new User({email, name, role});
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
