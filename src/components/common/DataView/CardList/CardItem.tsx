import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageOrAvatar } from "@/components/common/ImageOrAvatar";
import Link from "next/link";
import { PROJECTS_PATH } from "@/app.constants";

export type TCardItemProps = {
  title: string;
  summary: string;
  centerFocusText?: string;
  bottomBarInformation?: string;
  progress?: number;
  id?: string;
}

export const CardItem = ({
  title,
  id,
  summary,
  centerFocusText,
  bottomBarInformation,
  progress
}: TCardItemProps) => {
  return (
    <Link  href={`${PROJECTS_PATH}/${id}`}>
      <Card className="@container/card">
        <CardHeader className="pb-2" onClick={() => {
        }}>
          <div className="flex items-center justify-between py-0">
            <div className="flex items-center gap-2">
              <ImageOrAvatar name={title}/>
              <CardTitle className="camelcase">{title}</CardTitle>
            </div>
            {progress && <Badge variant="default" className="rounded-full">
              {progress}
            </Badge>}

          </div>
          <CardDescription className="text-xl tabular-nums @[250px]/card:text-xl">
            {centerFocusText}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex font-medium">
            {summary}
          </div>
          <div className="text-muted-foreground">
            {bottomBarInformation}
          </div>
        </CardContent>
      </Card>
    </Link>);
};