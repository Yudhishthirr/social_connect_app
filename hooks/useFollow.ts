// useFollow.ts
import { follow } from "@/services/followServic";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useFollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: follow,
    onSuccess: () => {
      // Refetch profile after follow
      queryClient.invalidateQueries({ queryKey: ["userById"] });
    },
  });
};
