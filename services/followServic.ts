import { ApiEndpoint } from "@/constants/apiendpoint";
import { api } from "@/utils/api";


export const follow = async (followingId: string) => {
    const res = await api.post(ApiEndpoint.follow.followUser(followingId));
    return res.data;
}
