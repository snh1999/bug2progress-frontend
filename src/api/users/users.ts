import { useQuery } from "@tanstack/react-query";
import { GetRequest } from "@/api/axios";

export const useGetCurrentUser = () =>
  useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => GetRequest("/users/me"),
  });
