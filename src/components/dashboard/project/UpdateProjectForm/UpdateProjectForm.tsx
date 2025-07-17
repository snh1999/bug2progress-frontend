import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/common/form/FormComponent/FormInput";
import { FormSelect } from "@/components/common/form/FormComponent/FormSelect";
import {
  ProjectStatus,
  TUpdateProjectDto,
} from "@/api/projects/projects.types";
import { useUpdateProjectForm } from "@/components/dashboard/project/UpdateProjectForm/UpdateProjectForm.hooks";
import LoadingComponent from "@/components/common/LoadingComponent";

interface UpdateProjectFormProps {
  initialValues: TUpdateProjectDto;
}

export const UpdateProjectForm = ({
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
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};
