import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DeleteRequest,
  GetRequest,
  PatchRequest,
  PostRequest,
} from "@/api/axios";
import {
  TCreateProjectDto,
  TProject,
  TProjectWithPost,
  TUpdateProjectDto,
} from "@/api/projects/projects.types";

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation<TProject, Error, TCreateProjectDto>({
    mutationFn: async (dto: TCreateProjectDto) => {
      if (!dto.urlid) delete dto.urlid;
      const response = await PostRequest("/projects", dto);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });
};

export const useGetProjects = () =>
  useQuery<TProject[], Error>({
    queryKey: ["projects"],
    queryFn: async () => (await GetRequest("/projects")).data,
  });

export const useGetProject = (id: string) =>
  useQuery<TProjectWithPost, Error>({
    queryKey: ["project", id],
    queryFn: async () => (await GetRequest(`/projects/${id}`)).data,
  });

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation<TProject, Error, TUpdateProjectDto>({
    mutationFn: async (dto: TUpdateProjectDto) => {
      if (!dto.urlid) delete dto.urlid;
      const { id, ...rest } = dto;
      const response = await PatchRequest(`/projects/${id}`, rest);
      return response.data;
    },
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({ queryKey: ["project", id] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
