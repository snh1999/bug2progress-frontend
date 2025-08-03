import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

import { TTicket } from "@/api/tickets/tickets.types";
import { ImageOrAvatar } from "@/components/common/ImageOrAvatar";
import { TProject } from "@/api/projects/projects.types";
import { TFeature } from "@/api/features/features.types";

interface Props {
  project: TProject;
  ticket?: TTicket;
  feature?: TFeature;
}

export const HeaderBreadcrumbs = ({ ticket, project, feature }: Props) => {
  return (
    <div className="flex items-center gap-x-2 pb-4">
      <ImageOrAvatar name={project.title} />
      <Link href={`/projects/${project.id}`}>
        <p className="text-sm lg:text-lg font-semibold text-muted-foreground hover:opacity-75 transition">
          {project.title}
        </p>
      </Link>
      {feature && (
        <>
          <ChevronRightIcon className="size-4 lg:size-5 text-muted-foreground" />
          <ImageOrAvatar name={feature.title} />
          <Link href={`/projects/${project.id}/features/${feature.id}`}>
            <p className="text-sm lg:text-lg font-semibold text-muted-foreground hover:opacity-75 transition">
              {feature.title}
            </p>
          </Link>
        </>
      )}
      {ticket && (
        <>
          <ChevronRightIcon className="size-4 lg:size-5 text-muted-foreground" />
          <p className="text-sm lg:text-lg font-semibold">{ticket.title}</p>
        </>
      )}
    </div>
  );
};
