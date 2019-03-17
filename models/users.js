const db = require("../dbConnection");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const Users = db.define(
  "users",
  {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    type: Sequelize.TEXT
  },
  {
    timestamps: false,
    hooks: {
      beforeCreate: async function(user) {
        const salt = await bcrypt.genSalt(10); //whatever number you want
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
);

module.exports = Users;
module.exports.validatePassword = (enteredPass, password) => {
  console.log("password ", enteredPass, " ", password);
  return bcrypt.compare(enteredPass, password);
};
module.exports.getUserById = id => {
  return Users.findAll({ where: { id } });
};
module.exports.getUserByName = uname => {
  return Users.findAll({ where: { username: uname } });
};
module.exports.getUserByID = id => {
  return Users.findAll({ where: { id } });
};
module.exports.createUser = user => {
  return Users.create(user);
};
