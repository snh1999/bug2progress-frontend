import type { TTicket } from "@/api/tickets/tickets.types";
import { TicketViewDueHeader } from "@/components/Tickets/TicketsView/DataTable/date/TicketViewDueHeader";
import {
  TicketPriority,
  TicketType,
} from "@/components/Tickets/TicketsView/DataTable/enums/TicketViewEnums";
import { TicketRowContextMenu } from "@/components/Tickets/TicketsView/TicketRowContextMenu";

interface KanbanCardProps {
  ticket: TTicket;
  compact?: boolean;
}

export const KanbanCard = ({ ticket, compact }: KanbanCardProps) => {
  return (
    <div className="group bg-card p-3 mb-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-border/50 cursor-pointer">
      <div className="items-center flex-wrap gap-1.5 mb-2 hidden group-hover:flex transition-all duration-200 ease-out">
        <TicketPriority priority={ticket.ticketPriority} />
        <TicketType type={ticket.ticketType} />
      </div>

      <p
        className={`text-xs font-medium text-foreground leading-snug line-clamp-3  ${compact ? "mb-0 pb-0" : "mb-2"}`}
      >
        {ticket.title}
      </p>

      {!compact && (
        <div className={`flex ${compact ? "justify-end" : "justify-between"}`}>
          <div className="flex items-center justify-end border-border/40">
            <TicketViewDueHeader date={ticket.dueAt} compact />
          </div>
          <TicketRowContextMenu id={ticket.id} />
        </div>
      )}
    </div>
  );
};
