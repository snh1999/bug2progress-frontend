import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import AdminTables from "./AdminTables";
import { useGetAdminProjects } from "@/api/admin/admin";
import { AdminProject } from "@/api/admin/admin.types";

const projectColumns: ColumnDef<AdminProject>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "urlid",
    header: "URL ID",
  },
  {
    accessorKey: "owner.profile.username",
    header: "Owner",
    cell: ({ row }) => row.original.owner?.profile?.username,
  },
  {
    accessorKey: "organization.name",
    header: "Organization",
    cell: ({ row }) => row.original.organization?.name,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <Badge variant="outline">{row.original.status}</Badge>,
  },
  {
    accessorKey: "_count.ticket",
    header: "Tickets",
  },
  {
    accessorKey: "_count.members",
    header: "Members",
  },
];

export default function ProjectsTable() {
  const { data: projects, isLoading } = useGetAdminProjects();
  return (
    <>
      <AdminTables
        columns={projectColumns}
        isLoading={isLoading}
        data={projects || []}
      />
    </>
  );
}
