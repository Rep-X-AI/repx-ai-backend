const express = require("express");
const router = express.Router();
const { createAssignment, updateAssignment, fetchAssignmentsOfTeacher, fetchAssignmentsOfStudent } = require("../controller/Assignment");

router.post("/create", createAssignment)
      .patch('/:id', updateAssignment)
      .get("/teachers/:useruid", fetchAssignmentsOfTeacher)
      .get("/students/:useruid", fetchAssignmentsOfStudent);


exports.router = router;
