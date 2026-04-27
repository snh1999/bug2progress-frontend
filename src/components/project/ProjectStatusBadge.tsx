import { Badge } from "../ui/badge";
import { TShadVariant } from "@/app.constants";

const statusMap: Record<string, { label: string; variant: TShadVariant }> = {
  PROPOSED: { label: "Proposed", variant: "secondary" },
  IN_DEVELOPMENT: { label: "In Development", variant: "default" },
  ACTIVE: { label: "Active", variant: "default" },
  MAINTAINED: { label: "Maintained", variant: "outline" },
  NOT_MAINTAINED: { label: "Not Maintained", variant: "destructive" },
  OBSOLETE: { label: "Obsolete", variant: "destructive" },
};

export default function ProjectStatusBadge({ status }: { status: string }) {
  const s = statusMap[status] || { label: status, variant: "secondary" };
  return (
    <Badge className="opacity-60" variant={s.variant}>
      {s.label}
    </Badge>
  );
}
