"use client";

import ContributorList from "@/components/contributors/ContributorList";
import { EProjectRole } from "@/api/projects/projects.types";

const ContributorsPage = () => {

  return <div>
    Owner

    <ContributorList role={EProjectRole.MANAGER}/>
    <ContributorList role={EProjectRole.LEAD}/>
    <ContributorList role={EProjectRole.DEVELOPER}/>
  </div>;
};

export default ContributorsPage;

