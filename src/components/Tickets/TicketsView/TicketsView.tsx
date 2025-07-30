"use client";

import { useQueryState } from "nuqs";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateTicketButton from "@/components/Tickets/CreateTicketButton";
import { useProjectId } from "@/hooks/useProjectId";
import { useFeatureId } from "@/hooks/useFeatureId";
import { ETicketView } from "@/components/Tickets/TicketsView/TicketsView.types";
import { useGetTickets } from "@/api/tickets/tickets";
import LoadingComponent from "@/components/common/LoadingComponent";
import { Separator } from "@/components/ui/separator";
import { TicketFilters } from "@/components/Tickets/TicketsView/DataTableColumns/filters/TicketFilters";
import { useTicketFilters } from "@/hooks/useTicketFilters";
import { ticketColumns } from "@/components/Tickets/TicketsView/DataTableColumns/ticketColumns";
import { DataTable } from "@/components/common/DataTable";


interface TicketsViewProps {
  hideFeatureFilter?: boolean;
}

export const TicketsView = ({hideFeatureFilter}: TicketsViewProps) => {
  const [{
    dueAt,
    ticketType,
    ticketStatus,
    ticketPriority,
    assignedContributorId,
    verifierId,
    featureId: searchFeatureId,
    creatorId
  }] = useTicketFilters();

  const [view, setView] = useQueryState("task-view", {
    defaultValue: ETicketView.TABLE,
  });

  const projectId = useProjectId();
  const featureId = useFeatureId();

  const {data: tickets, isLoading: isLoadingTickets} = useGetTickets({
    featureId,
    projectId,
    dueAt,
    ticketType,
    ticketStatus,
    ticketPriority,
    assignedContributorId,
    verifierId,
    // searchFeatureId,
    creatorId
  });


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
            <CreateTicketButton/>
          </div>
          <Separator className="my-2"/>
          <TicketFilters hideFeatureFilter={hideFeatureFilter}/>
          <Separator className="my-2"/>
          {isLoadingTickets ? (
            <LoadingComponent/>
          ) : (
            <>
              <TabsContent value={ETicketView.TABLE} className="mt-0">
                <DataTable columns={ticketColumns} data={tickets ?? []} />
              </TabsContent>
              <TabsContent value={ETicketView.KANBAN} className="mt-0">
                {/*<DataKanban onChange={onKanbanChange} data={tasks?.documents ?? []} />*/}
              </TabsContent>
              <TabsContent value={ETicketView.CALENDAR} className="mt-0 h-full pb-4">
                {/*<DataCalendar data={tasks?.documents ?? []} />*/}
              </TabsContent>
            </>
          )}
        </div>
      </Tabs>
    </>

  );
};


