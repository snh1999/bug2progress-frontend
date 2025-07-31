import { z } from "zod";
import { useFormHooksWrapper } from "@/components/common/form/FormHooksWrapper";
import { toast } from "sonner";
import { ETicketPriority, ETicketStatus, ETicketType, TTicket, TUpdateTicketDto } from "@/api/tickets/tickets.types";
import { useUpdateTicket } from "@/api/tickets/tickets";

const updateTicketFormSchema: z.ZodType<TUpdateTicketDto> = z.object({
  id: z.string(),
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

export const useUpdateTicketForm = ({defaultValues, onSuccess}: {
  defaultValues: TUpdateTicketDto,
  onSuccess?: () => void
}) => {
  const {ticketType, ticketPriority, dueAt} = defaultValues
  return useFormHooksWrapper<TUpdateTicketDto, TTicket>({
    formSchema: updateTicketFormSchema,
    useFormMutation: useUpdateTicket,
    defaultValues: {
      ...defaultValues,
      ticketType: ticketType ?? undefined,
      ticketPriority: ticketPriority ?? undefined,
      dueAt: dueAt ? new Date(dueAt) : undefined
    },
    onSuccess: () => {
      toast.success("Ticket updated");
      if(onSuccess) onSuccess();
    },
  });
};
