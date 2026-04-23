import { TProject } from "@/api/projects/projects.types";
import { PROJECTS_PATH } from "@/app.constants";
import Link from "next/link";
import { CardItem } from "../common/dataView/CardList/CardItem";
import { Badge } from "../ui/badge";

interface Props {
  project: TProject;
}

export const ProjectCard = ({ project }: Props) => {
  const ticketCount = project._count?.ticket ?? 0;
  const featureCount = project._count?.features;
  const contributorCount = project._count?.members ?? 0;
  return (
    <>
      <Link key={project.id} href={`${PROJECTS_PATH}/${project.id}`}>
        <CardItem
          title={project.title}
          summary={project.summary}
          id={project.id}
          bottomBarInformation={`Updated ${new Date(project.updatedAt).toLocaleDateString()}`}
          centerFocusText={
            <>
              <Badge className="text-primary" variant="outline">
                {ticketCount} Tickets
              </Badge>
              <Badge className="text-primary" variant="outline">
                {contributorCount} Members
              </Badge>
              {featureCount && (
                <Badge className="text-primary" variant="outline">
                  {featureCount} Features
                </Badge>
              )}
            </>
          }
        />
      </Link>
    </>
  );
};
