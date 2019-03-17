var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const hbs = require("hbs");
var bodyParser = require("body-parser");

const expressValidator = require("express-validator");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const classesRouter = require("./routes/classes");
const studentRouter = require("./routes/students");
const instructorRouter = require("./routes/instructors");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//Connect Flash
app.use(flash());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Express session
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Makes the user object global in all views
app.get("*", function(req, res, next) {
  // put user into res.locals for easy access from templates
  res.locals.user = req.user || null;
  if (req.user) {
    res.locals.type = req.user.type.toLowerCase();
  }
  next();
});

//Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

/*app.use(function(req, res, next) {
  next(createError(404));
});*/

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/classes", classesRouter);
app.use("/students", studentRouter);
app.use("/instructors", instructorRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
