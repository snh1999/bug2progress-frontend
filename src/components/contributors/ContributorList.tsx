import { useGetProjectContributors } from "@/api/projects/projectContributors";
import type { EProjectRole } from "@/api/projects/projects.types";
import LoadingComponent from "@/components/common/LoadingComponent";
import { useProjectId } from "@/hooks/useProjectId";
import { convertSnakeCaseToTitleCase } from "@/lib/utils";
import UserCard from "@/components/Tickets/TicketsView/DataTable/contributors/Usercard";

type TContributorListProps = {
  role: EProjectRole;
};

const ContributorList = ({ role }: TContributorListProps) => {
  const projectId = useProjectId();
  const { data, isLoading } = useGetProjectContributors({
    id: projectId,
    role,
  });

  if (isLoading || !data) return <LoadingComponent />;

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-black border rounded-lg p-6 mb-2">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">
          {convertSnakeCaseToTitleCase(role)} ({data.length})
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 pt-4">
        {data.map((item) => (
          <UserCard user={item.user} key={item.userId} />
        ))}
      </div>
    </div>
  );
};

export default ContributorList;
