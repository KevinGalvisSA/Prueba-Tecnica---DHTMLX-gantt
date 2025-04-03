// Main server file that configures Express

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/config.js");
const taskRoutes = require("./routes/route.js");

const app = express();
app.use(cors());
app.use(express.json());

// Sincronizar base de datos
sequelize.sync().then(() => console.log("Base de datos SQLite conectada"));

// Ruta solicitudes CRUD
app.use("/tasks", taskRoutes);

app.listen(4000, () => console.log("Servidor corriendo en http://localhost:4000"));

