"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { CalendarIcon, ChevronDown, ExternalLink } from "lucide-react";


import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useProjectId } from "@/hooks/useProjectId";
import { useGetTickets } from "@/api/tickets/tickets";
import { useGetFeatures } from "@/api/features/features";
import { useGetProjectContributors } from "@/api/projects/projectContributors";
import LoadingComponent from "@/components/common/LoadingComponent";
import { toast } from "sonner";
import { TTicket } from "@/api/tickets/tickets.types";
import CreateTicketButton from "@/components/Tickets/CreateTicketButton";
import { TicketViewFeatureHover } from "@/components/Tickets/TicketsView/DataTable/feature/TicketViewFeature";
import { TFeature } from "@/api/features/features.types";
import { ImageOrAvatar } from "@/components/common/ImageOrAvatar";
import { TProjectContributorWithUser } from "@/api/projects/projects.types";

export const ProjectHome = () => {
  const projectId = useProjectId();

  const {data: tickets, isLoading: isLoadingTickets, error: ticketsError} = useGetTickets({projectId});
  const {data: features, isLoading: isLoadingFeatures, error: featuresError} = useGetFeatures(projectId);
  const {
    data: contributors,
    isLoading: isLoadingContributors,
    error: contributorsError
  } = useGetProjectContributors({id: projectId});

  const isLoading =
    isLoadingTickets ||
    isLoadingFeatures ||
    isLoadingContributors;

  if (isLoading) {
    return <LoadingComponent/>;
  }

  if (!tickets || !features || !contributors) {
    toast.error(ticketsError?.message ?? featuresError?.message ?? contributorsError?.message);
    return null;
  }

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <TicketList data={tickets} total={tickets.length}/>
        <div className="gap-4">
        <FeatureList data={features} total={features.length} />
        <ContributorList data={contributors} total={contributors.length}/>
        </div>
      </div>
    </div>
  );
};

interface TicketListProps {
  data: TTicket[];
  total: number;
}

export const TicketList = ({data, total}: TicketListProps) => {
  const projectId = useProjectId();

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-white dark:bg-black rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">
            Tasks ({total})
          </p>
          <CreateTicketButton/>
        </div>
        <ul className="flex flex-col pt-4 gap-y-4">
          {data.map((ticket) => (
            <li key={ticket.id}>
              <Link href={`/projects/${projectId}/tickets/${ticket.id}`}>
                <Card className="shadow-none bg-muted rounded-lg hover:opacity-90 transition">
                  <CardContent className="p-4">
                    <p className="text-lg font-medium truncate">{ticket.title}</p>
                    <div className="flex items-center gap-x-2">
                      <div className="text-sm text-muted-foreground flex items-center">
                        <CalendarIcon className="size-3 mr-1"/>
                        <span className="truncate">
                          {ticket.dueAt ? formatDistanceToNow(new Date(ticket.dueAt)) : "No due Date"}
                        </span>
                      </div>
                      <div className="size-1 rounded-full bg-neutral-300"/>
                      <TicketViewFeatureHover feature={ticket.feature}/>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
          <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
            No tickets found
          </li>
        </ul>
        <Button variant="ghost" className="mt-4 w-full" asChild>
          <Link href={`/projects/${projectId}/tickets`}>
            Show All<ChevronDown className="size-4"/>
          </Link>
        </Button>
      </div>
    </div>
  );
};

interface FeatureListProps {
  data: TFeature[];
  total: number;
}

export const FeatureList = ({data, total}: FeatureListProps) => {
  const projectId = useProjectId();

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-white dark:bg-black border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">
            Projects ({total})
          </p>
        </div>
        <ul className="grid grid-cols-1 lg:grid-cols-2 py-4 gap-4">
          {data.map((feature) => (
            <li key={feature.id}>
              <Link href={`/projects/${projectId}/features/${feature.id}`}>
                <Card className="bg-muted shadow-none rounded-lg hover:opacity-75 transition">
                  <CardContent className="p-4 flex items-center gap-x-2.5">
                    <TicketViewFeatureHover feature={feature}/>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
          {total === 0 && <li className="text-sm text-muted-foreground italic">
            No projects found
          </li>}
        </ul>
      </div>
    </div>
  );
};

interface ContributorListProps {
  data: TProjectContributorWithUser[];
  total: number;
}

export const ContributorList = ({data, total}: ContributorListProps) => {
  const projectId = useProjectId();

  return (
    <div className="flex flex-col gap-y-4 col-span-1 pt-2">
      <div className="bg-white dark:bg-black border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">
            Members ({total})
          </p>
          <Button asChild variant="secondary" size="icon">
            <Link href={`/projects/${projectId}/members`}>
              <ExternalLink className="size-4 text-neutral-400"/>
            </Link>
          </Button>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((contributor) => (
            <li key={contributor.userId}>
              <Card className="shadow-none rounded-lg overflow-hidden">
                <CardContent className="p-3 flex flex-col items-center gap-x-2">
                  <ImageOrAvatar name={contributor.user.profile.name}/>
                  <div className="flex flex-col items-center overflow-hidden">
                    <p className="text-lg font-medium line-clamp-1">
                      {contributor.user.profile.name}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {contributor.user.profile.username}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
          {total === 0 && <li className="text-sm text-muted-foreground italic">
            No contributors found
          </li>}
        </ul>
      </div>
    </div>
  );
};

