import React, { useCallback, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable, type DropResult, } from "@hello-pangea/dnd";
import { ETicketStatus, TTicket, UpdateTicketPositionData } from "@/api/tickets/tickets.types";
import { toast } from "sonner";
import { KanbanHeader } from "@/components/Tickets/TicketsView/kanbanView/KanbanHeader";
import { KanbanCard } from "@/components/Tickets/TicketsView/kanbanView/KanbanCard";


const boards: ETicketStatus[] = Object.values(ETicketStatus);

type TicketStatus = {
  [key in ETicketStatus]: TTicket[];
};

const getInitialTicketValues = (): TicketStatus => {
  return Object.values(ETicketStatus).reduce((acc, status) => {
    acc[status] = [];
    return acc;
  }, {} as TicketStatus);
};


interface DataKanbanProps {
  data: TTicket[];
  onChange: (data: UpdateTicketPositionData[]) => void;
}

export const KanbanView = ({
  data,
  onChange,
}: DataKanbanProps) => {
  const [tickets, setTickets] = useState<TicketStatus>(() => {
    const initialTickets: TicketStatus = getInitialTicketValues();

    data.forEach((ticket) => {
      initialTickets[ticket.ticketStatus].push(ticket);
    });

    Object.keys(initialTickets).forEach((status) => {
      initialTickets[status as ETicketStatus].sort((a, b) => a.position - b.position);
    });

    return initialTickets;
  });

  useEffect(() => {
    const newTickets: TicketStatus = getInitialTicketValues();

    data.forEach((ticket) => {
      newTickets[ticket.ticketStatus].push(ticket);
    });

    Object.keys(newTickets).forEach((status) => {
      newTickets[status as ETicketStatus].sort((a, b) => a.position - b.position);
    });

    setTickets(newTickets);
  }, [data]);

  const onDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;

    const {source, destination} = result;
    const sourceStatus = source.droppableId as ETicketStatus;
    const destStatus = destination.droppableId as ETicketStatus;

    let updatesPayload: UpdateTicketPositionData[] = [];

    setTickets((prevTickets) => {
      const newTicket = {...prevTickets};

      const sourceColumn = [...newTicket[sourceStatus]];
      const [movedTicket] = sourceColumn.splice(source.index, 1);

      if (!movedTicket) {
        toast.error("No Ticket found at the source index");
        return prevTickets;
      }

      const updatedMovedTicket = sourceStatus !== destStatus
        ? {...movedTicket, status: destStatus}
        : movedTicket;

      newTicket[sourceStatus] = sourceColumn;

      const destColumn = [...newTicket[destStatus]];
      destColumn.splice(destination.index, 0, updatedMovedTicket);
      newTicket[destStatus] = destColumn;

      updatesPayload = [];

      updatesPayload.push({
        id: updatedMovedTicket.id,
        ticketStatus: destStatus,
        position: Math.min((destination.index + 1) * 1000, 1_000_000)
      });

      newTicket[destStatus].forEach((ticket, index) => {
        if (ticket && ticket.id !== updatedMovedTicket.id) {
          const newPosition = Math.min((index + 1) * 1000, 1_000_000);
          if (ticket.position !== newPosition) {
            updatesPayload.push({
              id: ticket.id,
              ticketStatus: destStatus,
              position: newPosition,
            });
          }
        }
      });

      if (sourceStatus !== destStatus) {
        newTicket[sourceStatus].forEach((ticket, index) => {
          if (ticket) {
            const newPosition = Math.min((index + 1) * 1000, 1_000_000);
            if (ticket.position !== newPosition) {
              updatesPayload.push({
                id: ticket.id,
                ticketStatus: sourceStatus,
                position: newPosition,
              });
            }
          }
        });
      }

      return newTicket;
    });
    onChange(updatesPayload);
  }, [onChange]);


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex overflow-x-auto">
        {boards.map((board) => {
          return (
            <div key={board} className="flex-1 mx-2 bg-muted p-1.5 rounded-md min-w-[200px]">
              <KanbanHeader board={board} taskCount={tickets[board].length}/>
              <Droppable droppableId={board}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="min-h-[200px] py-1.5"
                  >
                    {tickets[board].map((ticket, index) => (
                      <Draggable
                        key={ticket.id}
                        draggableId={ticket.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <KanbanCard ticket={ticket}/>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};


