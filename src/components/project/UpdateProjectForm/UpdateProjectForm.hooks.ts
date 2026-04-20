import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { useUpdateProject } from "@/api/projects/projects";
import {
  ProjectStatus,
  type TProject,
  type TUpdateProjectDto,
} from "@/api/projects/projects.types";
import { PROJECTS_PATH } from "@/app.constants";
import { useFormHooksWrapper } from "@/components/common/form/FormHooksWrapper";

const updateProjectFormSchema: z.ZodType<TUpdateProjectDto> = z.object({
  id: z.string(),
  title: z.string(),
  urlid: z.string().optional(),
  ownerId: z.string(),
  summary: z.string(),
  isPublic: z.boolean().optional(),
  status: z.nativeEnum(ProjectStatus),
  slug: z.string().optional(),
  inviteCode: z.string(),
});

export const useUpdateProjectForm = (defaultValues: TUpdateProjectDto) => {
  const router = useRouter();
  return useFormHooksWrapper<TUpdateProjectDto, TProject>({
    formSchema: updateProjectFormSchema,
    useFormMutation: useUpdateProject,
    defaultValues: {
      ...defaultValues,
      urlid: defaultValues.urlid ?? "",
    },
    onSuccess: (data) => {
      router.push(data ? `${PROJECTS_PATH}/${data.id}` : `/`);
      toast.success("Project updated");
    },
  });
};
