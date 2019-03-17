var express = require("express");
var router = express.Router();
const classes = require("../models/classes");

/* GET home page. */
router.get("/", function(req, res, next) {
  classes.getClasses(3).then(resp => {
    const newArr = resp.map(data => data.dataValues);
    res.render("index", { classes: newArr });
  });
});

module.exports = router;
