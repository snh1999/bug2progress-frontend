"use client";
import { toast } from "sonner";
import { useGetFeature } from "@/api/features/features";
import LoadingComponent from "@/components/common/LoadingComponent";
import { SecondaryHeader } from "@/components/common/SecondaryHeader";
import EditFeatureButton from "@/components/features/EditFeatureButton";
import { TicketsView } from "@/components/Tickets/TicketsView/TicketsView";
import { useFeatureId } from "@/hooks/useFeatureId";
import { useProjectId } from "@/hooks/useProjectId";

const FeaturePage = () => {
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
      <div className="flex items-center justify-between">
        <SecondaryHeader />
        <EditFeatureButton />
      </div>
      <TicketsView hideFeatureFilter />
    </div>
  );
};

export default FeaturePage;
