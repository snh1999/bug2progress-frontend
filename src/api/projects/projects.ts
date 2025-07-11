import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetRequest, PostRequest } from "@/api/axios";
import { TCreateProjectDto, TProject } from "@/api/projects/projects.types";

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation<TProject, Error, TCreateProjectDto>({
    mutationFn: async (dto: TCreateProjectDto) => {
      const response = await PostRequest("/projects", dto);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["projects"]}),
  });
};

export const useGetProjects = () =>
  useQuery<TProject[], Error>({
    queryKey: ["projects"],
    queryFn: async () => GetRequest("/projects"),
  });

export const useGetProject = () =>
  useQuery({
    queryKey: ["project"],
    queryFn: async () => GetRequest("/users/me"),
  });