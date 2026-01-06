import axios from "axios";
import * as SecureStore from "expo-secure-store";

import { API_BASE_URL } from "@/constants/constant";


export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// interceptors to attach token to requests and handle token refresh
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


api.interceptors.response.use(
  (res) => res,
  async (err) => {
    // If token expired
    if (err.response?.status === 401) {
      const refreshToken = await SecureStore.getItemAsync("refreshToken");

      if (!refreshToken) {
        return Promise.reject(err);
      }

      try {
        // call refresh token API
        const refreshResponse = await axios.post(
          `${API_BASE_URL}/users/refresh-token`,
          { refreshToken }
        );

        const newAccessToken = refreshResponse.data?.data?.accessToken;

      
        await SecureStore.setItemAsync("accessToken", newAccessToken);

        
        err.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(err.config);

      } catch (refreshErr) {
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(err);
  }
);
