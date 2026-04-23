import { ColumnDef } from "@tanstack/react-table";
import AdminTables from "./AdminTables";
import { useGetAdminPosts } from "@/api/admin/admin";

const postColumns: ColumnDef<any>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "published",
    header: "Published",
    cell: ({ row }) => (row.original.published ? "Yes" : "No"),
  },
  {
    accessorKey: "isPublic",
    header: "Public",
    cell: ({ row }) => (row.original.isPublic ? "Yes" : "No"),
  },
  {
    accessorKey: "author.profile.username",
    header: "Author",
    cell: ({ row }) => row.original.author?.profile?.username,
  },
  {
    accessorKey: "organization.name",
    header: "Organization",
    cell: ({ row }) => row.original.organization?.name,
  },
  {
    accessorKey: "_count.postComment",
    header: "Comments",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
];

export default function PostsTable() {
  const { data: posts, isLoading } = useGetAdminPosts();

  return (
    <>
      <AdminTables
        columns={postColumns}
        data={posts || []}
        isLoading={isLoading}
      />
    </>
  );
}
