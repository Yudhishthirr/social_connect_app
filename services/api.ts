import axios from "axios";

const LOCAL_IP = "10.40.220.161"; // your laptop WiFi IP
export const API_BASE_URL = `http://${LOCAL_IP}:5000/api/v1`;

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ----------- Types -----------

export interface RegisterPayload {
  fullName: string;
  email: string;
  username: string;
  password: string;
}

// ----------- API Methods -----------

export async function registerUser(payload: RegisterPayload) {

  const response = await api.post("/users/register", payload);
  return response; // axios wraps data inside .data
}
