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

export const useGetTickets = ({
  featureId,
  projectId,
  ticketPriority,
  ticketStatus,
  ticketType,
  dueAt,
  assignedContributorId,
  verifierId
}: TGetTickets) => {
  const params = new URLSearchParams();
  if (dueAt) params.append('dueAt', dueAt);
  if (verifierId) params.append('verifierId', verifierId);
  if (ticketType) params.append('ticketType', ticketType);
  if (ticketStatus) params.append('ticketStatus', ticketStatus);
  if (ticketPriority) params.append('ticketPriority', ticketPriority);
  if (assignedContributorId) params.append('assignedContributorId', assignedContributorId);

  return useQuery<TTicket[], Error>({
    queryKey: ["tickets", featureId, ticketPriority, ticketStatus, ticketType, dueAt, assignedContributorId, verifierId],
    queryFn: async () => (await GetRequest(`/projects/${projectId}/features/${featureId}/tickets?${params.toString()}`)).data,
  });
};

export const useGetTicket = ({id, featureId, projectId}: TGetTicket) =>
  useQuery<TFeature, Error>({
    queryKey: ["ticket", featureId, id],
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
      queryClient.invalidateQueries({queryKey: ["ticket", featureId, id]});
      queryClient.invalidateQueries({queryKey: ["tickets", featureId]});
    },
  });
};

export const useDeleteTicket = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, TGetTicket>({
    mutationFn: async (data: TGetTicket) => {
      const {projectId, id, featureId} = data;
      await DeleteRequest(`/projects/${projectId}/features/${featureId}/tickets/${id}`);
    },
    onSuccess: (_, {id, featureId}) => {
      toast.success("Feature deleted");
      queryClient.invalidateQueries({queryKey: ["ticket", featureId, id]});
      queryClient.invalidateQueries({queryKey: ["tickets", featureId]});
    },
  });
};