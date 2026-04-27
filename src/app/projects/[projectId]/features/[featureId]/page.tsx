"use client";
import { useFeatureId } from "@/hooks/useFeatureId";
import { useProjectId } from "@/hooks/useProjectId";

import { useGetFeature } from "@/api/features/features";
import { toast } from "sonner";
import LoadingComponent from "@/components/common/LoadingComponent";
import { TicketsView } from "@/components/Tickets/TicketsView/TicketsView";
import FeatureDetails from "@/components/features/FeatureDetails";

export default function FeaturePage() {
  const projectId = useProjectId();
  const featureId = useFeatureId();

  const {
    data: feature,
    isLoading,
    error,
  } = useGetFeature(projectId, featureId);

  if (error) {
    toast.error(error.message);
  }

  if (!feature || isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div>
      <FeatureDetails projectId={projectId} feature={feature} />

      <TicketsView hideFeatureFilter />
    </div>
  );
}
