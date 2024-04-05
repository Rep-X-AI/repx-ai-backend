const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createAssignment,
  updateAssignment,
  fetchAssignmentsOfTeacher,
  fetchAssignmentsOfStudent,
  deleteAssignment,
  deleteAllSubmissions,
} = require("../controller/Assignment");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Assignments");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() ;
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({storage: storage });

const uploadfile = (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    const fileName = req.file ? req.file.filename : null;
    res.status(200).json({ fileName :"Assignments/"+fileName});
  });
};

router
  .post("/create", createAssignment)
  .get("/teachers/:useruid", fetchAssignmentsOfTeacher)
  .get("/students/:useruid", fetchAssignmentsOfStudent)
  .patch("/:id", updateAssignment)
  .delete("/:id", deleteAssignment)
  .delete("/:id/submissions", deleteAllSubmissions)
  .post("/uploadfiles", upload.single("file"), uploadfile);

module.exports = {
  router: router,
  uploadfile: uploadfile,
};
