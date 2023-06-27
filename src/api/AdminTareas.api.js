import axios from "axios";

export const AdminTareasAPI = axios.create({
  baseURL: "http://localhost:3001/api/",
});
