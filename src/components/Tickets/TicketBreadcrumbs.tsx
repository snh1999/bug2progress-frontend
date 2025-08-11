import { useRouter } from "next/navigation";
import { TrashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { TTicket } from "@/api/tickets/tickets.types";
import { useDeleteTicket } from "@/api/tickets/tickets";
import { useConfirm } from "@/hooks/useConfirm";
import { TProject } from "@/api/projects/projects.types";
import { HeaderBreadcrumbs } from "@/components/common/HeaderBreadcrumbs";

interface Props {
  project: TProject;
  ticket: TTicket;
}

export const TicketBreadcrumbs = ({
  ticket,
  project
}: Props) => {
  const router = useRouter();

  const {mutate: deleteTicket, isPending} = useDeleteTicket();

  const [DeleteConfirmation, deleteConfirmation] = useConfirm({
    title: "Remove ticket?",
    message: "Are you sure you want to remove this ticket?",
    variant: "destructive",
    onConfirm: () => {
      deleteTicket({projectId: project.id, id: ticket.id}, {
        onSuccess: () => {
          router.push(`/projects/${project.id}/tickets`);
        },
      });
    },
  });

  return (
    <div className="flex items-center gap-x-2">
      <DeleteConfirmation/>
      <HeaderBreadcrumbs project={project} ticket={ticket} feature={ticket.feature}/>
      <Button
        onClick={deleteConfirmation}
        disabled={isPending}
        className="ml-auto"
        variant="destructive"
        size="sm"
      >
        <TrashIcon className="size-4 lg:mr-2"/>
        <span className="hidden lg:block">Delete Ticket</span>
      </Button>
    </div>
  );
};


