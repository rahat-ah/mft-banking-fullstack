import axios from "axios";

const api = axios.create({
  baseURL:'https://mft-banking-fullstack.onrender.com',
  withCredentials: true,
});

export default api;