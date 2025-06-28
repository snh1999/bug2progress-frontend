import { useQuery } from "@tanstack/react-query";
import { apiWithAuth } from "../axios";
import { getBearerToken } from "@/components/auth/auth.actions";

export const useGetCurrentUser = () => {
  useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const api = await apiWithAuth();
      return api.get("/user/me");
    },
  });
};
