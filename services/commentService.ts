import { ApiEndpoint } from "@/constants/apiendpoint";
import { api } from "@/utils/api";

// Get comments for a post
export const getComments = async (postId: string) => {
  const res = await api.get(ApiEndpoint.comments.get(postId));
  return res.data;
};

// Add a comment to a post
export const addComment = async (postId: string, content: string) => {
  const res = await api.post(ApiEndpoint.comments.add(postId), {
    content,
  });
  return res.data;
};

// Like/Unlike a comment
export const likeComment = async (commentId: string) => {
  const res = await api.get(ApiEndpoint.like.toggleComment(commentId));
  return res.data;
};

// Delete a comment
export const deleteComment = async (commentId: string) => {
  const res = await api.delete(ApiEndpoint.comments.delete(commentId));
  return res.data;
};

