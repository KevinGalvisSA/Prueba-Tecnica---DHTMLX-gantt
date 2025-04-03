const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false, // Desactiva logs de SQL en consola (opcional)
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Necesario en Railway para evitar errores SSL
    },
  },
});

module.exports = sequelize;
