import { z } from "zod";
import { useFormHooksWrapper } from "@/components/common/form/FormHooksWrapper";
import { toast } from "sonner";
import {
  FeatureType,
  TCreateFeatureDto,
  TFeature,
} from "@/api/features/features.types";
import { useProjectId } from "@/hooks/useProjectId";
import { useCreateFeature } from "@/api/features/features";

const createFeatureFormSchema: z.ZodType<TCreateFeatureDto> = z.object({
  title: z.string(),
  description: z.string(),
  featureType: z.nativeEnum(FeatureType),
  projectId: z.string(),
});

export const useCreateFeatureForm = (onSuccess: () => void) => {
  const projectId = useProjectId();
  return useFormHooksWrapper<TCreateFeatureDto, TFeature>({
    formSchema: createFeatureFormSchema,
    useFormMutation: useCreateFeature,
    defaultValues: {
      title: "",
      description: "",
      featureType: FeatureType.ACTIVE,
      projectId,
    },
    onSuccess: () => {
      toast.success("Feature created");
      onSuccess();
    },
  });
};
