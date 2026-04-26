import { PlusIcon } from "lucide-react";
import { toast } from "sonner";
import { useGetFeatures } from "@/api/features/features";
import { useGetProjectContributors } from "@/api/projects/projectContributors";
import type { ETicketStatus } from "@/api/tickets/tickets.types";
import { OPEN_CREATE_TICKET_MODAL_KEY } from "@/app.constants";
import LoadingComponent from "@/components/common/LoadingComponent";
import { ResponsiveModal } from "@/components/common/ResponsiveModal";
import { CreateTicketForm } from "@/components/Tickets/CreateTicketForm/CreateTicketForm";
import { Button } from "@/components/ui/button";
import { useOpenModal } from "@/hooks/useModalHook";
import { useProjectId } from "@/hooks/useProjectId";
import { cn } from "@/lib/utils";

type Props = {
  isCompact?: boolean;
  defaultStatus?: ETicketStatus;
};

const CreateTicketButton = ({ isCompact = false, defaultStatus }: Props) => {
  const { closeModal, isOpen, openModal } = useOpenModal(
    OPEN_CREATE_TICKET_MODAL_KEY +
      `${defaultStatus ? `-${defaultStatus.toLowerCase()}` : ""}`,
  );

  const projectId = useProjectId();

  const {
    data: features,
    isLoading: isFeaturesLoading,
    error: featureError,
  } = useGetFeatures(projectId);
  const {
    data: contributors,
    isLoading: isContributorLoading,
    error: contributorError,
  } = useGetProjectContributors({ id: projectId });

  if (featureError || contributorError) {
    toast.error(featureError?.message ?? contributorError?.message);
    return null;
  }
  if (isContributorLoading || isFeaturesLoading || !features || !contributors) {
    return <LoadingComponent />;
  }

  return (
    <>
      <ResponsiveModal open={isOpen} onOpenChange={closeModal}>
        <CreateTicketForm
          onCancel={closeModal}
          features={features}
          contributors={contributors}
          defaultStatus={defaultStatus}
        />
      </ResponsiveModal>

      <Button
        variant={isCompact ? "ghost" : "default"}
        className={cn(isCompact && "p-0")}
        onClick={openModal}
      >
        <PlusIcon />
        {!isCompact && "New"}
      </Button>
    </>
  );
};

export default CreateTicketButton;
