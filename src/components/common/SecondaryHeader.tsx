import { useGetFeature } from "@/api/features/features";
import { useGetProject } from "@/api/projects/projects";
import { useGetTicket } from "@/api/tickets/tickets";
import { HeaderBreadcrumbs } from "@/components/common/HeaderBreadcrumbs";
import { useFeatureId } from "@/hooks/useFeatureId";
import { useProjectId } from "@/hooks/useProjectId";
import { useTicketId } from "@/hooks/useTicketId";

export const SecondaryHeader = () => {
  const projectId = useProjectId();
  const featureId = useFeatureId();
  const ticketId = useTicketId();

  const { data: project } = useGetProject(projectId);
  const { data: feature } = useGetFeature(projectId, featureId);
  const { data: ticket } = useGetTicket({ id: ticketId, projectId });

  if (!project) {
    return null;
  }

  return (
    <HeaderBreadcrumbs
      project={project}
      ticket={ticket}
      feature={featureId ? feature : ticket?.feature}
    />
  );
};

export const useAlternativeHeader = () => {
  return useProjectId();
};
