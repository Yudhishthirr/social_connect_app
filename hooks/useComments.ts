import {
  addComment,
  deleteComment,
  getComments,
  likeComment,
} from "@/services/commentService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ----------------------
// FETCH COMMENTS
// ----------------------
export const useComments = (postId: string) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId),
    // enabled: !!postId,
    enabled: false,
    staleTime: 1000 * 60 * 1, // 1 minute
  });
};

// ----------------------
// ADD COMMENT
// ----------------------
export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, content }: { postId: string; content: string }) =>
      addComment(postId, content),
    onSuccess: (_data, variables) => {
      // Invalidate comments for this post
      queryClient.invalidateQueries({ queryKey: ["comments", variables.postId] });
      // Also invalidate posts to update comment count
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

// ----------------------
// LIKE COMMENT
// ----------------------
export const useLikeComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => likeComment(commentId),
    onSuccess: () => {
      // Invalidate all comments queries to refresh like counts
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};

// ----------------------
// DELETE COMMENT
// ----------------------
export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),
    onSuccess: () => {
      // Invalidate all comments queries
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      // Also invalidate posts to update comment count
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

