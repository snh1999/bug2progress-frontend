import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DeleteRequest, GetRequest, PatchRequest, PostRequest } from "@/api/axios";
import { TCreateFeatureDto, TDeleteFeatureDto, TFeature, TUpdateFeatureDto } from "@/api/features/features.types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PROJECTS_PATH } from "@/app.constants";

export const useCreateFeature = () => {
  const queryClient = useQueryClient();
  return useMutation<TFeature, Error, TCreateFeatureDto>({
    mutationFn: async (dto: TCreateFeatureDto) => {
      const {projectId, ...data} = dto;
      const response = await PostRequest(`/projects/${projectId}/features`, data);
      return response.data;
    },
    onSuccess: (_, {projectId}) => queryClient.invalidateQueries({queryKey: ["features", projectId]}),
  });
};

export const useGetFeatures = (projectId: string) =>
  useQuery<TFeature[], Error>({
    queryKey: ["features", projectId],
    queryFn: async () => (await GetRequest(`/projects/${projectId}/features`)).data,
  });

export const useGetFeature = (projectId: string, featureId: string) =>
  useQuery<TFeature, Error>({
    queryKey: ["feature", projectId, featureId],
    queryFn: async () => (await GetRequest(`/projects/${projectId}/features/${featureId}`)).data,
  });

export const useUpdateFeature = () => {
  const queryClient = useQueryClient();
  return useMutation<TFeature, Error, TUpdateFeatureDto>({
    mutationFn: async (dto: TUpdateFeatureDto) => {
      const {id, projectId, ...rest} = dto;
      const response = await PatchRequest(`/projects/${projectId}/features/${id}`, rest);
      return response.data;
    },
    onSuccess: (_, {id, projectId}) => {
      toast.success("Feature updated");
      queryClient.invalidateQueries({queryKey: ["feature", projectId, id]});
      queryClient.invalidateQueries({queryKey: ["features", projectId]});
    },
  });
};

export const useDeleteFeature = () => {
  const queryClient = useQueryClient();
  const router = useRouter()

  return useMutation<unknown, Error, TDeleteFeatureDto>({
    mutationFn: async (id: TDeleteFeatureDto) => {
      const {projectId, id: featureId} = id;
      await DeleteRequest(`/projects/${projectId}/features/${featureId}`);
    },
    onSuccess: (_, {id, projectId}) => {
      toast.success("Feature deleted");
      queryClient.invalidateQueries({queryKey: ["feature", projectId, id]});
      queryClient.invalidateQueries({queryKey: ["features", projectId]});
      router.push(`${PROJECTS_PATH}/${projectId}`)
    },
  });
};