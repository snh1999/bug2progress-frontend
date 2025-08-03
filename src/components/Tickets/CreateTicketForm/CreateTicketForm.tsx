import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/common/form/FormComponent/FormInput";
import { FormSelect } from "@/components/common/form/FormComponent/FormSelect";
import { useCreateTicketForm } from "@/components/Tickets/CreateTicketForm/CreateTicketForm.hooks";
import { ETicketPriority, ETicketStatus, ETicketType } from "@/api/tickets/tickets.types";
import { FormInputWrapper } from "@/components/common/form/FormComponent/FormInputWrapper";
import { DatePicker } from "@/components/common/DatePicker";
import { TFeature } from "@/api/features/features.types";
import { TProjectContributorWithUser } from "@/api/projects/projects.types";
import { convertSnakeCaseToTitleCase } from "@/lib/utils";

interface CreateFeatureFormProps {
  onCancel: () => void;
  features: TFeature[];
  contributors: TProjectContributorWithUser[];
  defaultStatus?: ETicketStatus
}

export const CreateTicketForm = ({onCancel, defaultStatus = ETicketStatus.BACKLOG, features = [], contributors = []}: CreateFeatureFormProps) => {
  const {form, onSubmit, isPending} = useCreateTicketForm(defaultStatus, onCancel);
  const {control, handleSubmit} = form;


  return (
    <Card className=" h-full border-none shadow-none m-5">
      <CardHeader className="flex items-center justify-center text-center p-5">
        <CardTitle className="text-2xl">Create a New Ticket</CardTitle>
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

            <FormInput
              name="position"
              label="Position"
              control={control}
              required
              placeholder=""
            />

            <FormSelect
              name="ticketType"
              label="Ticket Type"
              placeholder="Select the current type for the ticket"
              control={control}
              options={Object.values(ETicketType).map((ticketType) => ({
                value: ticketType,
                label: convertSnakeCaseToTitleCase(ticketType),
              }))}
            />

            <FormSelect
              name="ticketPriority"
              label="Ticket Priority"
              placeholder="Select the priority for the ticket"
              control={control}
              options={Object.values(ETicketPriority).map((ticketPriority) => ({
                value: ticketPriority,
                label: convertSnakeCaseToTitleCase(ticketPriority),
              }))}
            />

            <FormSelect
              name="ticketStatus"
              label="Ticket Status"
              placeholder="Select the status for the ticket"
              control={control}
              required
              options={Object.values(ETicketStatus).map((ticketStatus) => ({
                value: ticketStatus,
                label: convertSnakeCaseToTitleCase(ticketStatus),
              }))}
            />

            <FormSelect
              name="featureId"
              label="Feature"
              placeholder="Select the feature related to the ticket"
              control={control}
              required
              disabled={features.length === 0}
              options={features.map((feature) => ({
                value: feature.id,
                label: feature.title,
              }))}
            />

            <FormSelect
              name="assignedContributorId"
              label="Assigned to"
              placeholder={contributors.length === 0 ? "No contributors available" : "Assign the ticket to a contributor"}
              control={control}
              disabled={contributors.length === 0}
              options={contributors.map((contributor) => ({
                value: contributor.user.id,
                label: `${contributor.user.profile.name} - @${contributor.user.profile.username}`,
              }))}
            />

            <FormInputWrapper name="dueAt" label="Due Date" control={control} InputComponent={DatePicker}/>

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
