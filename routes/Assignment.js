const express = require("express");
const router = express.Router();

const {
  createAssignment,
  updateAssignment,
  fetchAssignmentsOfTeacher,
  fetchAssignmentsOfStudent,
  deleteAssignment,
  deleteAllSubmissions,
  joinAssignment,
  fetchParticularAssignmentofStudent,
  fetchParticularAssignmentofTeacher,
} = require("../controller/Assignment");


router
  .post("/create", createAssignment)
  .post("/joinAssignment",joinAssignment)
  .get("/teachers/:useruid", fetchAssignmentsOfTeacher)
  .get("/students/:useruid", fetchAssignmentsOfStudent)
  .patch("/:id", updateAssignment)
  .delete("/:id", deleteAssignment)
  .delete("/:id/submissions", deleteAllSubmissions)
  .get("/get-assignment-teacher/:id",fetchParticularAssignmentofTeacher)
  .get("/get-assignment-student/:id",fetchParticularAssignmentofStudent)

module.exports = {router}
