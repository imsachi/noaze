import axios from "axios";

const api = axios.create({
  baseURL: "https://noaze.com/api/",
  withCredentials: true, // allow cookies
});

export default api;
