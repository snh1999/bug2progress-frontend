import { z } from "zod";
import { useFormHooksWrapper } from "@/components/common/form/FormHooksWrapper";
import { toast } from "sonner";
import { FeatureType, TFeature, TUpdateFeatureDto } from "@/api/features/features.types";
import { useUpdateFeature } from "@/api/features/features";

const updateFeatureFormSchema: z.ZodType<TUpdateFeatureDto> = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  featureType: z.nativeEnum(FeatureType),
  projectId: z.string(),
});

export const useUpdateFeatureForm = ({defaultValues, onSuccess}: {
  defaultValues: TUpdateFeatureDto,
  onSuccess?: () => void
}) => {
  return useFormHooksWrapper<TUpdateFeatureDto, TFeature>({
    formSchema: updateFeatureFormSchema,
    useFormMutation: useUpdateFeature,
    defaultValues: {
      ...defaultValues,
    },
    onSuccess: (data) => {
      toast.success("Feature updated");
      if(onSuccess) onSuccess();
    },
  });
};
