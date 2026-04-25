import { TProject } from "@/api/projects/projects.types";
import { PROJECTS_PATH } from "@/app.constants";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TooltipWrapper from "@/components/common/TooltipWrapper";
import { Activity, Calendar, Globe, Ticket, Users, Lock } from "lucide-react";

interface Props {
  project: TProject;
}
const projectStatusConfig: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  PROPOSED: { label: "Proposed", color: "text-slate-600", bg: "bg-slate-100" },
  IN_DEVELOPMENT: {
    label: "In Dev",
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  ACTIVE: { label: "Active", color: "text-green-600", bg: "bg-green-100" },
  MAINTAINED: {
    label: "Maintained",
    color: "text-teal-600",
    bg: "bg-teal-100",
  },
  NOT_MAINTAINED: {
    label: "Stale",
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
  OBSOLETE: { label: "Obsolete", color: "text-red-600", bg: "bg-red-100" },
};

export const ProjectCard = ({ project }: Props) => {
  const ticketCount = project._count?.ticket ?? 0;
  const featureCount = project._count?.features;
  const contributorCount = project._count?.members ?? 0;
  const config =
    projectStatusConfig[project.status] || projectStatusConfig.PROPOSED;

  return (
    <>
      <Link key={project.id} href={`${PROJECTS_PATH}/${project.id}`}>
        <Card className="@container/card">
          <CardHeader>
            <CardTitle className="flex justify-between items-center pb-0">
              <div className="flex items-center gap-1">
                <TooltipWrapper
                  tooltipContent={
                    <p>
                      {project.isPublic ? "Public project" : "Private project"}
                    </p>
                  }
                >
                  {project.isPublic ? (
                    <Globe className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  )}
                </TooltipWrapper>
                <h4 className="font-semibold leading-tight truncate">
                  {project.title}
                </h4>
              </div>
              <div
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${config.bg} ${config.color}`}
              >
                {config.label}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-col items-start gap-3 text-sm">
            <CardDescription className="text-xs line-clamp-3 pt-0">
              {project.summary}
            </CardDescription>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Ticket className="w-3 h-3" />
                  {ticketCount}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {contributorCount}
                </span>
                <span className="flex items-center gap-1">
                  <Activity className="w-3 h-3" />
                  {featureCount}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(project.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </>
  );
};
