import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { useCreateProject } from "@/api/projects/projects";
import {
  ProjectStatus,
  type TCreateProjectDto,
  type TProject,
} from "@/api/projects/projects.types";
import { PROJECTS_PATH } from "@/app.constants";
import { useFormHooksWrapper } from "@/components/common/form/FormHooksWrapper";

const createProjectFormSchema: z.ZodType<TCreateProjectDto> = z.object({
  title: z.string(),
  urlid: z.string().optional(),
  summary: z.string(),
  organizationId: z.string().optional(),
  isPublic: z.boolean().optional(),
  status: z.nativeEnum(ProjectStatus),
  slug: z.string().optional(),
});

export const useCreateProjectForm = () => {
  const router = useRouter();
  return useFormHooksWrapper<TCreateProjectDto, TProject>({
    formSchema: createProjectFormSchema,
    useFormMutation: useCreateProject,
    defaultValues: {
      title: "",
      summary: "",
      isPublic: false,
      urlid: "",
    },
    onSuccess: (data) => {
      router.push(data ? `${PROJECTS_PATH}/${data.id}` : `/`);
      toast.success("Project created");
    },
  });
};
