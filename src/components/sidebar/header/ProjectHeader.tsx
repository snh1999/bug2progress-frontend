import { useGetProjectContributors } from "@/api/projects/projectContributors";
import { useGetProject } from "@/api/projects/projects";
import { ImageOrAvatar } from "@/components/common/ImageOrAvatar";
import LoadingComponent from "@/components/common/LoadingComponent";
import ProjectStatusBadge from "@/components/project/ProjectStatusBadge";
import { AvatarGroup } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useProjectId } from "@/hooks/useProjectId";
import { Calendar, Shield } from "lucide-react";
import { sidebarMenuItems } from "../ProjectMenu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PROJECTS_PATH } from "@/app.constants";

export default function ProjectHeader() {
  const projectId = useProjectId();
  const pathname = usePathname();
  const { data: project, isLoading } = useGetProject(projectId);
  const { data: contributors } = useGetProjectContributors({ id: projectId });

  if (isLoading || !project) return <LoadingComponent />;
  return (
    <div className="border-b px-6 py-4">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">{project.title}</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {project.summary}
          </p>
        </div>
        <div className="flex gap-1 items-center">
          <ProjectStatusBadge status={project.status} />
          {project?.isPublic === false && (
            <Badge variant="outline" className="gap-1">
              <Shield className="w-3 h-3" />
              Private
            </Badge>
          )}
          {contributors && (
            <div className="flex items-center gap-2">
              <AvatarGroup>
                {contributors?.slice(0, 4).map((c) => (
                  <ImageOrAvatar
                    key={c.userId}
                    name={c.user.profile?.name || c.user.profile?.username}
                    size={7}
                    rounded
                  />
                ))}
              </AvatarGroup>
              {contributors && contributors.length > 4 && (
                <span className="text-xs text-muted-foreground">
                  +{contributors.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex items-center gap-1 mt-4">
          {sidebarMenuItems
            .filter((item) => item.label !== "Settings")
            .map((tab) => {
              const Icon = tab.icon;
              const fullHref = `${PROJECTS_PATH}/${projectId}${tab.href}`;
              const isActive = pathname === fullHref;
              return (
                <Link key={tab.label} href={fullHref}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className="gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </Button>
                </Link>
              );
            })}
        </div>
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          Created{" "}
          {project?.createdAt
            ? new Date(project.createdAt).toLocaleDateString()
            : ""}
        </span>
      </div>
    </div>
  );
}
