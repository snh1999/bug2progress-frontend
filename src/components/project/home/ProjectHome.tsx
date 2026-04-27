"use client";

import { toast } from "sonner";
import type { TProjectWithPost } from "@/api/projects/projects.types";
import { useGetTickets } from "@/api/tickets/tickets";
import LoadingComponent from "@/components/common/LoadingComponent";
import { useProjectId } from "@/hooks/useProjectId";
import { useRealtimeNotifications } from "@/realtime/useRealTimeNotifications";
import { TicketList } from "@/components/project/home/TicketList";
import StatsSection from "@/components/project/home/StatsSection";
import AboutSection from "@/components/common/AboutSection";
import ProjectMeta from "@/components/project/home/ProjectMeta";
import ContributorsSummary from "@/components/project/home/ContributorsSummary";

export const ProjectHome = ({ project }: { project: TProjectWithPost }) => {
  const projectId = useProjectId();
  useRealtimeNotifications();

  const {
    data: tickets,
    isLoading,
    error: ticketsError,
  } = useGetTickets({ projectId });

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (ticketsError) {
    toast.error(ticketsError.message);
    return null;
  }

  const recentTickets = tickets?.slice(0, 5) || [];

  return (
    <div className="space-y-6 max-w-5xl">
      <StatsSection project={project} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AboutSection about={project.basePost?.postContent} />
          <TicketList data={recentTickets} />
        </div>

        <div className="space-y-6">
          <ProjectMeta project={project} />
          <ContributorsSummary />
        </div>
      </div>
    </div>
  );
};
