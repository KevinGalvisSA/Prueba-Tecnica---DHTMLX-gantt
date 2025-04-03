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
📦 Prueba Tecnica - DHTMLX gantt
 ├── 📂 api
 │   ├── 📂 config
 │   ├── 📂 controllers
 │   ├── 📂 models
 │   ├── 📂 routes
 │   ├── 📜 server.js
 ├── 📂 node_modules
 ├── 📂 public
 ├── 📂 src
 │   ├── 📂 assets
 │   ├── 📂 components
 │   ├── 📂 services
 │   ├── 📂 styles
 │   ├── 📜 App.jsx
 │   ├── 📜 main.jsx
 ├── 📜 .envTemplate
 ├── 📜 .gitignore
 ├── 📜 eslint.config.js
 ├── 📜 index.html
 ├── 📜 package-lock.json
 ├── 📜 package.json
 ├── 📜 README.md
 ├── 📜 vite.config.js

```

---

## 5. Instalación y Configuración

### Clonación e Instalación
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/KevinGalvisSA/Prueba-Tecnica---DHTMLX-gantt
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. (PARA EFECTOS DE EVALUACION) Configurar la base de datos en el archivo `.env`:
   ```env
   DB_USER=
   DB_PASSWORD=
   DB_HOST=
   DB_PORT=
   DB_NAME=
   DB_DIALECT=
   ```
4. Ejecutar el backend:
   ```bash
   npm run api
   ```
5. Ejecutar el frontend:
   ```bash
   npm run dev
   ```