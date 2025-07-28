import { useOpenModal } from "@/hooks/useModalHook";
import { OPEN_CREATE_TICKET_MODAL_KEY } from "@/app.constants";
import { ResponsiveModal } from "@/components/common/ResponsiveModal";
import { Button } from "@/components/ui/button";
import { CreateTicketForm } from "@/components/Tickets/CreateTicketForm/CreateTicketForm";
import { PlusIcon } from "lucide-react";
import { useGetFeatures } from "@/api/features/features";
import { useProjectId } from "@/hooks/useProjectId";
import { useFeatureId } from "@/hooks/useFeatureId";
import { useGetProjectContributors } from "@/api/projects/projectContributors";

const CreateTicketButton = () => {
  const {closeModal, isOpen, openModal} = useOpenModal(
    OPEN_CREATE_TICKET_MODAL_KEY
  );

  const projectId = useProjectId();
  const featureId = useFeatureId();

  const {data: features} = useGetFeatures(projectId);
  const {data: contributors} = useGetProjectContributors({id: projectId});

  return <>
    <ResponsiveModal open={isOpen} onOpenChange={closeModal}>
      <CreateTicketForm onCancel={closeModal} features={features} contributors={contributors}/>
    </ResponsiveModal>


    <Button  onClick={openModal} variant="primary">
      <PlusIcon />
      New
    </Button>
  </>;
}

export default CreateTicketButton