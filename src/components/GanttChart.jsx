import React, { useEffect, useRef } from "react";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import gantt from "dhtmlx-gantt";
import "../App.jsx"
import { getTasks, createTask, updateTask, deleteTask } from "../services/service.jsx";

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
    getTasks().then((tasks) => {
      gantt.clearAll(); // Eliminacion de duplicados
      gantt.parse({ data: tasks });
    });

    // Envio de la creacion de la tarea a la base de datos
    gantt.attachEvent("onAfterTaskAdd", (id, task) => {
      console.log("Tarea Creada:", task);

      // Asignacion del Id autoincrementado en el campo 'parent'
      const parentId = task.parent && gantt.getTask(task.parent) ? task.parent : 0;

      createTask({
        text: task.text,
        start_date: task.start_date,
        duration: task.duration,
        parent: parentId,
        type: task.type || "task",
      }).then((data) => {
        console.log("Tarea creada en la base:", data);
        if (data.task?.id) {
          gantt.changeTaskId(id, data.task.id); // Asignacion del ID autoincrementado desde el backend
        }
      });
    });

    // Envio de la actualizacion de la tarea a la base de datos
    gantt.attachEvent("onAfterTaskUpdate", (id, task) => {
      updateTask(id, {
        text: task.text,
        start_date: task.start_date,
        duration: task.duration,
        parent: task.parent,
        type: task.type,
      }).then((data) => console.log("Tarea actualizada:", data));
    });

    // Envio de la eliminacion de la tarea a la base de datos
    gantt.attachEvent("onAfterTaskDelete", (id) => {
      deleteTask(id).then((data) => console.log("Tarea eliminada:", data));
    });

    return () => {
      gantt.clearAll();
    };
  }, []);

  return <div ref={ganttContainer} className="gantt-container" />;
};

export default GanttChart;
