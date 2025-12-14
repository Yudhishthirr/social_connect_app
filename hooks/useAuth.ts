// src/hooks/useAuth.ts
import { getUserById, loginUser, logoutUser, registerUser } from "@/services/authService";
import { logout, setCredentials } from "@/store/slices/authSlice";
import { LoginSchemaType, RegisterSchemaType } from "@/validation/authSchema";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";

import { getCurrentUser } from '@/services/authService';
import { useQuery } from '@tanstack/react-query';
import { router } from "expo-router";


export function useAuth() {
  const dispatch = useDispatch();

  const register = async (data: RegisterSchemaType) => {
    return await registerUser(data);
  };

  const login = async (data: LoginSchemaType) => {
    try {
      const result = await loginUser(data);
  
      // Validate response
      if (!result || !result.success) {
        throw new Error(result?.message || "Login failed");
      }
  
      if (!result.data?.accessToken || !result.data?.user) {
        throw new Error("Invalid login response from server");
      }
  
      const accessToken = result.data.accessToken;
      const refreshToken = result.data.refreshToken;
      const user = result.data.user;
  
      // Save tokens securely
      await SecureStore.setItemAsync("accessToken", accessToken);
      await SecureStore.setItemAsync("refreshToken", refreshToken);
  
      // Update Redux
      dispatch(
        setCredentials({
          user,
          token: accessToken,
        })
      );
      console.log("user is login now beucase you used login page and here is it information ");
      console.log(result);
      return result;
  
    } catch (error: any) {
      // Handle all API errors here
      console.log("Login error inside hook:", error.message);
  
      return {
        success: false,
        message: error?.response?.data?.message || error.message || "Login failed",
      };
    }
  };
  

  
  const logoutUserhook = async () => {
    try {
      
      const res = await logoutUser();
      if (res?.success) {

        await SecureStore.deleteItemAsync("accessToken");
        await SecureStore.deleteItemAsync("refreshToken");
  
        dispatch(logout()); // redux clear user
        router.push("/(auth)/login");
      }
  
      return res;
    } catch (err:any) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        console.log("Network/Unknown Error ➜", err.message);
      }
    }
  };
  

  return { login, register, logoutUserhook };
}


export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 5, // 5 min
  });
}

export function useUserById(id: string) {
  return useQuery({
    queryKey: ["userById", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}
