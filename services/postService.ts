
import { ApiEndpoint } from "@/constants/apiendpoint";
import { api } from "@/utils/api";

import { PostSchemaType } from "@/validation/postSchema";


export const UserPost = async (data: PostSchemaType) => {
    const formData = new FormData();
  
    formData.append("title", data.title);
    formData.append("hashtags", data.hashtags);
    formData.append("postImage", {
      uri: data.postImage,
      type: "image/jpeg",
      name: "upload.jpg",
    }as any);
  
    const res = await api.post(ApiEndpoint.posts.create, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  
    return res.data;
};
  