import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageOrAvatar } from "@/components/common/ImageOrAvatar";
import { ReactNode } from "react";
import { getRandomColor } from "@/lib/utils";

export type TCardItemProps = {
  id?: string;
  title: string;
  bgColor?: string;
  progress?: number;
  hideAvatar?: boolean;
  titleNode?: ReactNode;
  summary: string | ReactNode;
  centerFocusText?: string | ReactNode;
  bottomBarInformation?: string | ReactNode;
  topRightComponent?: ReactNode;
};

export const CardItem = ({
  title,
  titleNode,
  summary,
  centerFocusText,
  bottomBarInformation,
  progress,
  topRightComponent,
  hideAvatar = false,
  bgColor = getRandomColor(),
}: TCardItemProps) => {
  return (
    <Card className="@container/card bg-muted">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between py-0">
          {titleNode ? (
            titleNode
          ) : (
            <div className="flex items-center gap-2">
              {!hideAvatar && <ImageOrAvatar name={title} bgColor={bgColor} />}
              <CardTitle className="camelcase">{title}</CardTitle>
            </div>
          )}

          {topRightComponent
            ? topRightComponent
            : progress && (
                <Badge variant="default" className="rounded-full">
                  {progress}
                </Badge>
              )}
        </div>
        <CardDescription className="text-xl tabular-nums @[250px]/card:text-xl">
          {centerFocusText}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-col items-start gap-3 text-sm">
        <div className="ml-1 line-clamp-1 flex italic text-muted-foreground font-medium">
          {summary}
        </div>
        {bottomBarInformation && (
          <div className="pt-3 text-muted-foreground">
            {bottomBarInformation}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
