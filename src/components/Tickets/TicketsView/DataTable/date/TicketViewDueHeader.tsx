import { differenceInDays, format } from "date-fns";
import { cn } from "@/lib/utils";

type Props = {
  date?: string;
  className?: string;
};

export const TicketViewDueHeader = ({date, className}: Props) => {
  if (!date) return <span className="text-muted-foreground italic truncate">No Due Date</span>;

  const now = new Date();
  const dueDate = new Date(date);
  const dateDiff = differenceInDays(dueDate, now);
  let textColor = "text-muted-foreground";
  if (dateDiff < 3) {
    textColor = "text-destructive font-bold";
  } else if (dateDiff <= 7) {
    textColor = "text-red-600 dark:text-red-400";
  } else if (dateDiff > 7) {
    textColor = "text-primary";
  }

  return <div className={textColor}>
    <span className={cn("truncate ", className)}>{format(date, "PP")}</span>
  </div>;
};