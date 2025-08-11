"use client";

import Link from "next/link";
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
import { TProjectContributorWithUser } from "@/api/projects/projects.types";
import { CardItem } from "@/components/common/dataView/CardList/CardItem";
import React from "react";
import {
  TicketPriority,
  TicketStatus,
  TicketType,
} from "@/components/Tickets/TicketsView/DataTable/enums/TicketViewEnums";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { convertSnakeCaseToTitleCase } from "@/lib/utils";

export const ProjectHome = () => {
  const projectId = useProjectId();

  const {
    data: tickets,
    isLoading: isLoadingTickets,
    error: ticketsError,
  } = useGetTickets({ projectId });
  const {
    data: features,
    isLoading: isLoadingFeatures,
    error: featuresError,
  } = useGetFeatures(projectId);
  const {
    data: contributors,
    isLoading: isLoadingContributors,
    error: contributorsError,
  } = useGetProjectContributors({ id: projectId });

  const isLoading =
    isLoadingTickets || isLoadingFeatures || isLoadingContributors;

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (!tickets || !features || !contributors) {
    toast.error(
      ticketsError?.message ??
        featuresError?.message ??
        contributorsError?.message
    );
    return null;
  }

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <TicketList data={tickets} total={tickets.length} />
        <div className="gap-4">
          <FeatureList data={features} total={features.length} />
          <ContributorList data={contributors} total={contributors.length} />
        </div>
      </div>
    </div>
  );
};

interface TicketListProps {
  data: TTicket[];
  total: number;
}

export const TicketList = ({ data, total }: TicketListProps) => {
  const projectId = useProjectId();

  const cardListData = data.map((ticket) => ({
    title: ticket.title,
    id: ticket.id,
    titleNode: (
      <>
        <span className="font-semibold">{ticket.title}</span>
        <div className="flex items-center gap-x-2">
          <TicketStatus status={ticket.ticketStatus} />
          <TicketPriority priority={ticket.ticketPriority} />
          <TicketType type={ticket.ticketType} />
        </div>
      </>
    ),
    summary: (
      <div className="flex items-center gap-x-2">
        <div className="text-sm text-muted-foreground flex items-center">
          <CalendarIcon className="size-3 mr-1" />
          <span className="truncate">
            {ticket.dueAt
              ? formatDistanceToNow(new Date(ticket.dueAt))
              : "No due Date"}
          </span>
        </div>
        <div className="size-1 rounded-full bg-neutral-300" />
        <TicketViewFeatureHover feature={ticket.feature} />
      </div>
    ),
  }));

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-white dark:bg-black rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Tickets ({total})</p>
          <CreateTicketButton />
        </div>
        <ul className="flex flex-col pt-4 gap-y-4">
          {cardListData.map((ticket) => (
            <li key={ticket.id}>
              <Link href={`/projects/${projectId}/tickets/${ticket.id}`}>
                <CardItem {...ticket} hideAvatar />
              </Link>
            </li>
          ))}

          <li className="pb-4 text-sm text-muted-foreground text-center hidden first-of-type:block">
            No tickets found
          </li>
        </ul>
        {data.length > 3 && (
          <Button variant="ghost" className="mt-4 w-full" asChild>
            <Link href={`/projects/${projectId}/tickets`}>
              Show All
              <ChevronDown className="size-4" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

interface FeatureListProps {
  data: TFeature[];
  total: number;
}

export const FeatureList = ({ data, total }: FeatureListProps) => {
  const projectId = useProjectId();

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-white dark:bg-black border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Features ({total})</p>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-4 gap-4">
          {data.map((feature) => (
            <li key={feature.id}>
              <Link href={`/projects/${projectId}/features/${feature.id}`}>
                <Card className="bg-muted shadow-none rounded-lg hover:opacity-75 transition">
                  <CardContent className="p-4 flex items-center gap-x-2.5">
                    <TicketViewFeatureHover feature={feature} />
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
        {total === 0 && (
          <span className="pb-4 text-sm text-muted-foreground text-center hidden first-of-type:block">
            No features found
          </span>
        )}
      </div>
    </div>
  );
};

interface ContributorListProps {
  data: TProjectContributorWithUser[];
  total: number;
}

export const ContributorList = ({ data, total }: ContributorListProps) => {
  const projectId = useProjectId();

  const cardListData = data.map((contributor) => ({
    id: contributor.user.id,
    title: contributor.user.profile.name,
    topRightComponent: (
      <Badge className="rounded-full">
        {convertSnakeCaseToTitleCase(contributor.role)}
      </Badge>
    ),
    summary: (
      <div className="mt-2 flex items-center gap-x-2">
        <span className="truncate text-muted-foreground">
          {"@" + contributor.user.profile.username}
        </span>
      </div>
    ),
  }));

  return (
    <div className="flex pt-4 flex-col gap-y-4 col-span-1">
      <div className="bg-white dark:bg-black border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Members ({total})</p>
          <Button asChild variant="outline" size="icon">
            <Link href={`/projects/${projectId}/contributors`}>
              <ExternalLink className="size-4 text-neutral-400" />
            </Link>
          </Button>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 py-4 gap-4">
          {cardListData.map((contributor) => (
            <li key={contributor.id}>
              <CardItem {...contributor} />
            </li>
          ))}
        </ul>
        {total === 0 && (
          <span className="pb-4 text-sm text-muted-foreground text-center hidden first-of-type:block">
            No contributors found
          </span>
        )}
      </div>
    </div>
  );
};
