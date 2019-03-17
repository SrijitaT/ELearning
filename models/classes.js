const db = require("../dbConnection");
const Sequelize = require("sequelize");
const Classes = db.define(
  "classes",
  {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    instructor: Sequelize.STRING,
    lessons: Sequelize.JSON
  },
  {
    timestamps: false
  }
);
module.exports = Classes;
module.exports.getClasses = limit => {
  return Classes.findAll({ limit });
};
module.exports.getClassById = id => {
  return Classes.findAll({ where: { id } });
};
