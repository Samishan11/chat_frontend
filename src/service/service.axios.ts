import axios from "axios";
import { token } from "./token";

export const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    authorization: `Bearer ${token}`,
    "Content-type": "application/json",
  },
});
