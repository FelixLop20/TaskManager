import axios from "axios";

export const AdminTasksAPI = axios.create({
  baseURL: "http://localhost:3001/api/",
});

export const readColaboratos = async () => {
  try {
    const response = await AdminTasksAPI.get('/colaborador/colaboradores');
    const colaborators = response.data.data;
    return colaborators;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const readStates = async () => {
  try {
    const response = await AdminTasksAPI.get('/estado/estados')
    const states = response.data.data;
    return states;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const readPriorities = async () => {
  try {
    const response = await AdminTasksAPI.get('/prioridad/prioridades');
    const priorities = response.data.data;
    return priorities;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const createTask = async (body) => {
  try {
    const response = await AdminTasksAPI.post('/tarea/creartarea', body);
    return response.data.message;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const editTask = async (task_id, body) => {
  try {
    const response = await AdminTasksAPI.put(`/tarea/editartarea/${task_id}`, body);
    return response.data.message;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const obtenertasks = async () => {
  try {
    const response = await AdminTasksAPI.get('/tarea/tareas');
    const tasks = response.data.data;
    return tasks;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const tasksFilter  = async (body) => {
  try {
    const response = await  AdminTasksAPI.post('/tarea/filtrartareas', body);
    const tasks = response.data.data;
    return tasks;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};