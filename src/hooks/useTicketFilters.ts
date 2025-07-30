import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";
import { ETicketPriority, ETicketStatus, ETicketType } from "@/api/tickets/tickets.types";

export const useTicketFilters = () => {
  return useQueryStates({
    ticketType: parseAsStringEnum(Object.values(ETicketType)),
    ticketStatus: parseAsStringEnum(Object.values(ETicketStatus)),
    ticketPriority: parseAsStringEnum(Object.values(ETicketPriority)),
    verifierId: parseAsString,
    creatorId: parseAsString,
    assignedContributorId: parseAsString,
    dueAt: parseAsString,
    featureId: parseAsString
  });
};