import { toast } from "sonner";
import { z } from "zod";
import { useCreateFeature } from "@/api/features/features";
import {
  FeatureType,
  type TCreateFeatureDto,
  type TFeature,
} from "@/api/features/features.types";
import { useFormHooksWrapper } from "@/components/common/form/FormHooksWrapper";
import { useProjectId } from "@/hooks/useProjectId";

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
