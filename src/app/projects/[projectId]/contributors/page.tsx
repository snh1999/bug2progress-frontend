"use client";

import { useGetProjectContributors } from "@/api/projects/projectContributors";
import { EProjectRole } from "@/api/projects/projects.types";
import LoadingComponent from "@/components/common/LoadingComponent";
import ContributorList from "@/components/contributors/ContributorList";
import { useProjectId } from "@/hooks/useProjectId";

const ContributorsPage = () => {
  const projectId = useProjectId();
  const { data, isLoading } = useGetProjectContributors({ id: projectId });

  if (isLoading || !data) return <LoadingComponent />;

  if (data.length === 0) {
    return (
      <div className="text-center h-full items-center text-muted-foreground italic">
        No contributors found
      </div>
    );
  }

  return (
    <div>
      <ContributorList role={EProjectRole.MANAGER} />
      <ContributorList role={EProjectRole.LEAD} />
      <ContributorList role={EProjectRole.DEVELOPER} />
    </div>
  );
};

export default ContributorsPage;
