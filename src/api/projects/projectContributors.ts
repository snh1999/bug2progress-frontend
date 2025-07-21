import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  EProjectRole,
  TContributorDto,
  TDeleteProjectDto,
  TProjectContributor,
  TProjectContributorWithUser
} from "@/api/projects/projects.types";
import { DeleteRequest, GetRequest, PatchRequest, PostRequest } from "@/api/axios";
import { toast } from "sonner";

export const useJoinProjectByInviteCode = () => {
  const queryClient = useQueryClient();
  return useMutation<TProjectContributor, Error, string>({
    mutationFn: async (inviteCode: string) => {
      const response = await PostRequest(`/projects/${inviteCode}/join`, {});
      return response.data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({queryKey: ["projectContributors"]}),
  });
};

export const useGetProjectContributors = ({id, role, userId}: {id: string, role?: EProjectRole, userId?: string
}) =>
  useQuery<TProjectContributorWithUser[], Error>({
    queryKey: ["members", id, role, userId],
    queryFn: async () => {
      const params = new URLSearchParams();
      if(role) params.append("role", role);
      if(userId) params.append("userId", userId);
      const response = await GetRequest(`/projects/${id}/contributors?${params.toString()}`);
      return response.data;
    },
  });


export const useUpdateProjectContributorRole = () => {
  const queryClient = useQueryClient();
  return useMutation<TProjectContributor, Error, TContributorDto>({
    mutationFn: async (dto: TContributorDto) => {
      const {projectId, ...rest} = dto;
      const response = await PatchRequest(`/projects/${projectId}/contributors`, rest);
      return response.data;
    },
    onSuccess: ({projectId, role}) => {
      toast.success(`Contributor updated to ${role}`);
      queryClient.invalidateQueries({queryKey: ["members", projectId]});
    },
  });
};


export const useDeleteContributor = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, TDeleteProjectDto>({
    mutationFn: async ({projectId, userId}: TDeleteProjectDto) => DeleteRequest(`/projects/${projectId}/contributors/${userId}`),
    onSuccess: (_, {projectId}) => {
      toast.success("Contributor removed");
      queryClient.invalidateQueries({queryKey: ["members", projectId]});
    },
  });
};

