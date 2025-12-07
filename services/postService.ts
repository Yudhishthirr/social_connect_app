
import { ApiEndpoint } from "@/constants/apiendpoint";
import { api } from "@/utils/api";

import { PostSchemaType } from "@/validation/postSchema";


export const createPost = async (data: PostSchemaType) => {
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


export const getAllPosts = async ({ pageParam = 1 }) => {
  const res = await api.get(`/posts/get-posts?page=${pageParam}`);

  return {
    posts: res.data.posts,      // array
    nextPage: res.data.nextPage, // number
    hasMore: res.data.hasMore,   // boolean
  };
};


export const likePost = async (postId: string) => {
  const res = await api.get(ApiEndpoint.like.togglePost(postId));
  return res.data;
}