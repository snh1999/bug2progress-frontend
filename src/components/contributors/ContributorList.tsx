import { EProjectRole } from "@/api/projects/projects.types";
import { useGetProjectContributors } from "@/api/projects/projectContributors";
import LoadingComponent from "@/components/common/LoadingComponent";
import { useProjectId } from "@/hooks/useProjectId";
import { CardList } from "@/components/common/dataView/CardList/CardList";
import { ContributorMenu } from "@/components/contributors/ContributorMenu";

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
  
  return (
    <div>
      {role}
      <CardList listItems={cardListData} />
    </div>
  );
};

export default ContributorList;