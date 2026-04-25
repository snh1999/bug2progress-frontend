import { TicketStatus } from "@/components/Tickets/TicketsView/DataTable/enums/TicketViewEnums";
import { TTicket } from "@/api/tickets/tickets.types";
import { useProjectId } from "@/hooks/useProjectId";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Ticket } from "lucide-react";
import CreateTicketButton from "@/components/Tickets/CreateTicketButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { convertSnakeCaseToTitleCase } from "@/lib/utils";

interface TicketListProps {
  data: TTicket[];
}

export const TicketList = ({data}: TicketListProps) => {
  const projectId = useProjectId();
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <Ticket className="w-5 h-5"/>
          Recent Tickets
        </CardTitle>
        <div className="flex gap-1 items-center">
          <CreateTicketButton/>
          <Link href={`/projects/${projectId}/tickets`}>
            <Button variant="ghost" size="sm" className="gap-1">
              View all
              <ExternalLink className="w-3 h-3"/>
            </Button>
          </Link>
        </div>

      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-muted-foreground text-sm">No tickets yet.</p>
        ) : (
          <div className="space-y-0.5">
            {data.map((ticket: any) => (
              <div
                key={ticket.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <TicketStatus status={ticket.ticketStatus}/>
                  <span className="text-sm font-medium">{ticket.title}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {convertSnakeCaseToTitleCase(ticket.ticketType)}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
