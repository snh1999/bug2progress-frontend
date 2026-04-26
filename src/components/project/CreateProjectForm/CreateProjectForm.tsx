import { ProjectStatus } from "@/api/projects/projects.types";
import { FormInput } from "@/components/common/form/FormComponent/FormInput";
import { FormSelect } from "@/components/common/form/FormComponent/FormSelect";
import { useCreateProjectForm } from "@/components/project/CreateProjectForm/CreateProjectForm.hooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { convertSnakeCaseToTitleCase } from "@/lib/utils";

interface CreateProjectFormProps {
  onCancel?: () => void;
}

export const CreateProjectForm = ({ onCancel }: CreateProjectFormProps) => {
  const { form, onSubmit, isPending } = useCreateProjectForm();
  const { control, handleSubmit } = form;

  return (
    <Card className="h-full border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center pt-3">
        <CardTitle className="text-lg">Create a New Project</CardTitle>
      </CardHeader>

      <CardContent className="w-full px-8">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button size="lg" onClick={onCancel} variant="secondary">
                Cancel
              </Button>
              <Button size="lg" type="submit" disabled={isPending}>
                Create
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
