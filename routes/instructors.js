var express = require("express");
var router = express.Router();
//const classes = require("../models/classes");
//const students = require("../models/student");
const Instructor_model = require("../models/instructor");

/* GET home page. */
router.get("/classes", function(req, res, next) {
  Instructor_model.getInstructorByUserName(req.user.username)
    .then(resp => {
      res.render("instructors/classes", { instructor: resp[0][0] });
    })
    .catch(err => {
      res.render("instructors/classes", { instructor: {} });
    });
});

module.exports = router;
