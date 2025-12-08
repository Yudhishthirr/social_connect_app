
import { ApiEndpoint } from "@/constants/apiendpoint";
import { api } from "@/utils/api";
import { LoginSchemaType, RegisterSchemaType } from "@/validation/authSchema";

export const registerUser = async (data: RegisterSchemaType) => {
  
  const res = await api.post(ApiEndpoint.users.register, data);
  return res.data;
};

export const loginUser = async (data: LoginSchemaType) => {
  const res = await api.post(ApiEndpoint.users.login, data);
  return res.data; 
};

export const getCurrentUser = async () => {
  const res = await api.get(ApiEndpoint.users.currentUser);
  return res.data;
};

export const getUserById = async (id:string) => {
  const res = await api.get(ApiEndpoint.users.getUserById(id));
  return res.data;
};



export const logoutUser = async () => {
  const res = await api.get(ApiEndpoint.users.logout);
  return res.data;
};
