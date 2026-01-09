
import { ApiEndpoint } from "@/constants/apiendpoint";
import { api } from "@/utils/api";



export const sendMessage = async (data: any) => {
    const res = await api.post(ApiEndpoint.messages.send,data);
    return res.data;
}

export const sendAiMessage = async (data: any) => {
    const res = await api.post(ApiEndpoint.ai.chat,data);
    return res.data;
}

export const getChatHistory = async (otherUserId: any) => {
    const res = await api.get(ApiEndpoint.messages.getMessages(otherUserId));
    // console.log(res)
    return res.data;
};