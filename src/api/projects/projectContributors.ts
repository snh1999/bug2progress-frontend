import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TProjectContributor } from "@/api/projects/projects.types";
import { PostRequest } from "@/api/axios";

export const useJoinProjectByInviteCode = () => {
  const queryClient = useQueryClient();
  return useMutation<TProjectContributor, Error, string>({
    mutationFn: async (inviteCode: string) => {
      const response = await PostRequest(`/projects/${inviteCode}/join`, {});
      return response.data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["projectContributors"] }),
  });
};
