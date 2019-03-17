var express = require("express");
var router = express.Router();
const classes = require("../models/classes");
const students = require("../models/student");
const instructors = require("../models/instructor");

/* GET home page. */
router.get("/classes", function(req, res, next) {
  students.getStudentByUserName(req.user.username).then(resp => {
    res.render("students/classes", { student: resp[0][0] });
  });
});

module.exports = router;
