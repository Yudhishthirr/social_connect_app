import { getStories } from '@/services/storiesService';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useStory = () =>
  useInfiniteQuery({
    queryKey: ['stories'],
    queryFn: () => getStories(),   // no pageParam
    initialPageParam: 1,
    getNextPageParam: () => undefined, // no more pages
    staleTime: 1000 * 60 * 2,
    retry: 2,
  });
