//src/axios.js
import axios from "axios";

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ,
 
  withCredentials: true,
});
axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token'); // ya jis jagah store kiya ho
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  
export default axiosInstance;
