import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DeleteRequest, GetRequest, PatchRequest, PostRequest } from "@/api/axios";
import { TFeature } from "@/api/features/features.types";
import { toast } from "sonner";
import {
  TCreateTicketDto,
  TGetTicket,
  TGetTickets,
  TTicket,
  TUpdateTicketDto,
  TUpdateTicketRearrangeDto
} from "@/api/tickets/tickets.types";

export const useCreateTicket = () => {
  const queryClient = useQueryClient();
  return useMutation<TTicket, Error, TCreateTicketDto>({
    mutationFn: async (dto: TCreateTicketDto) => {
      const {projectId, ...data} = dto;
      const response = await PostRequest(`/projects/${projectId}/tickets`, data);
      return response.data;
    },
    onSuccess: (_, {projectId}) => queryClient.invalidateQueries({queryKey: ["tickets", projectId]}),
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
    queryKey: ["tickets", projectId, featureId, ticketPriority, ticketStatus, ticketType, dueAt, assignedContributorId, verifierId],
    queryFn: async () => (await GetRequest(`/projects/${projectId}/tickets?${params.toString()}`)).data,
  });
};

export const useGetTicket = ({id, projectId}: TGetTicket) =>
  useQuery<TFeature, Error>({
    queryKey: ["ticket", projectId, id],
    queryFn: async () => (await GetRequest(`/projects/${projectId}/tickets/${id}`)).data,
  });

export const useUpdateTicket = () => {
  const queryClient = useQueryClient();
  return useMutation<TTicket, Error, TUpdateTicketDto>({
    mutationFn: async (dto: TUpdateTicketDto) => {
      const {id, projectId, ...rest} = dto;
      const response = await PatchRequest(`/projects/${projectId}/tickets/${id}`, rest);
      return response.data;
    },
    onSuccess: (_, {id, projectId}) => {
      toast.success("Ticket updated");
      queryClient.invalidateQueries({queryKey: ["ticket", projectId, id]});
      queryClient.invalidateQueries({queryKey: ["tickets", projectId]});
    },
  });
};

export const useRearrangeTickets = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, TUpdateTicketRearrangeDto>({
    mutationFn: async (data: TUpdateTicketRearrangeDto) => {
      const {projectId, ...dto} = data;
      await PatchRequest(`/projects/${projectId}/tickets`, dto);
    },
    onSuccess: (_, {projectId}) => {
      queryClient.invalidateQueries({queryKey: ["tickets", projectId]});
    },
    onError: () => {
      toast.error("Error reordering tickets, please refresh the page and try again");
    },
  });
}


export const useDeleteTicket = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, TGetTicket>({
    mutationFn: async (data: TGetTicket) => {
      const {projectId, id} = data;
      await DeleteRequest(`/projects/${projectId}/tickets/${id}`);
    },
    onSuccess: (_, {id, projectId}) => {
      toast.success("Ticket deleted");
      queryClient.invalidateQueries({queryKey: ["ticket", projectId, id]});
      queryClient.invalidateQueries({queryKey: ["tickets", projectId]});
    },
  });
};