import type { TUserWithProfile } from "@/api/users/users.types";
import { ImageOrAvatar } from "@/components/common/ImageOrAvatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import UserCard from "@/components/Tickets/TicketsView/DataTable/contributors/Usercard";

type Props = {
  contributor?: TUserWithProfile;
  altText?: string;
  compact?: boolean;
};

export function TicketViewContributorHover({
  contributor,
  altText,
  compact,
}: Props) {
  if (!contributor)
    return (
      <Button
        disabled
        variant="ghost"
        size="sm"
        className="text-muted-foreground pr-0"
      >
        {altText ?? "Unassigned"}
      </Button>
    );

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        {compact ? (
          <ImageOrAvatar size={7} rounded name={contributor.profile.name} />
        ) : (
          <Button variant="ghost" size="sm">
            @{contributor.profile.username}
          </Button>
        )}
      </HoverCardTrigger>
      <HoverCardContent className="min-w-100 w-max">
        <UserCard user={contributor} role={contributor.role} />
      </HoverCardContent>
    </HoverCard>
  );
}
