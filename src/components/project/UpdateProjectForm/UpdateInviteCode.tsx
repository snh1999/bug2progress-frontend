import { FormInput } from "@/components/common/form/FormComponent/FormInput";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/lib/utils";
import { CopyIcon } from "lucide-react";
import { RxReload } from "react-icons/rx";
import { UseFormReturn } from "react-hook-form";
import { TUpdateProjectDto } from "@/api/projects/projects.types";
import { useUpdateProject } from "@/api/projects/projects";
import LoadingComponent from "@/components/common/LoadingComponent";
import { toast } from "sonner";

type TUpdateProjectForm = {
  form: UseFormReturn<TUpdateProjectDto, any, TUpdateProjectDto>;
  id: string
};

const UpdateInviteCode = ({form, id}: TUpdateProjectForm) => {
  const {control, getValues, setValue} = form;
  const {mutate, isPending: isCodeUpdatePending} = useUpdateProject();

  const handleCopyInviteCode = () => {
    copyToClipboard(getValues("inviteCode") ?? "");
  };

  const handleResetInviteCode = () => {
    mutate({
      id,
      updateInviteCode: true,
    }, {
      onSuccess: (data) => {
        console.log(data);
        setValue("inviteCode", data.inviteCode);
        toast.success("Invite code updated");
      },
      onError: () =>
        toast.error("Failed to update invite code")
    });
  };

  if (isCodeUpdatePending) {
    return <LoadingComponent/>;
  }
  return <div className="flex items-end w-full justify-between gap-2">
    <div className="w-10/12">
      <FormInput
        name="inviteCode"
        label="Invite code"
        control={control}
        placeholder="Invite code for new members"
        required
        disabled
      />
    </div>
    <Button
      size="sm"
      variant="outline"
      type="button"
      className="mb-2"
      onClick={handleCopyInviteCode}
    >
      <CopyIcon/> Copy
    </Button>
    <Button
      size="sm"
      variant="destructive"
      type="button"
      className="mb-2"
      onClick={handleResetInviteCode}
    >
      <RxReload/> Reset Code
    </Button>
  </div>;
};

export default UpdateInviteCode;