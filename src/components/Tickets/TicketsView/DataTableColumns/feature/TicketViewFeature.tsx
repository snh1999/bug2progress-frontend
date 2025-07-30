import { HoverCard, HoverCardContent, HoverCardTrigger, } from "@/components/ui/hover-card";
import { ImageOrAvatar } from "@/components/common/ImageOrAvatar";
import { TFeature } from "@/api/features/features.types";
import { Button } from "@/components/ui/button";

type Props = {
  feature: TFeature
}

export function TicketViewFeatureHover({feature}: Props) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="secondary" className="flex items-center gap-2">
          <ImageOrAvatar name={feature.title} size={7}/>{feature.title}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="min-w-200 w-max">
        <div className="flex justify-between gap-4">
          <ImageOrAvatar name={feature.title}/>
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
