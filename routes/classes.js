var express = require("express");
var router = express.Router();
const classes = require("../models/classes");

/* GET Classes Page*/
router.get("/", function(req, res, next) {
  classes.getClasses(3).then(resp => {
    const newArr = resp.map(data => data.dataValues);
    res.render("classes/index", { classes: newArr });
  });
});

//Class Details
router.get("/:id/details", function(req, res, next) {
  classes.getClassById(req.params.id).then(resp => {
    res.render("classes/details", { class: resp[0].dataValues });
  });
});

module.exports = router;
