import {
  addMonths,
  format,
  getDay,
  parse,
  startOfWeek,
  subMonths,
} from "date-fns";
import { enUS } from "date-fns/locale";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";

import { Button } from "@/components/ui/button";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css";
import type { TTicket } from "@/api/tickets/tickets.types";
import { KanbanCard } from "@/components/Tickets/TicketsView/kanbanView/KanbanCard";
import { useProjectId } from "@/hooks/useProjectId";
import Link from "next/link";
import { PROJECTS_PATH } from "@/app.constants";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface CalendarViewProps {
  data: TTicket[];
}

interface CustomToolbarProps {
  date: Date;
  onNavigate: (action: "PREV" | "NEXT" | "TODAY") => void;
}

const CustomToolbar = ({ date, onNavigate }: CustomToolbarProps) => {
  return (
    <div className="flex mb-4 gap-x-2 items-center w-full lg:w-auto justify-center lg:justify-start">
      <Button
        onClick={() => onNavigate("PREV")}
        variant="secondary"
        size="icon"
      >
        <ChevronLeftIcon className="size-4" />
      </Button>
      <div className="flex items-center border border-input rounded-md px-3 py-2 h-8 justify-center w-full lg:w-auto">
        <CalendarIcon className="size-4 mr-2" />
        <p className="text-sm">{format(date, "MMMM yyyy")}</p>
      </div>
      <Button
        onClick={() => onNavigate("NEXT")}
        variant="secondary"
        size="icon"
      >
        <ChevronRightIcon className="size-4" />
      </Button>
    </div>
  );
};

export const CalendarView = ({ data }: CalendarViewProps) => {
  const [value, setValue] = useState(
    data.length > 0 && data[0].dueAt ? new Date(data[0].dueAt) : new Date(),
  );

  const projectId = useProjectId();

  const events = data
    .filter((ticket) => ticket.dueAt)
    .map((ticket) => ({
      start: new Date(ticket.dueAt!),
      end: new Date(ticket.dueAt!),
      ticket,
    }));

  const handleNavigate = (action: "PREV" | "NEXT" | "TODAY") => {
    if (action === "PREV") {
      setValue(subMonths(value, 1));
    } else if (action === "NEXT") {
      setValue(addMonths(value, 1));
    } else if (action === "TODAY") {
      setValue(new Date());
    }
  };

  return (
    <Calendar
      localizer={localizer}
      date={value}
      events={events}
      views={["month"]}
      defaultView="month"
      toolbar
      showAllEvents
      className="h-full"
      max={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
      formats={{
        weekdayFormat: (date, culture, localizer) =>
          localizer?.format(date, "EEE", culture) ?? "",
      }}
      components={{
        eventWrapper: ({ event: { ticket } }) => (
          <Link href={`${PROJECTS_PATH}/${projectId}/tickets/${ticket.id}`}>
            <KanbanCard ticket={ticket} compact />
          </Link>
        ),
        toolbar: () => (
          <CustomToolbar date={value} onNavigate={handleNavigate} />
        ),
      }}
    />
  );
};
