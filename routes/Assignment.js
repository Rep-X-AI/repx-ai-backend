const express = require("express");
const router = express.Router();
const { createAssignment, updateAssignment, fetchAssignmentsOfTeacher, fetchAssignmentsOfStudent, deleteAssignment, deleteAllSubmissions, joinAssignment } = require("../controller/Assignment");

router.post("/create", createAssignment)
      .post("/join", joinAssignment)
      .get("/teachers/:useruid", fetchAssignmentsOfTeacher)
      .get("/students/:useruid", fetchAssignmentsOfStudent)
      .patch('/:id', updateAssignment)
      .delete('/:id', deleteAssignment)
      .delete('/:id/submissions', deleteAllSubmissions);;


exports.router = router;