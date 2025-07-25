import { PenIcon } from "lucide-react";
import { useFeatureId } from "@/hooks/useFeatureId";
import { Button } from "@/components/ui/button";
import { useOpenModal } from "@/hooks/useModalHook";
import { OPEN_UPDATE_FEATURE_MODAL_KEY } from "@/app.constants";
import { ResponsiveModal } from "@/components/common/ResponsiveModal";
import { UpdateFeatureForm } from "@/components/features/UpdateFeatureForm/UpdateFeatureForm";
import { useDeleteFeature, useGetFeature } from "@/api/features/features";
import { useProjectId } from "@/hooks/useProjectId";
import { toast } from "sonner";
import LoadingComponent from "@/components/common/LoadingComponent";
import { useConfirm } from "@/hooks/useConfirm";

const EditFeatureButton = () => {
  const featureId = useFeatureId();
  const projectId = useProjectId();

  const {closeModal, isOpen, openModal} = useOpenModal(
    OPEN_UPDATE_FEATURE_MODAL_KEY
  );

  const {data, isLoading, error} = useGetFeature(projectId, featureId);

  const {mutate: deleteFeature, isPending: isDeletePending} = useDeleteFeature()

  const [DeleteConfirmation, deleteConfirmation] = useConfirm({
    title: "Remove feature?",
    message: "Are you sure you want to remove this feature?",
    variant: "destructive",
    onConfirm: () => {
      deleteFeature({projectId, id: featureId});
      closeModal()
    },
  });

  if (error) {
    toast.error(error.message);
    return;
  }

  if (!data || isLoading || isDeletePending) {
    return <LoadingComponent/>;
  }

  return <>
    <DeleteConfirmation/>

    <ResponsiveModal open={isOpen} onOpenChange={closeModal}>
      <UpdateFeatureForm defaultValues={data} onCancel={closeModal} onDelete={deleteConfirmation}/>
    </ResponsiveModal>


    <Button onClick={openModal} variant="outline">
      <PenIcon/> Edit
    </Button>
  </>;
};
export default EditFeatureButton;