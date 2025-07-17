
export type TPost = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  postContent: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  organizationId?: string | null;
  refProjectId: string | null;
  refFeaturesId: string | null;
  isPublic: boolean;
}