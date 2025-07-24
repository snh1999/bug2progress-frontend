import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DeleteRequest, GetRequest, PatchRequest, PostRequest } from "@/api/axios";
import { TCreateFeatureDto, TDeleteFeatureDto, TFeature, TUpdateFeatureDto } from "@/api/features/features.types";
import { toast } from "sonner";

export const useCreateFeature = () => {
  const queryClient = useQueryClient();
  return useMutation<TFeature, Error, TCreateFeatureDto>({
    mutationFn: async (dto: TCreateFeatureDto) => {
      const { projectId, ...data } = dto;
      const response = await PostRequest(`/projects/${projectId}/features`, data);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["features"] }),
  });
};

export const useGetFeatures = (projectId: string) =>
  useQuery<TFeature[], Error>({
    queryKey: ["features"],
    queryFn: async () => (await GetRequest(`/projects/${projectId}/features`)).data,
  });

export const useGetFeature = (projectId: string, featureId: string) =>
  useQuery<TFeature, Error>({
    queryKey: ["feature", featureId],
    queryFn: async () => (await GetRequest(`/projects/${projectId}/features/${featureId}`)).data,
  });

export const useUpdateFeature = () => {
  const queryClient = useQueryClient();
  return useMutation<TFeature, Error, TUpdateFeatureDto>({
    mutationFn: async (dto: TUpdateFeatureDto) => {
      const { id, projectId, ...rest } = dto;
      const response = await PatchRequest(`/projects/${projectId}/features/${id}`, rest);
      return response.data;
    },
    onSuccess: ({ id }) => {
      toast.success("Feature updated");
      queryClient.invalidateQueries({ queryKey: ["feature", id] });
      queryClient.invalidateQueries({ queryKey: ["features"] });
    },
  });
};

export const useDeleteFeature = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, TDeleteFeatureDto>({
    mutationFn: async (id: TDeleteFeatureDto) => {
      const { projectId, id: featureId } = id;
      await DeleteRequest(`/projects/${projectId}/features/${featureId}`);
    },
    onSuccess: (_, {id}) => {
      toast.success("Feature deleted");
      queryClient.invalidateQueries({ queryKey: ["feature", id] });
      queryClient.invalidateQueries({ queryKey: ["features"] });
    },
  });
};