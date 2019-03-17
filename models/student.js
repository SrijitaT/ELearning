const db = require("../dbConnection");
const Sequelize = require("sequelize");
const User_model = require("./users");
const Student = db.define(
  "student",
  {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: Sequelize.STRING,
    user_id: Sequelize.INTEGER,
    address: Sequelize.STRING,
    classes: Sequelize.JSON
  },
  {
    timestamps: false
  }
);
module.exports = Student;
module.exports.createStudent = std => {
  return Student.create(std);
};
module.exports.getStudentByUserName = uname => {
  return db.query(
    "select * from students where user_id in (select id from users where username='" +
      uname +
      "')"
  );
};
