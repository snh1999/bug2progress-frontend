import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { TTicket } from "@/api/tickets/tickets.types";
import { TICKET_EVENTS } from "@/app.constants";
import {
  TTicketCreationPayload,
  TTicketDeletionPayload,
  TTicketRearrangementPayload,
  TTicketUpdatePayload,
} from "./websocket.types";
import { useSocket } from "./provider/websocket-provider";

export function useRealtimeTickets() {
  const { socket, connected } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket || !connected) return;

    const handleTicketCreated = ({
      projectId,
      ticket,
    }: TTicketCreationPayload) => {
      queryClient.setQueriesData<TTicket[]>(
        { queryKey: ["tickets", projectId], exact: false },
        (oldTickets = []) => [...oldTickets, ticket],
      );
    };

    const handleTicketUpdated = ({
      projectId,
      ticket,
    }: TTicketUpdatePayload) => {
      queryClient.cancelQueries({
        queryKey: ["ticket", projectId, ticket.id],
        exact: false,
      });

      queryClient.setQueriesData<TTicket[]>(
        { queryKey: ["tickets", projectId], exact: false },
        (oldTickets = []) =>
          oldTickets.map((t) =>
            t.id === ticket.id
              ? { ...ticket, feature: t.feature, creator: t.creator }
              : t,
          ),
      );

      queryClient.setQueriesData<TTicket>(
        { queryKey: ["ticket", projectId], exact: false },
        ticket,
      );
    };

    const handleTicketRearranged = ({
      projectId,
    }: TTicketRearrangementPayload) => {
      queryClient.invalidateQueries({
        queryKey: ["tickets", projectId],
        exact: false,
      });
    };

    const handleTicketDeleted = ({
      projectId,
      ticketId,
    }: TTicketDeletionPayload) => {
      queryClient.setQueriesData<TTicket[]>(
        { queryKey: ["tickets", projectId], exact: false },
        (oldTickets = []) => oldTickets.filter((t) => t.id !== ticketId),
      );
    };

    socket.on(TICKET_EVENTS.CREATED, handleTicketCreated);
    socket.on(TICKET_EVENTS.UPDATED, handleTicketUpdated);
    socket.on(TICKET_EVENTS.DELETED, handleTicketDeleted);
    socket.on(TICKET_EVENTS.REARRANGED, handleTicketRearranged);

    return () => {
      socket.off(TICKET_EVENTS.CREATED, handleTicketCreated);
      socket.off(TICKET_EVENTS.UPDATED, handleTicketUpdated);
      socket.off(TICKET_EVENTS.DELETED, handleTicketDeleted);
      socket.off(TICKET_EVENTS.REARRANGED, handleTicketRearranged);
    };
  }, [socket, connected, queryClient]);
}
