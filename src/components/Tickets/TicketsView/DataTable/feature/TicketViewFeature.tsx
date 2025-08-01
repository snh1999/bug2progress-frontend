import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ImageOrAvatar } from "@/components/common/ImageOrAvatar";
import { TFeature } from "@/api/features/features.types";
import { Button } from "@/components/ui/button";

type Props = {
  feature: TFeature;
  compact?: boolean;
  rounded?: boolean;
};

export function TicketViewFeatureHover({
  feature,
  compact = false,
  rounded = false,
}: Props) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant="ghost"
          size={compact ? "xs" : "sm"}
          className="flex items-center gap-2 truncate"
        >
          <ImageOrAvatar name={feature.title} rounded={rounded} size={5} />
          {!compact && feature.title}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="min-w-200 w-max">
        <div className="flex justify-between gap-4">
          <ImageOrAvatar name={feature.title} />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{feature.title}</h4>
            <div className="text-muted-foreground truncate text-xs">
              {feature.description}
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
