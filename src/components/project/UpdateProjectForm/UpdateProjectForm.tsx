import {
  ProjectStatus,
  type TUpdateProjectDto,
} from "@/api/projects/projects.types";
import { FormInput } from "@/components/common/form/FormComponent/FormInput";
import { FormSelect } from "@/components/common/form/FormComponent/FormSelect";
import LoadingComponent from "@/components/common/LoadingComponent";
import UpdateInviteCode from "@/components/project/UpdateProjectForm/UpdateInviteCode";
import { useUpdateProjectForm } from "@/components/project/UpdateProjectForm/UpdateProjectForm.hooks";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { convertSnakeCaseToTitleCase } from "@/lib/utils";

interface UpdateProjectFormProps {
  onDelete: () => void;
  initialValues: TUpdateProjectDto;
}

export const UpdateProjectForm = ({
  onDelete,
  initialValues,
}: UpdateProjectFormProps) => {
  const { form, onSubmit, isPending } = useUpdateProjectForm(initialValues);
  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = form;

  if (isPending) {
    return <LoadingComponent />;
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="h-full border-none shadow-none">
          <CardHeader className="flex flex-row justify-between items-center pt-3">
            <CardTitle className="span text-lg pl-2 ">
              {initialValues.title}
            </CardTitle>
            <Button type="submit" disabled={isPending || !isDirty}>
              Update
            </Button>
          </CardHeader>
          <CardContent className="w-full p-4 px-7 space-y-5">
            <FormInput
              name="title"
              label="Project Title"
              control={control}
              required
              placeholder="Enter your name"
            />

            <FormInput
              name="urlid"
              label="Project URL"
              control={control}
              placeholder="Add a custom URL for your project"
            />

            <FormSelect
              name="status"
              label="Project Status"
              placeholder="Select the current project status"
              control={control}
              required
              options={Object.values(ProjectStatus).map((status) => ({
                value: status,
                label: convertSnakeCaseToTitleCase(status),
              }))}
            />

            <FormInput
              name="summary"
              label="Summary"
              control={control}
              placeholder="Short Summary for your project"
              textarea
              required
            />

            <UpdateInviteCode form={form} id={initialValues.id} />
          </CardContent>
        </Card>

        <Card className="h-full border-none shadow-none mt-5 px-6">
          <CardHeader className="flex flex-col">
            <CardTitle className="text-lg">Danger Zone</CardTitle>
            <CardDescription className="text-muted-foreground text-xs">
              This actions in this section are irreversible. Proceed with
              caution.
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full pt-0 space-y-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-sm text-foreground">
                You will give up access and ownership of this project.
              </CardDescription>
              <Button variant="destructive" type="button" disabled>
                Update Owner
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <CardDescription className="text-sm text-foreground">
                This operation will delete the project and all of its associated
                data.
              </CardDescription>
              <Button variant="destructive" type="button" onClick={onDelete}>
                Delete Project
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};
