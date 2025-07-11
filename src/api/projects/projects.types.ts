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
};
