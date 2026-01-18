import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../contextApi/userContext";

const {backendUrl} = useContext(UserContext)

const api = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

export default api;