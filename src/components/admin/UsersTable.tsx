import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import AdminTables from "./AdminTables";
import { useGetAdminUsers } from "@/api/admin/admin";

const userColumns: ColumnDef<any>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "profile.username",
    header: "Username",
    cell: ({ row }) => row.original.profile?.username,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <Badge variant="outline">{row.original.role}</Badge>,
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => (row.original.isActive ? "Yes" : "No"),
  },
  {
    accessorKey: "joinedAt",
    header: "Joined",
    cell: ({ row }) => new Date(row.original.joinedAt).toLocaleDateString(),
  },
];

export default function UsersTable() {
  const { data: users, isLoading } = useGetAdminUsers();

  return (
    <>
      <AdminTables
        columns={userColumns}
        data={users || []}
        isLoading={isLoading}
      />
    </>
  );
}
