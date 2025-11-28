import { createPost, getAllPosts, likePost } from '@/services/postService';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// ----------------------
// FETCH POSTS
// ----------------------
export const usePost = () =>
  useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam }) => getAllPosts({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.nextPage : undefined;
    },
    staleTime: 1000 * 60 * 2,
    retry: 2,
});


// ----------------------
// CREATE POST
// ----------------------
export const useCreatePost = () => {
  const queryClient = useQueryClient(); // ✅ Move inside hook

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};


// ----------------------
// LIKE POST (OPTIMISTIC)
// ----------------------
export const useLikePost = () => {
  const queryClient = useQueryClient(); // ✅ Move inside hook

  return useMutation({
    mutationFn: likePost,

    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] });

      const previousData = queryClient.getQueryData(['posts']);

      queryClient.setQueryData(['posts'], (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            data: page.data.map((post: any) =>
              post._id === postId
                ? {
                    ...post,
                    isLiked: !post.isLiked,
                    likesCount: post.isLiked
                      ? post.likesCount - 1
                      : post.likesCount + 1,
                  }
                : post
            ),
          })),
        };
      });

      return { previousData };
    },

    onError: (_err, _postId, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['posts'], context.previousData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
