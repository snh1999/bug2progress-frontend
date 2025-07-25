import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/common/form/FormComponent/FormInput";
import { FormSelect } from "@/components/common/form/FormComponent/FormSelect";
import LoadingComponent from "@/components/common/LoadingComponent";
import { useUpdateFeatureForm } from "@/components/features/UpdateFeatureForm/UpdateFeatureForm.hooks";
import { FeatureType, TUpdateFeatureDto } from "@/api/features/features.types";

interface UpdateProjectFormProps {
  onCancel?: () => void;
  onDelete: () => void
  defaultValues: TUpdateFeatureDto;
}

export const UpdateFeatureForm = ({
  onCancel,
  onDelete,
  defaultValues,
}: UpdateProjectFormProps) => {
  const {form, onSubmit, isPending} = useUpdateFeatureForm({defaultValues, onSuccess: onCancel});

  const {
    control,
    handleSubmit,
    formState: {isDirty},
  } = form;


  if (isPending) {
    return <LoadingComponent/>;
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="h-full border-none shadow-none m-5">
          <CardHeader className="flex flex-row justify-between items-center p-5">
            <CardTitle className="span text-2xl pl-2 ">
              {defaultValues.title}
            </CardTitle>
            <Button type="submit" disabled={isPending || !isDirty}>
              Update
            </Button>
          </CardHeader>
          <CardContent className="w-full p-7">
            <FormInput
              name="title"
              label="Feature Title"
              control={control}
              required
              placeholder="Enter your name"
            />

            <FormSelect
              name="featureType"
              label="Feature Type"
              placeholder="Select the current type for the feature"
              control={control}
              required
              options={Object.values(FeatureType)}
            />

            <FormInput
              name="description"
              label="Description"
              control={control}
              placeholder="Description for the feature"
              textarea
              required
            />
          </CardContent>
          <CardContent className="w-full p-7 pt-0 space-y-5 gap-3">
            <div className="flex items-center justify-between">
              <CardDescription className="text-lg text-foreground">
                This operation will delete the feature and all associated data
              </CardDescription>
              <Button
                className="ml-1"
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
