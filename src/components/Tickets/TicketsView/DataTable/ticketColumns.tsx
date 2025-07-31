"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TTicket } from "@/api/tickets/tickets.types";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreVertical } from "lucide-react";
import { TicketViewDueHeader } from "@/components/Tickets/TicketsView/DataTable/date/TicketViewDueHeader";
import {
  TicketViewContributorHover
} from "@/components/Tickets/TicketsView/DataTable/contributors/TicketViewContributorHover";
import { TicketViewFeatureHover } from "@/components/Tickets/TicketsView/DataTable/feature/TicketViewFeature";
import {
  TicketPriority,
  TicketStatus,
  TicketType
} from "@/components/Tickets/TicketsView/DataTable/enums/TicketViewEnums";
import { TicketRowContextMenu } from "@/components/Tickets/TicketsView/TicketRowContextMenu";


export const ticketColumns: ColumnDef<TTicket>[] = [
  {
    accessorKey: "title",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      );
    },
    cell: ({row}) =>
        <div className="flex items-center justify-between">
          <p className="flex line-clamp-1">{row.original.title}</p>
          <TicketRowContextMenu id={row.original.id} featureId={row.original.featureId}>
            <Button variant="ghost" className="ml-2"><MoreVertical className="size-4 p-0"/></Button>
          </TicketRowContextMenu>
        </div>
  },

  {
    accessorKey: "dueAt",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Due At
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      );
    },
    cell: ({row}) => {
      const dueAt = row.original.dueAt;
      console.log(row.original);
      if (!dueAt) return <span className="text-muted-foreground italic">No due date</span>;
      return <TicketViewDueHeader date={dueAt}/>;
    }
  },
  {
    accessorKey: "assignedContributor",
    header: "Assigned To",
    cell: ({row}) => {
      const assignedContributor = row.original.assignedContributor;
      if (!assignedContributor) return <span className="text-muted-foreground italic">Unassigned</span>;
      return <TicketViewContributorHover user={assignedContributor}/>;
    }
  },
  {
    accessorKey: "ticketStatus",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      );
    },
    cell: ({row}) =>
      <TicketStatus status={row.original.ticketStatus}/>
  },
  {
    accessorKey: "ticketPriority",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Priority
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      );
    },
    cell: ({row}) =>
      <TicketPriority priority={row.original.ticketPriority}/>
  },
  {
    accessorKey: "ticketType",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      );
    },
    cell: ({row}) =>
      <TicketType type={row.original.ticketType}/>
  },
  {
    accessorKey: "verifiedBy",
    header: "Verified By",
    cell: ({row}) => {
      const verifier = row.original.verifiedBy;
      if (!verifier) return <span className="text-muted-foreground italic">Unverified</span>;
      return <TicketViewContributorHover user={verifier}/>;
    }
  },
  {
    accessorKey: "creator",
    header: "Created By",
    cell: ({row}) =>
      <TicketViewContributorHover user={row.original.creator}/>
  },
  // {
  //   accessorKey: "description",
  //   header: "",
  //   cell: ({row}) => ""
  // },
  {
    accessorKey: "feature",
    header: "Feature",
    cell: ({row}) =>
      <TicketViewFeatureHover feature={row.original.feature}/>
  }
];

