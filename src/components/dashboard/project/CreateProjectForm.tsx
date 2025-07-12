import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/common/FormComponent/FormInput";
import { useCreateProjectForm } from "@/components/dashboard/project/CreateProjectForm.hooks";
import { FormSelect } from "@/components/common/FormComponent/FormSelect";
import { ProjectStatus } from "@/api/projects/projects.types";

interface CreateProjectFormProps {
  onCancel?: () => void;
}

export const CreateProjectForm = ({onCancel}: CreateProjectFormProps) => {
  const {form, onSubmit, isPending} = useCreateProjectForm();
  const {control, handleSubmit} = form;

  return (
      <Card className=" h-full border-none shadow-none m-5">
        <CardHeader className="flex items-center justify-center text-center p-5">
          <CardTitle className="text-2xl">Create a New Project</CardTitle>

          <CardContent className="w-full p-7">
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

                <FormInput
                  name="postContent"
                  label="Description"
                  control={control}
                  placeholder="Description for project"
                  textarea
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
        </CardHeader>
      </Card>
  );
};
