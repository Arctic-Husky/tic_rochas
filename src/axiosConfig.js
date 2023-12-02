import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://181.213.92.95:8000",
});

export default axiosInstance;