const db = require("../dbConnection");
const Sequelize = require("sequelize");
const User_model = require("./users");
const Instructor = db.define(
  "instructors",
  {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: Sequelize.STRING,
    address: Sequelize.STRING,
    classes: Sequelize.JSON,
    user_id: Sequelize.INTEGER
  },
  {
    timestamps: false
  }
);
module.exports = Instructor;
module.exports.createInstructor = ins => {
  return Instructor.create(ins);
};
module.exports.getInstructorByUserName = uname => {
  return db.query(
    "select * from instructors where user_id in (select id from users where username = '" +
      uname +
      "')"
  );
};
