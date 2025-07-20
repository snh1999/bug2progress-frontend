import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/common/form/FormComponent/FormInput";
import { FormSelect } from "@/components/common/form/FormComponent/FormSelect";
import { ProjectStatus, TUpdateProjectDto, } from "@/api/projects/projects.types";
import { useUpdateProjectForm } from "@/components/project/UpdateProjectForm/UpdateProjectForm.hooks";
import LoadingComponent from "@/components/common/LoadingComponent";
import UpdateInviteCode from "@/components/project/UpdateProjectForm/UpdateInviteCode";

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
        <Card className="h-full border-none shadow-none m-5">
          <CardHeader className="flex flex-row justify-between items-center p-5">
            <CardTitle className="span text-2xl pl-2 ">
              {initialValues.title}
            </CardTitle>
            <Button type="submit" disabled={isPending || !isDirty}>
              Update
            </Button>
          </CardHeader>
          <CardContent className="w-full p-7 space-y-5">
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
              options={Object.values(ProjectStatus)}
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

        <Card className="h-full border-none shadow-none m-5">
          <CardHeader className="flex flex-col space-y-1.5 p-6">
            <CardTitle className="text-2xl">Danger Zone</CardTitle>
            <CardDescription className="text-muted-foreground text-lg">
              This actions in this section are irreversible. Proceed with
              caution.
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full p-7 pt-0 space-y-5">
            <div className="flex items-center justify-between">
              <CardDescription className="text-lg text-foreground">
                You will give up access and ownership of this project.
              </CardDescription>
              <Button size="lg" variant="destructive" type="button" disabled>
                Update Owner
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <CardDescription className="text-lg text-foreground">
                This operation will delete the project and all of its associated
                data.
              </CardDescription>
              <Button
                size="lg"
                variant="destructive"
                type="button"
                onClick={onDelete}
              >
                Delete Project
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};
