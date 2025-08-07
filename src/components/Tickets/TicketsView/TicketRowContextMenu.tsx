import { useRouter } from "next/navigation";
import { ExternalLinkIcon, MoreVertical, PencilIcon, TrashIcon, } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProjectId } from "@/hooks/useProjectId";
import { useFeatureId } from "@/hooks/useFeatureId";
import { useOpenModal } from "@/hooks/useModalHook";
import { OPEN_UPDATE_TICKET_MODAL_KEY, PROJECTS_PATH } from "@/app.constants";
import { useDeleteTicket, useGetTicket } from "@/api/tickets/tickets";
import { useConfirm } from "@/hooks/useConfirm";
import { toast } from "sonner";
import LoadingComponent from "@/components/common/LoadingComponent";
import { ResponsiveModal } from "@/components/common/ResponsiveModal";
import { UpdateTicketForm } from "@/components/Tickets/UpdateTicketForm/UpdateTicketForm";
import { Button } from "@/components/ui/button";

interface Props {
  id: string;
}

export const TicketRowContextMenu = ({ id }: Props) => {
  const featureId = useFeatureId();
  const projectId = useProjectId();
  const router = useRouter();

  const { data, isLoading, error } = useGetTicket({ id, projectId });
  const { mutate: deleteTicket, isPending: isDeletePending } =
    useDeleteTicket();

  const { closeModal, isOpen, openModal } = useOpenModal(
    OPEN_UPDATE_TICKET_MODAL_KEY + `-${id}`
  );

  const [DeleteConfirmation, deleteConfirmation] = useConfirm({
    title: "Remove ticket?",
    message: "Are you sure you want to remove this ticket?",
    variant: "destructive",
    onConfirm: () => {
      deleteTicket({ projectId, id });
      closeModal();
    },
  });

  if (error) {
    toast.error(error.message);
    return;
  }

  if (!data || isLoading || isDeletePending) {
    return <LoadingComponent />;
  }

  const redirectToTicket = () => {
    router.push(`${PROJECTS_PATH}/${projectId}/tickets/${id}`);
  };

  const onOpenProject = () => {
    router.push(`${PROJECTS_PATH}/${projectId}`);
  };

  return (
    <div className="flex justify-end">
      <DeleteConfirmation />

      <ResponsiveModal open={isOpen} onOpenChange={closeModal}>
        <UpdateTicketForm
          defaultValues={data}
          onCancel={closeModal}
          onDelete={deleteConfirmation}
        />
      </ResponsiveModal>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="ml-2">
            <MoreVertical className="size-4 p-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            onClick={redirectToTicket}
            className="font-medium p-[10px]"
          >
            <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
            Ticket Details
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onOpenProject}
            className="font-medium p-[10px]"
          >
            <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
            Open Project
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={openModal}
            className="font-medium p-[10px]"
          >
            <PencilIcon className="size-4 mr-2 stroke-2" />
            Edit Ticket
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={deleteConfirmation}
            disabled={isLoading}
            className="text-red-500 focus:text-red-700 font-medium p-[10px]"
          >
            <TrashIcon className="size-4 mr-2 stroke-2" />
            Delete Ticket
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
