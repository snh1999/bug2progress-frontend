import { useOpenModal } from "@/hooks/useModalHook";
import { OPEN_CREATE_TICKET_MODAL_KEY } from "@/app.constants";
import { ResponsiveModal } from "@/components/common/ResponsiveModal";
import { Button } from "@/components/ui/button";
import { CreateTicketForm } from "@/components/Tickets/CreateTicketForm/CreateTicketForm";
import { PlusIcon } from "lucide-react";
import { useGetFeatures } from "@/api/features/features";
import { useProjectId } from "@/hooks/useProjectId";
import { useGetProjectContributors } from "@/api/projects/projectContributors";
import { toast } from "sonner";
import LoadingComponent from "@/components/common/LoadingComponent";
import { cn } from "@/lib/utils";
import { ETicketStatus } from "@/api/tickets/tickets.types";

type Props = {
  isCompact?: boolean;
  defaultStatus?: ETicketStatus
}

const CreateTicketButton = ({isCompact = false, defaultStatus}: Props) => {
  const {closeModal, isOpen, openModal} = useOpenModal(
    OPEN_CREATE_TICKET_MODAL_KEY + `${defaultStatus ? `-${defaultStatus.toLowerCase()}`: ""}`
  );

  const projectId = useProjectId();

  const {data: features, isLoading: isFeaturesLoading, error: featureError} = useGetFeatures(projectId);
  const {
    data: contributors,
    isLoading: isContributorLoading,
    error: contributorError
  } = useGetProjectContributors({id: projectId});

  if (featureError || contributorError) {
    toast.error(featureError?.message ?? contributorError?.message);
    return null;
  }
  if (isContributorLoading || isFeaturesLoading || !features || !contributors) {
    return <LoadingComponent/>;
  }

  return <>
    <ResponsiveModal open={isOpen} onOpenChange={closeModal}>
      <CreateTicketForm onCancel={closeModal} features={features} contributors={contributors}
                        defaultStatus={defaultStatus}/>
    </ResponsiveModal>


    <Button variant={isCompact ? "ghost" : "primary"}
            className={cn(isCompact && "p-0")}
            onClick={openModal}>
      <PlusIcon/>
      {!isCompact && "New"}
    </Button>
  </>;
};

export default CreateTicketButton;