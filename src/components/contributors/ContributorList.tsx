import { EProjectRole } from "@/api/projects/projects.types";
import { useGetProjectContributors } from "@/api/projects/projectContributors";
import LoadingComponent from "@/components/common/LoadingComponent";
import { useProjectId } from "@/hooks/useProjectId";
import { ContributorMenu } from "@/components/contributors/ContributorMenu";
import { convertSnakeCaseToTitleCase } from "@/lib/utils";
import { CardItem } from "@/components/common/dataView/CardList/CardItem";

type TContributorListProps = {
  role: EProjectRole
}

const ContributorList = ({role}: TContributorListProps) => {
  const projectId = useProjectId();
  const {data, isLoading} = useGetProjectContributors({id:projectId, role});

  if (isLoading || !data) return <LoadingComponent/>;

  const cardListData = data.map(({user, role}) => ({
    title: user.profile.name,
    summary: '@' + user.profile.username,
    id: user.id,
    bottomBarInformation: role,
    childComponent: <ContributorMenu userId={user.id}/>
  }));

  if(data.length === 0) {
    return null;
  }
  
  return (
      <div className="bg-white dark:bg-black border rounded-lg p-6 mb-2">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">
            {convertSnakeCaseToTitleCase(role)} ({data.length})
          </p>
        </div>

      <div className="grid grid-cols-2 lg:grid-cols-3">
          {cardListData.map((item) => (
            <CardItem key={item.id} {...item} />
          ))}
      </div>
    </div>
  );
};

export default ContributorList;