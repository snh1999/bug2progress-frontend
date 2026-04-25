"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Mail,
  Calendar,
  MapPin,

} from "lucide-react";
import { TProjectContributorWithUser } from "@/api/projects/projects.types";
import TooltipWrapper from "@/components/common/TooltipWrapper";
import { ImageOrAvatar } from "@/components/common/ImageOrAvatar";
import { convertSnakeCaseToTitleCase } from "@/lib/utils";

type TProps = {
  contributor: TProjectContributorWithUser;
  role?: string
}
export default function UserCard({contributor, role}: TProps) {
  const {user} = contributor;
  const {email, joinedAt, profile} = user

  const name = profile?.name || email.split("@")[0];
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <ImageOrAvatar name={name} size={8} rounded/>
          <div className="flex-1 min-w-0 space-y-0.5">
            <div className="flex items-center justify-between gap-2">
              <h4 className="font-semibold text-sm truncate">{name}</h4>
              {role && <div className={"text-xs gap-1 text-muted-foreground"}>
                {convertSnakeCaseToTitleCase(role)}
              </div>}
            </div>
            <p className="text-xs text-muted-foreground truncate">@{profile?.username || email}</p>
            <TooltipWrapper tooltipContent={<p>
              {email}
            </p>}>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Mail className="w-3 h-3"/>
                <span
                  className="truncate">{email.slice(0, 25)}{email.length > 25 ? "..." : ""}</span>
              </div>
            </TooltipWrapper>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        {profile?.bio ? (
          <p className="text-xs text-muted-foreground leading-relaxed">{profile.bio}</p>
        ) : (
          <p className="text-xs text-muted-foreground italic">No bio provided</p>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        {profile?.country && (
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="w-3 h-3"/>
            {profile.country}
          </div>
        )}
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Calendar className="w-3 h-3"/>
          Joined {new Date(joinedAt).toLocaleDateString(undefined, {
          month: "short",
          year: "numeric"
        })}
        </div>
      </CardFooter>
    </Card>
  );
}
