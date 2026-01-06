import { searchUsers } from "@/services/search";
import { useQuery } from "@tanstack/react-query";

import { useEffect, useState } from "react";

export const useUserSearch = (query: string) => {
  return useQuery({
    queryKey: ["user-search", query],
    queryFn: () => searchUsers(query),
    enabled: query.trim().length >= 2, // 🔥 IMPORTANT
    staleTime: 60 * 1000,               // cache for 1 min
    gcTime: 5 * 60 * 1000,              // garbage collect after 5 min
    retry: 1,
  });
};


export const useDebounce = (value: string, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
