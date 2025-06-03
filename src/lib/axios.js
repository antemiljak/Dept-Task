import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // API URL can be set globally
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`, // You can globally apply the token
  },
});

export default axiosInstance;
