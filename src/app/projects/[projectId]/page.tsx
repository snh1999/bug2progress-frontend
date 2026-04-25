"use client";

import { useGetProject } from "@/api/projects/projects";
import { useProjectId } from "@/hooks/useProjectId";
import LoadingComponent from "@/components/common/LoadingComponent";
import { toast } from "sonner";
import { ProjectHome } from "@/components/project/home/ProjectHome";

export default function ProjectHomePage() {
  const projectId = useProjectId();

  const {data: project, isLoading, error} = useGetProject(projectId);

  if (isLoading) {
    return <LoadingComponent/>;
  }

  if (error) {
    toast.error(error.message);
    return null;
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Project not found</p>
      </div>
    );
  }

  return (
    <ProjectHome project={project}/>
  );
}
