"use client";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { toast } from "sonner";
import { useGetProject } from "@/api/projects/projects";
import { useGetTicket } from "@/api/tickets/tickets";
import LoadingComponent from "@/components/common/LoadingComponent";
import { TicketBreadcrumbs } from "@/components/Tickets/TicketBreadcrumbs";
import { TicketOverview } from "@/components/Tickets/TicketView/TicketView";
import { useProjectId } from "@/hooks/useProjectId";
import { useTicketId } from "@/hooks/useTicketId";
import AboutSection from "@/components/common/AboutSection";

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
  return (
    <div className="flex flex-col">
      <TicketBreadcrumbs project={project} ticket={ticket} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TicketOverview ticket={ticket} />
        <div className="mt-4">
          <AboutSection about={ticket.description} />

        </div>
      </div>
    </div>
  );
};

export default TicketPage;
