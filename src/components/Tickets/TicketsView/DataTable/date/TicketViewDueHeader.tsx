import { Calendar } from "lucide-react";
import { differenceInDays, format } from "date-fns";
import { cn } from "@/lib/utils";

type Props = {
  date?: string;
  className?: string;
  compact?: boolean;
};

export const TicketViewDueHeader = ({
  date,
  className,
  compact = false,
}: Props) => {
  if (!date)
    return (
      <span className="text-muted-foreground italic text-xs truncate">
        No Due Date
      </span>
    );

  const now = new Date();
  const dueDate = new Date(date);
  const dateDiff = differenceInDays(dueDate, now);

  let textColor = "text-muted-foreground";
  if (dateDiff < 0) {
    textColor = "text-destructive font-semibold"; // overdue
  } else if (dateDiff < 3) {
    textColor = "text-orange-600 dark:text-orange-400 font-medium";
  } else if (dateDiff <= 7) {
    textColor = "text-yellow-600 dark:text-yellow-400";
  }

  return (
    <div
      className={cn("flex items-center gap-1 text-xs", textColor, className)}
    >
      <Calendar className="h-3 w-3 shrink-0" />
      <span className="truncate">{format(date, compact ? "MMM d" : "PP")}</span>
    </div>
  );
};
