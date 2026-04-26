import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import type { TTicketComment } from "@/api/tickets/tickets.types";
import { COMMENT_EVENTS } from "@/app.constants";
import { useSocket } from "./provider/websocket-provider";
import type {
  TCommentCreationPayload,
  TCommentDeletionPayload,
  TCommentUpdatePayload,
} from "./websocket.types";

export function useRealtimeComments(ticketId: string) {
  const { socket, connected } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket || !connected) return;

    const handleCommentCreated = (payload: TCommentCreationPayload) => {
      if (payload.ticketId !== ticketId) return;
      queryClient.setQueriesData<TTicketComment[]>(
        { queryKey: ["ticketComments", ticketId], exact: false },
        (oldComments = []) => [...oldComments, payload.comment],
      );
    };

    const handleCommentUpdated = (payload: TCommentUpdatePayload) => {
      if (payload.ticketId !== ticketId) return;
      queryClient.setQueriesData<TTicketComment[]>(
        { queryKey: ["ticketComments", ticketId], exact: false },
        (oldComments = []) =>
          oldComments.map((c) =>
            c.id === payload.comment.id ? payload.comment : c,
          ),
      );
    };

    const handleCommentDeleted = (payload: TCommentDeletionPayload) => {
      if (payload.ticketId !== ticketId) return;
      queryClient.setQueriesData<TTicketComment[]>(
        { queryKey: ["ticketComments", ticketId], exact: false },
        (oldComments = []) =>
          oldComments.filter((c) => c.id !== payload.commentId),
      );
    };

    socket.on(COMMENT_EVENTS.CREATED, handleCommentCreated);
    socket.on(COMMENT_EVENTS.UPDATED, handleCommentUpdated);
    socket.on(COMMENT_EVENTS.DELETED, handleCommentDeleted);

    return () => {
      socket.off(COMMENT_EVENTS.CREATED, handleCommentCreated);
      socket.off(COMMENT_EVENTS.UPDATED, handleCommentUpdated);
      socket.off(COMMENT_EVENTS.DELETED, handleCommentDeleted);
    };
  }, [socket, connected, queryClient, ticketId]);
}