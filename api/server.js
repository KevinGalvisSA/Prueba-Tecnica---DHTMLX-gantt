// Main server file that configures Express

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/config.js");
const Task = require("./models/Task");

const app = express();
app.use(cors());
app.use(express.json());

// Sincronizar base de datos
sequelize.sync().then(() => console.log("Base de datos SQLite conectada"));

// Obtener todas las tareas
app.get("/tasks", async (req, res) => {
    try {
      const tasks = await Task.findAll();
  
      // Formatear la fecha con `toLocaleDateString`
      const formattedTasks = tasks.map(task => ({
        id: task.id,
        text: task.text,
        start_date: new Date(task.start_date).toLocaleDateString("es-ES"), // "02/04/2024"
        duration: task.duration,
        parent: task.parent
      }));
  
      res.json({ data: formattedTasks });
    } catch (error) {
      res.status(500).json({ error: "Error al obtener tareas" });
    }
  });
  

// Crear una nueva tarea
app.post("/tasks", async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
});

// Eliminar una tarea
app.delete("/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }
    // Mensaje personalizado antes de eliminar
        const message = `La tarea "${task.text}" ha sido eliminada exitosamente.`;
            await task.destroy();
            res.json({ message });
        } catch (error) {
        res.status(500).json({ error: "Error al eliminar la tarea" });
        }
    }
);

app.listen(4000, () => console.log("Servidor corriendo en http://localhost:4000"));
