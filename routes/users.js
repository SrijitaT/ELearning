var express = require("express");
var router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User_model = require("../models/users");
const Student_model = require("../models/student");
const Instructor_model = require("../models/instructor");
/* GET users listing. */
router.get("/register", function(req, res, next) {
  res.render("users/register", {});
});
router.post("/register", (req, res, next) => {
  const toCreate = {
    name: req.body.name,
    address: req.body.address
  };
  User_model.createUser({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    type: req.body.type
  }).then(resp => {
    var user_id = resp.dataValues.id;

    if (req.body.type == "Student") {
      Student_model.createStudent({
        ...toCreate,
        user_id: user_id,
        type: "student",
        classes: {}
      }).then(response => {
        console.log("Student created!!");
        req.flash("success_msg", "Student Added!!");
        res.redirect("/");
      });
    } else if (req.body.type == "Instructor") {
      Instructor_model.createInstructor({
        ...toCreate,
        user_id: user_id,
        type: "instructor",
        classes: {}
      }).then(response => {
        console.log("Instructor created!!");
        req.flash("success_msg", "Instructor Added!!");
        res.redirect("/");
      });
    }
  });
});

passport.serializeUser((user, done) => {
  done(null, user[0].dataValues.id);
});
passport.deserializeUser((id, done) => {
  User_model.getUserByID(id).then(user => {
    done(null, {
      id: user[0].dataValues.id,
      username: user[0].dataValues.username,
      type: user[0].dataValues.type
    });
  });
});

passport.use(
  new LocalStrategy(function(username, password, done) {
    User_model.getUserByName(username)
      .then(user => {
        if (!user) {
          return done(null, false, { message: "Unknown user" });
        } else {
          if (
            !User_model.validatePassword(password, user[0].dataValues.password)
          ) {
            console.log("Didnot match");
            return done(null, false, { message: "Invalid Password!!" });
          } else {
            console.log("matched");
            return done(null, user);
          }
        }
      })
      .catch(err => done(err));
  })
);

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash: true
  }),
  (req, res, next) => {
    req.flash("success_msg", req.user[0].dataValues.email + " now logged in!!");
    const usertype = req.user[0].dataValues.type.toLowerCase();
    res.redirect("/" + usertype + "s/classes");
  }
);

// Log User Out
router.get("/logout", function(req, res) {
  req.logout();
  // Success Message
  req.flash("success_msg", "You have logged out");
  res.redirect("/");
});
module.exports = router;
