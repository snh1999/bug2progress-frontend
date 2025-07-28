import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/common/form/FormComponent/FormInput";
import { FormSelect } from "@/components/common/form/FormComponent/FormSelect";
import { useCreateFeatureForm } from "@/components/features/CreateFeatureForm/CreateFeatureForm.hooks";
import { FeatureType } from "@/api/features/features.types";
import { convertSnakeCaseToTitleCase } from "@/lib/utils";

interface CreateFeatureFormProps {
  onCancel: () => void;
}

export const CreateFeatureForm = ({onCancel}: CreateFeatureFormProps) => {
  const {form, onSubmit, isPending} = useCreateFeatureForm(onCancel);
  const {control, handleSubmit} = form;

  return (
      <Card className=" h-full border-none shadow-none m-5" >
        <CardHeader className="flex items-center justify-center text-center p-5" >
          <CardTitle className="text-2xl">Create a New Feature</CardTitle>
        </CardHeader>

          <CardContent className="w-full p-7">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
