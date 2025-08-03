"use client";
import { useFeatureId } from "@/hooks/useFeatureId";
import { useProjectId } from "@/hooks/useProjectId";
import { useGetFeature } from "@/api/features/features";
import LoadingComponent from "@/components/common/LoadingComponent";
import { toast } from "sonner";
import { TicketsView } from "@/components/Tickets/TicketsView/TicketsView";
import { SecondaryHeader } from "@/components/common/SecondaryHeader";
import EditFeatureButton from "@/components/features/EditFeatureButton";
import React from "react";

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
