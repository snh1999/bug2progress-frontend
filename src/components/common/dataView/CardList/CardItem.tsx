import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageOrAvatar } from "@/components/common/ImageOrAvatar";
import { ReactNode } from "react";
import { getRandomColor } from "@/lib/utils";

export type TCardItemProps = {
  title: string;
  summary: string;
  centerFocusText?: string;
  bottomBarInformation?: string;
  progress?: number;
  id?: string;
  childComponent?: ReactNode;
  bgColor?: string;
};

export const CardItem = ({
  title,
  summary,
  centerFocusText,
  bottomBarInformation,
  progress,
  childComponent,
  bgColor = getRandomColor(),
}: TCardItemProps) => {
  return (
      <Card className="@container/card">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between py-0">
            <div className="flex items-center gap-2">
              <ImageOrAvatar name={title} bgColor={bgColor} />
              <CardTitle className="camelcase">{title}</CardTitle>
            </div>

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
        <CardContent className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex font-medium">{summary}</div>
          <div className="text-muted-foreground">{bottomBarInformation}</div>
        </CardContent>
      </Card>
  );
};
