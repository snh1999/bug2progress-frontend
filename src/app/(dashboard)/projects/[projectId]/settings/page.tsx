"use client";
import { useGetProject } from "@/api/projects/projects";
import LoadingComponent from "@/components/common/LoadingComponent";
import { UpdateProjectForm } from "@/components/dashboard/project/UpdateProjectForm/UpdateProjectForm";
import { useProjectId } from "@/hooks/useProjectId";

const ProjectSettingsPage = () => {
  const projectId = useProjectId();
  const { data: project, isPending } = useGetProject(projectId);

  if (isPending || !project) {
    return <LoadingComponent />;
  }

  return (
    <div>
      <UpdateProjectForm initialValues={project} />
    </div>
  );
};

export default ProjectSettingsPage;
