import React, { useEffect, useRef } from "react";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import gantt from "dhtmlx-gantt";

const GanttChart = () => {
  const ganttContainer = useRef(null);

  useEffect(() => {
    gantt.init(ganttContainer.current);
    
    fetch("http://localhost:4000/tasks")
      .then((response) => response.json())
      .then((data) => {
        gantt.parse(data); 
        gantt.setSizes(); // Ajusta el tamaño del gantt
      })
      .catch((error) => console.error("Error al cargar tareas:", error));

    return () => {
      gantt.clearAll();
    };
  }, []);

  return <div ref={ganttContainer} className="gantt-container" />;
};

export default GanttChart;
