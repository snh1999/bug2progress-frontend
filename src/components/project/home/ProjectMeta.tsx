import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TProject } from "@/api/projects/projects.types";
import { Separator } from "@/components/ui/separator";

export default function ProjectMeta({ project }: { project: TProject }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Project Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Visibility</span>
          <span>{project.isPublic ? "Public" : "Private"}</span>
        </div>
        {/*TODO: copy button*/}
        <div className="flex justify-between">
          <span className="text-muted-foreground">Invite Code</span>
          <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
            {project.inviteCode?.slice(0, 8)}...
          </code>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">URL ID</span>
          <span className="text-muted-foreground">
            {project.urlid || "None"}
          </span>
        </div>
        <Separator />
        <div className="flex justify-between">
          <span className="text-muted-foreground">Last Updated</span>
          <span>
            {project.updatedAt
              ? new Date(project.updatedAt).toLocaleDateString()
              : "N/A"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
