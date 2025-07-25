import { useGetCurrentUser } from "@/api/users/users";
import { useGetProject } from "@/api/projects/projects";
import { useGetProjectContributors } from "@/api/projects/projectContributors";

export enum EContributorAction {
  INVITE = "INVITE",
  REMOVE = "REMOVE",
  EDIT_ROLE = "EDIT_ROLE",
  VIEW_SETTINGS = "VIEW_SETTINGS"
}

export const EContributorPermission : Record<string, EContributorAction[]> = {
  OWNER: [
    EContributorAction.INVITE,
    EContributorAction.REMOVE,
    EContributorAction.EDIT_ROLE,
    EContributorAction.VIEW_SETTINGS
  ]
}

export const useCheckPermission = (action: EContributorAction, projectId: string) => {
  const {data: user} = useGetCurrentUser();
  const {data: project} = useGetProject(projectId);
  const {data: contributor} = useGetProjectContributors({id: projectId, userId: user?.id});

  if(!user || !project) return false;
  else if(project.ownerId === user.id)
    return EContributorPermission.OWNER.includes(action);


  if(!contributor) return false;
  else
    return EContributorPermission[contributor[0]?.role]?.includes(action);
}