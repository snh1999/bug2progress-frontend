import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DeleteRequest, GetRequest, PatchRequest, PostRequest } from "@/api/axios";
import { TFeature } from "@/api/features/features.types";
import { toast } from "sonner";
import { TCreateTicketDto, TGetTicket, TGetTickets, TTicket, TUpdateTicketDto } from "@/api/tickets/tickets.types";

export const useCreateTicket = () => {
  const queryClient = useQueryClient();
  return useMutation<TTicket, Error, TCreateTicketDto>({
    mutationFn: async (dto: TCreateTicketDto) => {
      const {projectId, featureId, ...data} = dto;
      const response = await PostRequest(`/projects/${projectId}/features/${featureId}/tickets`, data);
      return response.data;
    },
    onSuccess: (_, {featureId}) => queryClient.invalidateQueries({queryKey: ["tickets", featureId]}),
  });
};

export const useGetTickets = ({featureId, projectId}: TGetTickets) =>
  useQuery<TFeature[], Error>({
    queryKey: ["tickets", featureId],
    queryFn: async () => (await GetRequest(`/projects/${projectId}/features/${featureId}/tickets`)).data,
  });

export const useGetTicket = ({id, featureId, projectId}: TGetTicket) =>
  useQuery<TFeature, Error>({
    queryKey: ["feature", featureId, id],
    queryFn: async () => (await GetRequest(`/projects/${projectId}/features/${featureId}/tickets/${id}`)).data,
  });

export const useUpdateTicket = () => {
  const queryClient = useQueryClient();
  return useMutation<TTicket, Error, TUpdateTicketDto>({
    mutationFn: async (dto: TUpdateTicketDto) => {
      const {id, featureId, projectId, ...rest} = dto;
      const response = await PatchRequest(`/projects/${projectId}/features/${featureId}/tickets/${id}`, rest);
      return response.data;
    },
    onSuccess: (_, {id, featureId,}) => {
      toast.success("Feature updated");
      queryClient.invalidateQueries({queryKey: ["feature", featureId, id]});
      queryClient.invalidateQueries({queryKey: ["features", featureId]});
    },
  });
};

export const useDeleteFeature = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, TGetTicket>({
    mutationFn: async (data: TGetTicket) => {
      const {projectId, id, featureId} = data;
      await DeleteRequest(`/projects/${projectId}/features/${featureId}/tickets/${id}`);
    },
    onSuccess: (_, {id, featureId}) => {
      toast.success("Feature deleted");
      queryClient.invalidateQueries({queryKey: ["feature", featureId, id]});
      queryClient.invalidateQueries({queryKey: ["features", featureId]});
    },
  });
};