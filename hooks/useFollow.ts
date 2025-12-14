// useFollow.ts
import { follow } from "@/services/followServic";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useFollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => follow(userId),

    onSuccess: (_data, userId) => {
      // invalidate only that user's profile
      queryClient.invalidateQueries({
        queryKey: ["userById", userId],
      });

      queryClient.invalidateQueries({
        queryKey: ["currentUser"],
      });
    },
  });
};
