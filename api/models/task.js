// Defines the model schema

const { DataTypes } = require("sequelize");
const sequelize = require("../config/config.js");

const Task = sequelize.define("Task", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    text: { type: DataTypes.STRING, allowNull: false },
    start_date: { type: DataTypes.DATE, allowNull: false },
    duration: { type: DataTypes.INTEGER, allowNull: false },
    parent: { type: DataTypes.INTEGER, defaultValue: 0 },
});

module.exports = Task;
