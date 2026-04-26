import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DeleteRequest,
  GetRequest,
  PatchRequest,
  PostRequest,
} from "@/api/axios";
import { toast } from "sonner";
import {
  TUpdateTicketCommentDto,
  TTicketComment,
  TCreateTicketCommentDto
} from "@/api/tickets/tickets.types";

export const useGetTicketComments = (ticketId: string) =>
  useQuery<TTicketComment[], Error>({
    queryKey: ["ticketComments", ticketId],
    queryFn: async () =>
      (await GetRequest(`/ticket/comment/${ticketId}`)).data,
    enabled: !!ticketId,
  });

export const useCreateTicketComment = () => {
  const queryClient = useQueryClient();
  return useMutation<TTicketComment, Error, TCreateTicketCommentDto>({
    mutationFn: async ({ ticketId, text }) => {
      const response = await PostRequest(`/ticket/comment/${ticketId}`, { text });
      return response.data;
    },
    onSuccess: (_, { ticketId }) =>
      queryClient.invalidateQueries({ queryKey: ["ticketComments", ticketId] }),
  });
};

export const useUpdateTicketComment = () => {
  const queryClient = useQueryClient();
  return useMutation<TTicketComment, Error, TUpdateTicketCommentDto>({
    mutationFn: async ({ commentId, text }) => {
      const response = await PatchRequest(`/ticket/comment/${commentId}`, { text });
      return response.data;
    },
    onSuccess: (_, { ticketId }) =>
      queryClient.invalidateQueries({ queryKey: ["ticketComments", ticketId] }),
  });
};

export const useDeleteTicketComment = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, { commentId: string; ticketId: string }>({
    mutationFn: async ({ commentId, ticketId }) =>
      await DeleteRequest(`/ticket/comment/${ticketId}/${commentId}`),
    onSuccess: (_, { ticketId }) => {
      toast.success("Comment deleted");
      queryClient.invalidateQueries({ queryKey: ["ticketComments", ticketId] });
    },
  });
};
