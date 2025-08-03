import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/common/form/FormComponent/FormInput";
import { FormSelect } from "@/components/common/form/FormComponent/FormSelect";
import LoadingComponent from "@/components/common/LoadingComponent";
import { TFeature } from "@/api/features/features.types";
import { convertSnakeCaseToTitleCase } from "@/lib/utils";
import {
  ETicketPriority,
  ETicketStatus,
  ETicketType,
  TUpdateTicketDto,
} from "@/api/tickets/tickets.types";
import { FormInputWrapper } from "@/components/common/form/FormComponent/FormInputWrapper";
import { DatePicker } from "@/components/common/DatePicker";
import { TProjectContributorWithUser } from "@/api/projects/projects.types";
import { useUpdateTicketForm } from "@/components/Tickets/UpdateTicketForm/UpdateTicketForm.hooks";

interface UpdateProjectFormProps {
  onCancel?: () => void;
  onDelete?: () => void;
  defaultValues: TUpdateTicketDto;
  contributors?: TProjectContributorWithUser[];
  features?: TFeature[];
}

export const UpdateTicketForm = ({
  onCancel,
  onDelete,
  defaultValues,
  contributors = [],
  features = [],
}: UpdateProjectFormProps) => {
  const { form, onSubmit, isPending } = useUpdateTicketForm({
    defaultValues,
    onSuccess: onCancel,
  });

  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = form;

  if (isPending) {
    return <LoadingComponent />;
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="h-full border-none shadow-none m-5">
          <CardHeader className="flex flex-row justify-between items-center p-5">
            <CardTitle className="span text-2xl pl-2 ">
              {defaultValues.title}
            </CardTitle>
            <Button type="submit" disabled={isPending || !isDirty}>
              Update
            </Button>
          </CardHeader>
          <CardContent className="w-full p-7">
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
              placeholder={
                contributors.length === 0
                  ? "No contributors available"
                  : "Assign the ticket to a contributor"
              }
              control={control}
              disabled={contributors.length === 0}
              options={contributors.map((contributor) => ({
                value: contributor.user.id,
                label: `${contributor.user.profile.name} - @${contributor.user.profile.username}`,
              }))}
            />

            <FormInputWrapper
              name="dueAt"
              label="Due Date"
              control={control}
              InputComponent={DatePicker}
            />

            <FormInput
              name="description"
              label="Description"
              control={control}
              placeholder="Description for the feature"
              textarea
              required
            />
          </CardContent>
          {onDelete && (
            <CardContent className="w-full p-7 pt-0 space-y-5 gap-3">
              <div className="flex items-center justify-between">
                <CardDescription className="text-lg text-foreground">
                  This operation will delete the feature and all associated data
                </CardDescription>
                <Button
                  className="ml-1"
                  variant="destructive"
                  type="button"
                  onClick={onDelete}
                >
                  Delete Project
                </Button>
              </div>
            </CardContent>
          )}
        </Card>
      </form>
    </Form>
  );
};
