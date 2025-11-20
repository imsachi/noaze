import axios from "axios";

const api = axios.create({
  baseURL: "https://zustit.com/api",
  withCredentials: true, // allow cookies
});

export default api;
