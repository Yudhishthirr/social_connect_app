import { ApiEndpoint } from "@/constants/apiendpoint";
import { api } from "@/utils/api";

export const searchUsers = async (query: string) => {
  const res = await api.get(
    `${ApiEndpoint.search.users}?q=${encodeURIComponent(query)}`
  );

  return res.data;
};
