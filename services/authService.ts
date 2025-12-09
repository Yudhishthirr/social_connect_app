
import { ApiEndpoint } from "@/constants/apiendpoint";
import { api } from "@/utils/api";
import { LoginSchemaType, RegisterSchemaType } from "@/validation/authSchema";

export const registerUser = async (data: RegisterSchemaType) => {
  
  const formData = new FormData();

  formData.append("fullName", data.fullName);
  formData.append("email", data.email);
  formData.append("username", data.username);
  formData.append("password", data.password);
  formData.append("gender", data.gender);
  formData.append("AvtarImage", {
    uri: data.AvtarImage,
    type: "image/jpeg",
    name: "upload.jpg",
  }as any);

  const res = await api.post(ApiEndpoint.users.register, formData,{
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
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
