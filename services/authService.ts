import * as SecureStore from "expo-secure-store";
import { api } from "./api";

export interface RegisterResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    username: string;
    email: string;
  };
}

export async function registerUser(
  email: string,
  username: string,
  password: string
): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>("/users/register", {
    email,
    username,
    password,
  });

  const token = response.data?.token;

  if (token) {
    await SecureStore.setItemAsync("authToken", token);
  }

  return response.data;
}
