import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";

export function  TicketFilterColumns<TData>({table}:{table: Table<TData>}) {
  return <div className="flex items-center py-4">
    <Input
      placeholder="Filter titles"
      value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
      onChange={(event) =>
        table.getColumn("title")?.setFilterValue(event.target.value)
      }
      className="max-w-sm"
    />
  </div>;
}