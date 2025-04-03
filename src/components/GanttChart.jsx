import React, { useEffect, useRef } from "react";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import gantt from "dhtmlx-gantt";
import "../App.jsx"

const GanttChart = () => {
  const ganttContainer = useRef(null);

  useEffect(() => {
    gantt.init(ganttContainer.current);
    gantt.render();

    // Eliminacion de eventos previos
    gantt.detachAllEvents();

    // Configuracion de la lightbox object
    gantt.config.lightbox.sections = [
      { name: "text", height: 30, map_to: "text", type: "textarea" },
      {
        name: "type",
        type: "select",
        map_to: "type",
        options: [
          { key: "task", label: "Tarea" },
          { key: "project", label: "Proyecto" },
        ],
      },
      { name: "time", type: "duration", map_to: "auto" },
    ];

    // Carga de datos
    fetch("http://localhost:4000/tasks")
      .then((response) => response.json())
      .then((data) => {
        gantt.clearAll(); // Eliminacion de duplicados
        gantt.parse(data);
      })
      .catch((error) => console.error("Error al cargar tareas:", error));

    // Envio de la creacion de la tarea a la base de datos
    gantt.attachEvent("onAfterTaskAdd", (id, task) => {
      console.log("Tarea Creada:", task);
      fetch("http://localhost:4000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: task.text,
          start_date: task.start_date,
          duration: task.duration,
          parent: task.parent,
          type: task.type || "task",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Tarea creada en la base:", data);
          if (data.data?.id) {
            gantt.changeTaskId(id, data.data.id);
          }
        })
        .catch((error) => console.error("Error al crear tarea:", error));
    });

    // Envio de la actualizacion de la tarea a la base de datos
    gantt.attachEvent("onAfterTaskUpdate", (id, task) => {
      fetch(`http://localhost:4000/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: task.text,
          start_date: task.start_date,
          duration: task.duration,
          parent: task.parent,
          type: task.type,
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log("Tarea actualizada:", data))
        .catch((error) => console.error("Error al actualizar tarea:", error));
    });

    // Envio de la eliminacion de la tarea a la base de datos
    gantt.attachEvent("onAfterTaskDelete", (id) => {
      fetch(`http://localhost:4000/tasks/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => console.log("Tarea eliminada:", data))
        .catch((error) => console.error("Error al eliminar tarea:", error));
    });

    return () => {
      gantt.clearAll();
    };
  }, []);

  return <div ref={ganttContainer} className="gantt-container" />;
};

export default GanttChart;
