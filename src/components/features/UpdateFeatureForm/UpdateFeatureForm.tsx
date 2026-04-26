import {
  FeatureType,
  type TUpdateFeatureDto,
} from "@/api/features/features.types";
import { FormInput } from "@/components/common/form/FormComponent/FormInput";
import { FormSelect } from "@/components/common/form/FormComponent/FormSelect";
import LoadingComponent from "@/components/common/LoadingComponent";
import { useUpdateFeatureForm } from "@/components/features/UpdateFeatureForm/UpdateFeatureForm.hooks";
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
import { Separator } from "@/components/ui/separator";

interface UpdateProjectFormProps {
  onCancel?: () => void;
  onDelete: () => void;
  defaultValues: TUpdateFeatureDto;
}

export const UpdateFeatureForm = ({
  onCancel,
  onDelete,
  defaultValues,
}: UpdateProjectFormProps) => {
  const { form, onSubmit, isPending } = useUpdateFeatureForm({
    defaultValues,
    onSuccess: onCancel,
  });

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
          <CardHeader className="flex flex-row justify-between items-center py-4">
            <CardTitle className="span text-lg pl-2">
              {defaultValues.title}
            </CardTitle>
            <Button type="submit" disabled={isPending || !isDirty}>
              Update
            </Button>
          </CardHeader>
          <CardContent className="w-full space-y-2  px-7">
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
              options={Object.values(FeatureType).map((featureType) => ({
                value: featureType,
                label: convertSnakeCaseToTitleCase(featureType),
              }))}
            />

            <FormInput
              name="description"
              label="Description"
              control={control}
              placeholder="Description for the feature"
              textarea
              required
            />

            <FormInput
              name="process"
              label="Process"
              control={control}
              placeholder="Detailed description for the feature"
              textarea
              required
            />

            <Separator className="mt-6"/>
            <div className="flex items-center justify-between p-2  gap-4">
              <CardDescription className="text-foreground">
                This operation will delete the feature and all associated data
              </CardDescription>
              <Button
                className="ml-1"
                variant="destructive"
                type="button"
                onClick={onDelete}
              >
                Delete Feature
              </Button>
            </div>
          </CardContent>

        </Card>
      </form>
    </Form>
  );
};
