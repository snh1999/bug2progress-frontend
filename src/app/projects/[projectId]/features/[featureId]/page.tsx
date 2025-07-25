"use client";
import { useFeatureId } from "@/hooks/useFeatureId";
import { useProjectId } from "@/hooks/useProjectId";
import { useGetFeature } from "@/api/features/features";
import LoadingComponent from "@/components/common/LoadingComponent";
import { toast } from "sonner";

const FeaturePage = () => {
  const projectId = useProjectId();
  const featureId = useFeatureId();

  const { data: feature, isLoading, error } = useGetFeature(projectId, featureId);

  if(error) {
    toast.error(error.message);
  }

  if (!feature || isLoading) {
    return <LoadingComponent />
  }

  return <div>{feature.title}</div>;
};

export default FeaturePage;