import { Separator } from "@/components/ui/separator";
import { TTicket } from "@/api/tickets/tickets.types";
import { TicketRowContextMenu } from "@/components/Tickets/TicketsView/TicketRowContextMenu";
import { TicketViewDueHeader } from "@/components/Tickets/TicketsView/DataTable/date/TicketViewDueHeader";
import { TicketViewContributorHover } from "@/components/Tickets/TicketsView/DataTable/contributors/TicketViewContributorHover";
import { TicketViewFeatureHover } from "@/components/Tickets/TicketsView/DataTable/feature/TicketViewFeature";
import {
  TicketPriority,
  TicketType,
} from "@/components/Tickets/TicketsView/DataTable/enums/TicketViewEnums";

interface KanbanCardProps {
  ticket: TTicket;
}

export const KanbanCard = ({ ticket }: KanbanCardProps) => {
  return (
    <div className="bg-white dark:bg-black p-2.5 mb-1.5 rounded shadow-sm space-y-2">
      <div className="flex items-center justify-between ml-2 gap-x-2">
        <p className="line-clamp-2">{ticket.title}</p>
        <TicketRowContextMenu id={ticket.id} />
      </div>

      <div className="flex gap-2">
        <TicketPriority priority={ticket.ticketPriority} />
        <TicketType type={ticket.ticketType} />
      </div>

      <Separator />
      <div className="flex items-center gap-x-1 text-xs">
        <TicketViewContributorHover contributor={ticket.assignedContributor} />{" "}
        |
        <TicketViewDueHeader date={ticket.dueAt} compact />
      </div>

      <div className="bg-background flex text-xs">
        <TicketViewFeatureHover feature={ticket.feature} />
      </div>
    </div>
  );
};
