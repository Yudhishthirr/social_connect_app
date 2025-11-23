// src/hooks/useAuth.ts
import { loginUser, registerUser } from "@/services/authService";
import { logout, setCredentials } from "@/store/slices/authSlice";
import { LoginSchemaType, RegisterSchemaType } from "@/validation/authSchema";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";

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
  

  // const autoLogin = async () => {
  //   const token = await SecureStore.getItemAsync("token");
  //   if (!token) return null;

  //   const user = await fetchMe();

  //   dispatch(
  //     setCredentials({
  //       user,
  //       token,
  //     })
  //   );

  //   return user;
  // };

  const logoutUser = async () => {
    await SecureStore.deleteItemAsync("token");
    dispatch(logout());
  };

  return { login, register, logoutUser };
}
