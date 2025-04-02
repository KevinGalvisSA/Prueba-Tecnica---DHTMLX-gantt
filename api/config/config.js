// Database connection setup
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite", // Archivo donde se guardarán los datos
  logging: false, // Desactivar logs de SQL
});

module.exports = sequelize;
