import axios from "axios";
import { token } from "./token";
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URI,
  headers: {
    authorization: `Bearer ${token}`,
    "Content-type": "application/json",
  },
});
