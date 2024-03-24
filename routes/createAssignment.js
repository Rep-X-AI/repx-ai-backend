const express = require("express");
const router = express.Router();
const { Assignment } = require("../model/Assignment");

router.post("/addassignment", async (req, res) => {
  const { title, desc, questionUrl, modelAnsUrl, createdBy } =
    req.body;
  try {
    const assignment = new Assignment({
      title,
      desc,
      questionUrl,
      modelAnsUrl,
      createdBy,
    });
    await assignment.save();
    res.send(assignment);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
