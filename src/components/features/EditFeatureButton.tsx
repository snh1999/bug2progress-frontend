import { PenIcon } from "lucide-react";
import { useFeatureId } from "@/hooks/useFeatureId";
import { Button } from "@/components/ui/button";
import { useOpenModal } from "@/hooks/useModalHook";
import { OPEN_UPDATE_FEATURE_MODAL_KEY } from "@/app.constants";
import { ResponsiveModal } from "@/components/common/ResponsiveModal";
import { UpdateFeatureForm } from "@/components/features/UpdateFeatureForm/UpdateFeatureForm";
import { useGetFeature } from "@/api/features/features";
import { useProjectId } from "@/hooks/useProjectId";
import { toast } from "sonner";
import LoadingComponent from "@/components/common/LoadingComponent";

const EditFeatureButton = () => {
  const featureId = useFeatureId();
  const projectId = useProjectId();

  const {closeModal, isOpen, openModal} = useOpenModal(
    OPEN_UPDATE_FEATURE_MODAL_KEY
  );

  const {data, isLoading, error} = useGetFeature(projectId, featureId);

  if (error) {
    toast.error(error.message);
    return;
  }

  if (!data || isLoading) {
    return <LoadingComponent/>;
  }

  return <>
    <ResponsiveModal open={isOpen} onOpenChange={closeModal}>
      <UpdateFeatureForm defaultValues={data} onCancel={closeModal}/>
    </ResponsiveModal>

    <Button onClick={openModal} variant="outline">
      <PenIcon/> Edit
    </Button>
  </>;
};
export default EditFeatureButton;