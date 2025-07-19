import { TPost } from "../posts/posts.types";

export enum ProjectStatus {
  PROPOSED = "PROPOSED",
  IN_DEVELOPMENT = "IN_DEVELOPMENT",
  ACTIVE = "ACTIVE",
  MAINTAINED = "MAINTAINED",
  NOT_MAINTAINED = "NOT_MAINTAINED",
  OBSOLETE = "OBSOLETE",
}

export type TCreateProjectDto = {
  urlid?: string;
  title: string;
  summary: string;
  organizationId?: string;
  isPublic?: boolean;
  status?: ProjectStatus;
  slug?: string;
};

export type TUpdateProjectDto = Partial<TCreateProjectDto> & {
  id: string;
  ownerId?: string;
  inviteCode?: string;
  updateInviteCode?: boolean;
};

export type TProject = {
  id: string;
  urlid?: string;
  title: string;
  summary: string;
  createdAt: string;
  updatedAt: string;
  organizationId?: string;
  status: ProjectStatus;
  isPublic: boolean;
  basePostId: string;
  ownerId: string;
  inviteCode: string;
};

export type TProjectWithPost = TProject & { basePost: TPost };

enum EProjectRole {
  MANAGER = "MANAGER",
  LEAD = "LEAD",
  DEVELOPER = "DEVELOPER",
}

export type TProjectContributor = {
  projectId: string;
  userId: string;
  role: EProjectRole;
};
