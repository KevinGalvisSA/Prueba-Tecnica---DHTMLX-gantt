# Documentación del Proyecto - DHTMLX Gantt en React

## 1. Descripción del Proyecto
Este proyecto consiste en la implementación de un diagrama de Gantt en React utilizando la librería **DHTMLX Gantt**. Se han desarrollado funcionalidades de **CRUD (Crear, Leer, Actualizar y Eliminar)** para las actividades y subactividades del Gantt, con almacenamiento en una base de datos **SQLite o PostgreSQL**. El backend está construido con **Node.js y Express** siguiendo la arquitectura **MVC**.

---

## 2. Tecnologías Utilizadas
### Frontend
- React con Vite
- DHTMLX Gantt
- Fetch API para comunicación con el backend

### Backend
- Node.js con Express
- Sequelize ORM
- SQLite/PostgreSQL

### Arquitectura
- Modelo-Vista-Controlador (MVC)

---

## 3. Funcionalidades Implementadas
### Gantt en React
- Representación de actividades principales (**tasks**).
- Creación de subactividades (**subtasks**) anidadas correctamente.
- Agrupación de actividades en **proyectos (project tasks)**.
- Edición de tareas dentro del Gantt.

### Backend (API REST)
- **Obtener todas las tareas:** `GET /tasks`
- **Crear una nueva tarea:** `POST /tasks`
- **Actualizar una tarea:** `PUT /tasks/:id`
- **Eliminar una tarea:** `DELETE /tasks/:id`

### Base de Datos
- Se utiliza **Sequelize** para la gestión de datos en **SQLite o PostgreSQL**.
- Estructura de la tabla `Task`:
  - `id` (PK, autoincremental)
  - `text` (STRING, obligatorio)
  - `start_date` (DATE, obligatorio)
  - `duration` (INTEGER, obligatorio)
  - `parent` (INTEGER, por defecto 0)
  - `type` (STRING, valores: "task" o "project", por defecto "task")

---

## 4. Estructura del Proyecto
```
/root
│── /frontend (React con Vite)
│── /backend (Node.js con Express)
│   │── /config (Configuración de Sequelize)
│   │── /controllers (Controladores para tareas)
│   │── /models (Modelos de Sequelize)
│   │── /routes (Rutas del API REST)
│   └── server.js (Archivo principal del backend)
└── README.md (Documentación del proyecto)
```

---

## 5. Instalación y Configuración

### Instalación del Backend
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/KevinGalvisSA/Prueba-Tecnica---DHTMLX-gantt
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar la base de datos en el archivo `.env`:
   ```env
   DATABASE_URL=postgres://usuario:password@localhost:5432/nombre_bd
   ```
4. Ejecutar el backend:
   ```bash
   npm start
   ```

### Instalación del Frontend
1. Ir a la carpeta del frontend:
   ```bash
   cd frontend
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Ejecutar el frontend:
   ```bash
   npm run dev
   ```