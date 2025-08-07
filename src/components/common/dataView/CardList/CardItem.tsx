import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageOrAvatar } from "@/components/common/ImageOrAvatar";
import { ReactNode } from "react";
import { getRandomColor } from "@/lib/utils";

export type TCardItemProps = {
  title: string;
  titleNode?: ReactNode;
  summary: string | ReactNode;
  centerFocusText?: string;
  bottomBarInformation?: string;
  progress?: number;
  id?: string;
  childComponent?: ReactNode;
  bgColor?: string;
  hideAvatar?: boolean;
};

export const CardItem = ({
  title,
  titleNode,
  summary,
  centerFocusText,
  bottomBarInformation,
  progress,
  childComponent,
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

          {childComponent
            ? childComponent
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
