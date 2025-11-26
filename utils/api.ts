import axios from "axios";
import * as SecureStore from "expo-secure-store";

const LOCAL_IP = "10.233.101.161";
export const API_BASE_URL = `http://${LOCAL_IP}:5000/api/v1`;

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

// -------------------------------------
// 1️⃣ REQUEST INTERCEPTOR (Attach Token)
// -------------------------------------
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// -------------------------------------
// 2️⃣ RESPONSE INTERCEPTOR (Refresh Token)
// -------------------------------------
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

        // Save new token
        await SecureStore.setItemAsync("accessToken", newAccessToken);

        //retry failed request with new token
        err.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(err.config);

      } catch (refreshErr) {
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(err);
  }
);
