import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import AdminTables from "./AdminTables";
import { useGetAdminTickets } from "@/api/admin/admin";

const ticketColumns: ColumnDef<any>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "ticketStatus",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline">{row.original.ticketStatus}</Badge>
    ),
  },
  {
    accessorKey: "ticketPriority",
    header: "Priority",
    cell: ({ row }) => (
      <Badge variant="outline">{row.original.ticketPriority}</Badge>
    ),
  },
  {
    accessorKey: "ticketType",
    header: "Type",
    cell: ({ row }) => row.original.ticketType,
  },
  {
    accessorKey: "project.title",
    header: "Project",
    cell: ({ row }) => row.original.project?.title,
  },
  {
    accessorKey: "creator.profile.username",
    header: "Creator",
    cell: ({ row }) => row.original.creator?.profile?.username,
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
];

export default function TicketsTable() {
  const { data: tickets, isLoading } = useGetAdminTickets();

  return (
    <>
      <AdminTables
        columns={ticketColumns}
        isLoading={isLoading}
        data={tickets || []}
      />
    </>
  );
}
