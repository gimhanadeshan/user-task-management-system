import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false,
});

// Add JWT token to headers if exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Customize error messages based on status code
      switch (error.response.status) {
        case 401:
          error.message = error.response.data?.message || "Unauthorized access";
          break;
        case 403:
          error.message = error.response.data?.message || "Access denied";
          break;
        case 500:
          error.message = error.response.data?.message || "Server error";
          break;
        default:
          error.message = error.response.data?.message || "Request failed";
      }
    }
    return Promise.reject(error);
  }
);

export default api;