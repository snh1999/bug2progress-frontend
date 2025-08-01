"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TTicket } from "@/api/tickets/tickets.types";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";


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
        <TicketRowContextMenu id={row.original.id}/>
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
    cell: ({row}) => <TicketViewDueHeader date={row.original.dueAt}/>

  },
  {
    accessorKey: "assignedContributor",
    header: "Assigned To",
    cell: ({row}) => <TicketViewContributorHover contributor={row.original.assignedContributor}/>
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
    cell: ({row}) => {
      const ticketPriority = row.original.ticketPriority;
      if (!ticketPriority)
        return <Badge className="bg-gray-500 text-gray-200 rounded-full">Not set</Badge>;
      return <TicketPriority priority={ticketPriority}/>;
    }
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
    cell: ({row}) => {
      const ticketType = row.original.ticketType;
      if (!ticketType)
        return <Badge className="bg-gray-500 text-gray-200 rounded-full">Not set</Badge>;
      return <TicketType type={row.original.ticketType}/>;
    }
  },
  {
    accessorKey: "verifiedBy",
    header: "Verified By",
    cell: ({row}) => {
      const verifier = row.original.verifiedBy;
      if (!verifier) return <span className="text-muted-foreground italic">Unverified</span>;
      return <TicketViewContributorHover contributor={verifier}/>;
    }
  },
  {
    accessorKey: "creator",
    header: "Created By",
    cell: ({row}) =>
      <TicketViewContributorHover contributor={row.original.creator}/>
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

