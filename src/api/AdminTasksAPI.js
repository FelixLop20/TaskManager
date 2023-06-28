import axios from "axios";

export const AdminTasksAPI = axios.create({
  baseURL: "http://localhost:3001/api/",
});
