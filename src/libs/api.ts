import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000", // your NestJS backend
  headers: {
    "Content-Type": "application/json",
  },
   withCredentials: true, 
});

// Optionally add auth header if you’re using JWT
api.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
