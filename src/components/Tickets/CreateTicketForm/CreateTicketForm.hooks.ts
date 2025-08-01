import { z } from "zod";
import { useFormHooksWrapper } from "@/components/common/form/FormHooksWrapper";
import { toast } from "sonner";
import { useProjectId } from "@/hooks/useProjectId";
import {
  ETicketPriority,
  ETicketStatus,
  ETicketType,
  TCreateTicketDto,
  TTicket,
} from "@/api/tickets/tickets.types";
import { useCreateTicket } from "@/api/tickets/tickets";
import { useFeatureId } from "@/hooks/useFeatureId";

const createTicketFormSchema: z.ZodType<TCreateTicketDto> = z.object({
  title: z.string(),
  description: z.string(),
  projectId: z.string(),
  featureId: z.string(),
  ticketType: z.nativeEnum(ETicketType).optional(),
  ticketPriority: z.nativeEnum(ETicketPriority).optional(),
  ticketStatus: z.nativeEnum(ETicketStatus),
  position: z.number(),
  dueAt: z.date().optional(),
});

export const useCreateTicketForm = (
  defaultStatus: ETicketStatus,
  onSuccess: () => void,
  position: number = 0
) => {
  const projectId = useProjectId();
  const featureId = useFeatureId();
  return useFormHooksWrapper<TCreateTicketDto, TTicket>({
    formSchema: createTicketFormSchema,
    useFormMutation: useCreateTicket,
    defaultValues: {
      title: "",
      description: "",
      assignedContributorId: "",
      ticketStatus: defaultStatus,
      position,
      projectId,
      featureId,
    },
    onSuccess: () => {
      toast.success("Ticket created");
      onSuccess();
    },
  });
};
