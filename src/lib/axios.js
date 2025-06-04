import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://bootcamp2025.depster.me/api/countries",
  headers: {
    "Content-Type": `application/json`,
  },
});

export default axiosInstance;
