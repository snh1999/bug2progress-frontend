"use client";
import { TicketBreadcrumbs } from "@/components/Tickets/TicketBreadcrumbs";
import { useTicketId } from "@/hooks/useTicketId";
import { useProjectId } from "@/hooks/useProjectId";
import { useGetTicket } from "@/api/tickets/tickets";
import { toast } from "sonner";
import LoadingComponent from "@/components/common/LoadingComponent";
import { useGetProject } from "@/api/projects/projects";
import { TicketOverview } from "@/components/Tickets/TicketView/TicketView";
import { Separator } from "@radix-ui/react-dropdown-menu";

const TicketPage = () => {
  const ticketId = useTicketId();
  const projectId = useProjectId();
  const {
    data: ticket,
    isLoading,
    error,
  } = useGetTicket({ id: ticketId, projectId });
  const { data: project, error: projectError } = useGetProject(projectId);

  if (error || projectError) {
    toast.error(error?.message ?? projectError?.message);
    return null;
  }

  if (isLoading || !ticket || !project) {
    return <LoadingComponent />;
  }
  // TODO: add a view more wrap for tickets
  return (
    <div className="flex flex-col">
      <TicketBreadcrumbs project={project} ticket={ticket} />
      <Separator className="my-4" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TicketOverview ticket={ticket} />
        <div className="bg-white dark:bg-black rounded-lg p-4 mt-4">
          <p className="text-lg font-semibold">Description</p>
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            {ticket.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPage;
