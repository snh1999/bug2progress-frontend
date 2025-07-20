import { z } from "zod";
import { ProjectStatus, TProject, TUpdateProjectDto, } from "@/api/projects/projects.types";
import { useUpdateProject } from "@/api/projects/projects";
import { useFormHooksWrapper } from "@/components/common/form/FormHooksWrapper";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PROJECTS_PATH } from "@/app.constants";

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
