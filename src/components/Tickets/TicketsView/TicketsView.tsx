"use client";

import { useQueryState } from "nuqs";
import { useGetTickets, useRearrangeTickets } from "@/api/tickets/tickets";
import type { UpdateTicketPositionData } from "@/api/tickets/tickets.types";
import { DataTable } from "@/components/common/DataTable";
import LoadingComponent from "@/components/common/LoadingComponent";
import CreateTicketButton from "@/components/Tickets/CreateTicketButton";
import { CalendarView } from "@/components/Tickets/TicketsView/CalendarView/CalendarView";
import { TicketFilters } from "@/components/Tickets/TicketsView/DataTable/filters/TicketFilters";
import { ticketColumns } from "@/components/Tickets/TicketsView/DataTable/ticketColumns";
import { KanbanView } from "@/components/Tickets/TicketsView/kanbanView/KanbanView";
import { ETicketView } from "@/components/Tickets/TicketsView/TicketsView.types";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFeatureId } from "@/hooks/useFeatureId";
import { useProjectId } from "@/hooks/useProjectId";
import { useTicketFilters } from "@/hooks/useTicketFilters";

interface TicketsViewProps {
  hideFeatureFilter?: boolean;
}

export const TicketsView = ({ hideFeatureFilter }: TicketsViewProps) => {
  const [
    {
      dueAt,
      ticketType,
      ticketStatus,
      ticketPriority,
      assignedContributorId,
      verifierId,
      featureId: searchFeatureId,
      creatorId,
    },
  ] = useTicketFilters();

  const [view, setView] = useQueryState(ETicketView.KANBAN, {
    defaultValue: ETicketView.KANBAN,
  });

  const projectId = useProjectId();
  const fId = useFeatureId();
  const featureId = searchFeatureId || fId;

  const { data: tickets, isLoading: isLoadingTickets } = useGetTickets({
    featureId,
    projectId,
    dueAt,
    ticketType,
    ticketStatus,
    ticketPriority,
    assignedContributorId,
    verifierId,
    creatorId,
  });

  const { mutate: rearrangeTickets } = useRearrangeTickets();

  const handleRearrange = (data: UpdateTicketPositionData[]) => {
    rearrangeTickets({ data, projectId });
  };

  return (
    <>
      <Tabs
        defaultValue={view}
        onValueChange={setView}
        className="flex-1 w-full border rounded-lg"
      >
        <div className="h-full flex flex-col overflow-auto p-4">
          <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
            <TabsList className="w-full lg:w-auto">
              <TabsTrigger
                className="h-8 w-full lg:w-auto"
                value={ETicketView.TABLE}
              >
                Table
              </TabsTrigger>
              <TabsTrigger
                className="h-8 w-full lg:w-auto"
                value={ETicketView.KANBAN}
              >
                Kanban
              </TabsTrigger>
              <TabsTrigger
                className="h-8 w-full lg:w-auto"
                value={ETicketView.CALENDAR}
              >
                Calendar
              </TabsTrigger>
            </TabsList>
            <CreateTicketButton />
          </div>
          <Separator className="my-2" />
          <TicketFilters hideFeatureFilter={hideFeatureFilter} />
          <Separator className="my-2" />
          {isLoadingTickets ? (
            <LoadingComponent />
          ) : (
            <>
              <TabsContent value={ETicketView.TABLE} className="mt-0">
                <DataTable columns={ticketColumns} data={tickets ?? []} />
              </TabsContent>
              <TabsContent value={ETicketView.KANBAN} className="mt-0">
                <KanbanView data={tickets ?? []} onChange={handleRearrange} />
              </TabsContent>
              <TabsContent
                value={ETicketView.CALENDAR}
                className="mt-0 h-full pb-4"
              >
                <CalendarView data={tickets ?? []} />
              </TabsContent>
            </>
          )}
        </div>
      </Tabs>
    </>
  );
};
