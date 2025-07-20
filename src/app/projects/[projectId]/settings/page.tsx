"use client";
import { useDeleteProject, useGetProject } from "@/api/projects/projects";
import LoadingComponent from "@/components/common/LoadingComponent";
import { UpdateProjectForm } from "@/components/project/UpdateProjectForm/UpdateProjectForm";
import { useProjectId } from "@/hooks/useProjectId";
import { useConfirm } from "@/hooks/useConfirm";

const ProjectSettingsPage = () => {
  const projectId = useProjectId();
  const { data: project, isPending } = useGetProject(projectId);
  const { mutate: deleteProject, isPending: isDeletePending } = useDeleteProject();

  const [DeleteDialog, confirmDelete] = useConfirm({
    title: "Delete project",
    message: "Are you sure you want to delete this project?",
    variant: "destructive",
  })

  const handleDelete = async() => {
    const result = await confirmDelete();
    if (result) {
      deleteProject(`${projectId}`);
    }
  };

  if (isPending || !project || isDeletePending) {
    return <LoadingComponent />;
  }

  return (
    <div>
      <DeleteDialog />
      <UpdateProjectForm initialValues={project} onDelete={handleDelete} />
    </div>
  );
};

export default ProjectSettingsPage;
