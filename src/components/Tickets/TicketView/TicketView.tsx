import { PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";


import { ReactNode } from "react";
import { TTicket } from "@/api/tickets/tickets.types";
import { Separator } from "@/components/ui/separator";
import {
  TicketViewContributorHover
} from "@/components/Tickets/TicketsView/DataTable/contributors/TicketViewContributorHover";
import { useOpenModal } from "@/hooks/useModalHook";
import { OPEN_UPDATE_TICKET_MODAL_KEY } from "@/app.constants";
import { ResponsiveModal } from "@/components/common/ResponsiveModal";
import { UpdateTicketForm } from "@/components/Tickets/UpdateTicketForm/UpdateTicketForm";
import { useGetTicket } from "@/api/tickets/tickets";
import { toast } from "sonner";
import LoadingComponent from "@/components/common/LoadingComponent";
import { TicketViewDueHeader } from "@/components/Tickets/TicketsView/DataTable/date/TicketViewDueHeader";
import {
  TicketPriority,
  TicketStatus,
  TicketType
} from "@/components/Tickets/TicketsView/DataTable/enums/TicketViewEnums";


interface OverviewPropertyProps {
  label: string;
  children: ReactNode;
}

const OverviewProperty = ({
  label,
  children
}: OverviewPropertyProps) => {
  return (
    <div className="flex items-center gap-x-5">
      <div className="min-w-[150px]">
        <p className="text-sm text-muted-foreground">
          {label}
        </p>
      </div>
      <div className="flex items-center gap-x-2">
        {children}
      </div>
    </div>
  );
};

interface Props {
  ticket: TTicket;
}


export const TicketOverview = ({
  ticket
}: Props) => {

  const {data, isLoading, error} = useGetTicket({id: ticket.id, projectId: ticket.projectId});

  const {closeModal, isOpen, openModal} = useOpenModal(
    OPEN_UPDATE_TICKET_MODAL_KEY
  );

  if (error) {
    toast.error(error.message);
    return;
  }

  if (!data || isLoading) {
    return <LoadingComponent/>;
  }
  return (
    <>
      <div className="flex flex-col gap-y-4 col-span-1">
        <ResponsiveModal open={isOpen} onOpenChange={closeModal}>
          <UpdateTicketForm
            defaultValues={data}
            onCancel={closeModal}
          />
        </ResponsiveModal>
        <div className="bg-white dark:bg-black rounded-lg p-4">
          <div className=" flex items-center justify-between">
            <p className="text-lg font-semibold">Overview</p>
            <Button onClick={openModal} size="sm" variant="secondary">
              <PencilIcon className="size-4 mr-2"/>
              Edit
            </Button>
          </div>
          <Separator className="my-4"/>
          <div className="flex flex-col gap-y-4">
            <OverviewProperty label="Assigned Contributor">
              <TicketViewContributorHover contributor={ticket.assignedContributor}/>
            </OverviewProperty>
            <OverviewProperty label="Due Date">
              <span className="pl-3"><TicketViewDueHeader date={ticket.dueAt}/></span>
            </OverviewProperty>
            <OverviewProperty label="Verified by">
              <TicketViewContributorHover contributor={ticket.verifiedBy} altText="Not verified"/>
            </OverviewProperty>
            <OverviewProperty label="Created by">
              <TicketViewContributorHover contributor={ticket.creator}/>
            </OverviewProperty>
            <OverviewProperty label="Tags">
              <div className="flex gap-2 pl-2">
                <TicketStatus status={ticket.ticketStatus}/>
                {ticket.ticketPriority &&<TicketPriority priority={ticket.ticketPriority}/>}
                {ticket.ticketType &&<TicketType type={ticket.ticketType}/>}
              </div>
            </OverviewProperty>
          </div>
        </div>
      </div>
    </>

  );
};

