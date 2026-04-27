import StatCard from "@/components/project/home/StatsCard";
import { Activity, Ticket, Users } from "lucide-react";
import { TProject } from "@/api/projects/projects.types";
import { useProjectId } from "@/hooks/useProjectId";

export default function StatsSection({ project }: { project: TProject }) {
  const projectId = useProjectId();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard
        title="Tickets"
        value={project._count?.ticket || 0}
        icon={Ticket}
        href={`/projects/${projectId}/tickets`}
      />
      <StatCard
        title="Contributors"
        value={project._count?.members || 0}
        icon={Users}
        href={`/projects/${projectId}/contributors`}
      />
      <StatCard
        title="Features"
        value={project._count?.features || 0}
        icon={Activity}
      />
    </div>
  );
}
