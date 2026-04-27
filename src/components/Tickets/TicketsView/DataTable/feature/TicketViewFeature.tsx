import type { TFeature } from "@/api/features/features.types";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { FeatureItem } from "@/components/features/FeatureItem";
import { FeatureCard } from "@/components/features/FeatureCard";

export function TicketViewFeatureHover({
  feature,
  compact,
}: {
  feature?: TFeature;
  compact?: boolean;
}) {
  if (!feature) return <span className="text-muted-foreground italic">-</span>;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 truncate">
          <FeatureItem feature={feature} compact={compact} />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-max">
        <FeatureCard feature={feature} />
      </HoverCardContent>
    </HoverCard>
  );
}
