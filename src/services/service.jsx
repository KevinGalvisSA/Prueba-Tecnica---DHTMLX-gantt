// Functions to communicate with the backend
const API_URL = "http://localhost:4000/tasks";

// Obtener todas las tareas
export const getTasks = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    return [];
  }
};

// Crear una nueva tarea
export const createTask = async (task) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    return await response.json();
  } catch (error) {
    console.error("Error al crear tarea:", error);
  }
};

// Actualizar una tarea
export const updateTask = async (id, task) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    return await response.json();
  } catch (error) {
    console.error("Error al actualizar tarea:", error);
  }
};

// Eliminar una tarea
export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    return await response.json();
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
  }
};
