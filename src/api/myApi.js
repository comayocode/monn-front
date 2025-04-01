import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Obtenemos el token almacenado
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Agregamos el token al header
  }
  return config;
});

export default api;
