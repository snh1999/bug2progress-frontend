import { ColumnDef } from "@tanstack/react-table";
import AdminTables from "./AdminTables";
import { useGetAdminOrganizations } from "@/api/admin/admin";
import { AdminOrganization } from "@/api/admin/admin.types";

const organizationColumns: ColumnDef<AdminOrganization>[] = [
  {
    accessorKey: "name",
    header: "Name",
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
    accessorKey: "_count.members",
    header: "Members",
  },
  {
    accessorKey: "_count.project",
    header: "Projects",
  },
  {
    accessorKey: "_count.post",
    header: "Posts",
  },
];

export default function OrgsTable() {
  const { data: organizations, isLoading } = useGetAdminOrganizations();
  return (
    <>
      <AdminTables
        columns={organizationColumns}
        data={organizations || []}
        isLoading={isLoading}
      />
    </>
  );
}
