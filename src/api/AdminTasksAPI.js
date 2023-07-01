import axios from "axios";

// Crea una instancia de Axios con una URL base
export const AdminTasksAPI = axios.create({
  baseURL: "http://localhost:3001/api/",
});

// Función para leer colaboradores
export const readColaboratos = async () => {
  try {
    const response = await AdminTasksAPI.get('/colaborador/colaboradores');
    const colaborators = response.data.data;
    return colaborators;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

//Funcion para leer estados
export const readStates = async () => {
  try {
    const response = await AdminTasksAPI.get('/estado/estados')
    const states = response.data.data;
    return states;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

//Funcion para leer prioridades
export const readPriorities = async () => {
  try {
    const response = await AdminTasksAPI.get('/prioridad/prioridades');
    const priorities = response.data.data;
    return priorities;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

//Funcion para crear una nueva tarea
export const createTask = async (body) => {
  try {
    const response = await AdminTasksAPI.post('/tarea/creartarea', body);
    return response.data.message;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

//Funcion para editar una tarea
export const editTask = async (task_id, body) => {
  try {
    const response = await AdminTasksAPI.put(`/tarea/editartarea/${task_id}`, body);
    return response.data.message;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

//Funcion para leer todas las tareas
export const getTasks = async () => {
  try {
    const response = await AdminTasksAPI.get('/tarea/tareas');
    const tasks = response.data.data;
    return tasks;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

//Funcion para filtrar tareas
export const tasksFilter = async (body) => {
  try {
    const response = await AdminTasksAPI.post('/tarea/filtrartareas', body);
    const tasks = response.data.data;
    return tasks;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

//Funcion para eliminar tareas
export const deleteTask = async (id) => {
  try {
    const response = await AdminTasksAPI.delete(`/tarea/eliminartarea/${id}`);
    return response.data.message;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
