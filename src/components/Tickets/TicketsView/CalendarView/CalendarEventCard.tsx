import React from "react";
import { useRouter } from "next/navigation";
import { useProjectId } from "@/hooks/useProjectId";
import { ETicketPriority, ETicketStatus, ETicketType, TTicket, } from "@/api/tickets/tickets.types";
import {
  getTicketPriorityStyle,
  getTicketStatusStyle,
  getTicketTypeStyle,
} from "@/components/Tickets/TicketsView/DataTable/enums/TicketViewEnums";
import { TicketViewFeatureHover } from "@/components/Tickets/TicketsView/DataTable/feature/TicketViewFeature";
import {
  TicketViewContributorHover
} from "@/components/Tickets/TicketsView/DataTable/contributors/TicketViewContributorHover";
import { cn, convertSnakeCaseToTitleCase } from "@/lib/utils";

interface EventCardProps {
  ticket: TTicket;
}

const statusColorMap: Record<ETicketStatus, string> = Object.values(
  ETicketStatus
).reduce((acc, status) => {
  acc[status] = getTicketStatusStyle(status);
  return acc;
}, {} as Record<ETicketStatus, string>);

const typeColorMap: Record<ETicketType, string> = Object.values(
  ETicketType
).reduce((acc, type) => {
  acc[type] = getTicketTypeStyle(type);
  return acc;
}, {} as Record<ETicketType, string>);

const priorityColorMap: Record<ETicketPriority, string> = Object.values(
  ETicketPriority
).reduce((acc, status) => {
  acc[status] = getTicketPriorityStyle(status);
  return acc;
}, {} as Record<ETicketPriority, string>);

export const CalendarEventCard = ({ ticket }: EventCardProps) => {
  const {
    id,
    title,
    ticketType,
    ticketPriority,
    ticketStatus: status,
    feature,
    assignedContributor: contributor,
  } = ticket;

  const projectId = useProjectId();
  const router = useRouter();

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    router.push(`/workspaces/${projectId}/tickets/${id}`);
  };

  return (
    <div className="px-2">
      <div
        onClick={onClick}
        className="text-xs bg-white text-primary border rounded-md flex cursor-pointer"
      >
        <div
          title={convertSnakeCaseToTitleCase(status)}
          className={cn(
            "pl-1.5 py-full flex-shrink-0 rounded-l-md",
            statusColorMap[status]
          )}
        />

        <div className="p-1.5 flex flex-col gap-y-1  w-full min-w-0">
          <div
            className="pl-1 line-clamp-1 text-muted-foreground font-semibold"
            title={title}
          >
            {title}
          </div>
          <div className="flex items-center gap-x-1">
            {contributor && (
              <TicketViewContributorHover contributor={contributor} compact />
            )}

            <TicketViewFeatureHover feature={feature} compact rounded />
          </div>
        </div>

        <div className="flex flex-col items-center gap-x-1">
          {ticketPriority && (
            <div
              title={convertSnakeCaseToTitleCase(ticketPriority)}
              className={cn(
                "w-1.5 flex-1 flex-shrink-0 rounded-tr-md",
                !ticketType && "rounded-br-md",
                priorityColorMap[ticketPriority]
              )}
            />
          )}
          {ticketType && (
            <div
              title={convertSnakeCaseToTitleCase(ticketType)}
              className={cn(
                "w-1.5 flex-1 flex-shrink-0 rounded-br-md",
                !ticketType && "rounded-tr-md",
                typeColorMap[ticketType]
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
};
