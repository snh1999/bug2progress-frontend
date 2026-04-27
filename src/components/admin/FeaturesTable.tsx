import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import AdminTables from "./AdminTables";
import { useGetAdminFeatures } from "@/api/admin/admin";
import { AdminFeature } from "@/api/admin/admin.types";

const featureColumns: ColumnDef<AdminFeature>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "featureType",
    header: "Type",
    cell: ({ row }) => (
      <Badge variant="outline">{row.original.featureType}</Badge>
    ),
  },
  {
    accessorKey: "project.title",
    header: "Project",
    cell: ({ row }) => row.original.project?.title,
  },
  {
    accessorKey: "owner.profile.username",
    header: "Owner",
    cell: ({ row }) => row.original.owner?.profile?.username,
  },
  {
    accessorKey: "_count.ticket",
    header: "Tickets",
  },
];

export default function FeaturesTable() {
  const { data: features, isLoading } = useGetAdminFeatures();

  return (
    <>
      <AdminTables
        columns={featureColumns}
        data={features ?? []}
        isLoading={isLoading}
      />
    </>
  );
}
