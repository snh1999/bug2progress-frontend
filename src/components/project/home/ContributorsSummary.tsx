import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useProjectId } from "@/hooks/useProjectId";
import LoadingComponent from "@/components/common/LoadingComponent";
import { useGetProjectContributors } from "@/api/projects/projectContributors";
import { ImageOrAvatar } from "@/components/common/ImageOrAvatar";

export default  function ContributorsSummary(){
  const projectId = useProjectId();
  const {data: contributors, isLoading: contributorsLoading} =
    useGetProjectContributors({id: projectId});
  const topContributors = contributors?.slice(0, 5) || [];


  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Users className="w-4 h-4"/>
          Contributors
        </CardTitle>
        <Link href={`/projects/${projectId}/contributors`}>
          <Button variant="ghost" size="sm" className="h-auto py-1 px-2">
            <ExternalLink className="w-3 h-3"/>
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {contributorsLoading ? (
          <LoadingComponent/>
        ) : topContributors.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No contributors yet.
          </p>
        ) : (
          <div className="space-y-2">
            {topContributors.map((c: any) => (
              <div
                key={c.userId}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-accent transition-colors"
              >
                <ImageOrAvatar
                  name={c.user.profile?.name}
                  rounded
                  size={8}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {c.user.profile?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {c.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>

  )
}
