import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger, } from "@/components/ui/hover-card";
import { TUserWithProfile } from "@/api/users/users.types";
import { ImageOrAvatar } from "@/components/common/ImageOrAvatar";
import { format } from "date-fns";

type Props = {
  user: TUserWithProfile
}

export function TicketViewContributorHover({user} : Props) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="secondary">@{user.profile.username}</Button>
      </HoverCardTrigger>
      <HoverCardContent className="min-w-100 w-max">
        <div className="flex justify-between gap-4">
            <ImageOrAvatar name={user.profile.name} />
          <div className="space-y-1">
            <h4 className="text-sm italic">@{user.profile.username}</h4>
            <p className="text-sm font-semibold">
              {user.profile.name}
            </p>
            <div className="text-muted-foreground text-xs">
              Joined at {format(user.joinedAt, "PP")}
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
