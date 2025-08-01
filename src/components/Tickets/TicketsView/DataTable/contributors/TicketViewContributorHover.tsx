import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { TUserWithProfile } from "@/api/users/users.types";
import { ImageOrAvatar } from "@/components/common/ImageOrAvatar";
import { format } from "date-fns";

type Props = {
  contributor?: TUserWithProfile;
  compact?: boolean;
};

export function TicketViewContributorHover({
  contributor,
  compact = false,
}: Props) {
  if (!contributor)
    return <span className="text-muted-foreground italic">Unassigned</span>;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        {compact ? (
          <ImageOrAvatar size={5} rounded name={contributor.profile.name} />
        ) : (
          <Button variant="ghost" size="sm">
            @{contributor.profile.username}
          </Button>
        )}
      </HoverCardTrigger>
      <HoverCardContent className="min-w-100 w-max">
        <div className="flex justify-between gap-4">
          <ImageOrAvatar name={contributor.profile.name} />
          <div className="space-y-1">
            <h4 className="text-sm italic">@{contributor.profile.username}</h4>
            <p className="text-sm font-semibold">{contributor.profile.name}</p>
            <div className="text-muted-foreground text-xs">
              Joined at {format(contributor.joinedAt, "PP")}
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
