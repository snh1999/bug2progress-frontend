import { z } from "zod";
import { ProjectStatus, TCreateProjectDto, TProject, } from "@/api/projects/projects.types";
import { useCreateProject } from "@/api/projects/projects";
import { useFormHooksWrapper } from "@/components/FormHooksWrapper";
import { toast } from "sonner";

const createProjectFormSchema: z.ZodType<TCreateProjectDto> = z.object({
  title: z.string(),
  urlid: z.string().optional(),
  summary: z.string(),
  organizationId: z.string().optional(),
  isPublic: z.boolean().optional(),
  status: z.nativeEnum(ProjectStatus),
  slug: z.string().optional(),
});

export const useCreateProjectForm = () =>
  useFormHooksWrapper<TCreateProjectDto, TProject>({
    formSchema: createProjectFormSchema,
    useFormMutation: useCreateProject,
    defaultValues: {
      title: "",
      summary: "",
      isPublic: false,
    },
    onSuccess: () => toast.success("Project created"),

  });
