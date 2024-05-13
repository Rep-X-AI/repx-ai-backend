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
  getSubmissionsOfTeachers,
  getSubmissionOfStudent,
  submitAssignment,
  evaluate
} = require("../controller/Assignment");


router
  .post("/create", createAssignment)
  .post("/joinAssignment",joinAssignment)
  .post("/submitAssignment/:id", submitAssignment)
  .get("/teachers/:useruid", fetchAssignmentsOfTeacher)
  .get("/students/:useruid", fetchAssignmentsOfStudent)
  .patch("/:id", updateAssignment)
  .delete("/:id", deleteAssignment)
  .delete("/:id/submissions", deleteAllSubmissions)
  .get("/get-assignment-teacher/:id",fetchParticularAssignmentofTeacher)
  .get("/get-assignment-student/:id",fetchParticularAssignmentofStudent)
  .get("/get-submissions-teacher/:id" , getSubmissionsOfTeachers )
  .get("/get-submissions-student/:id" , getSubmissionOfStudent )
  .post("/evaluate/:id" , evaluate)

module.exports = {router}
