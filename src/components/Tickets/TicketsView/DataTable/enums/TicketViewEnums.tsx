import { Badge } from "@/components/ui/badge";
import { cn, convertSnakeCaseToTitleCase } from "@/lib/utils";
import {
  ETicketPriority,
  ETicketStatus,
  ETicketType,
} from "@/api/tickets/tickets.types";

export const getTicketStatusStyle = (status: ETicketStatus) => {
  switch (status) {
    case ETicketStatus.BACKLOG:
      return "bg-blue-500 text-gray-100";
    case ETicketStatus.TODO:
      return "bg-orange-700 text-white";
    case ETicketStatus.IN_PROGRESS:
      return "bg-green-700 text-white";
    case ETicketStatus.CANCELED:
      return "bg-gray-700 text-white";
    case ETicketStatus.IN_REVIEW:
      return "bg-pink-400 text-gray-100";
    case ETicketStatus.IN_QA:
      return "bg-amber-500 text-white";
    case ETicketStatus.BLOCKED:
      return "bg-red-700 text-white";
    case ETicketStatus.DEPLOYED:
      return "bg-yellow-400 text-gray-700";
    case ETicketStatus.ARCHIVED:
      return "bg-gray-400 text-white";
    case ETicketStatus.DONE:
      return "bg-green-700 text-white";
  }
};

export const TicketStatus = ({ status }: { status: ETicketStatus }) => {
  const className = getTicketStatusStyle(status);
  return (
    <Badge className={cn(className, "rounded-full")}>
      {convertSnakeCaseToTitleCase(status)}
    </Badge>
  );
};

export const getTicketPriorityStyle = (priority: ETicketPriority) => {
  switch (priority) {
    case ETicketPriority.LOW:
      return "bg-blue-500 text-white";
    case ETicketPriority.MEDIUM:
      return "bg-yellow-500 text-gray-700";
    case ETicketPriority.HIGH:
      return "bg-red-800 text-white";
    case ETicketPriority.URGENT:
      return "bg-orange-500 text-white";
    case ETicketPriority.CRITICAL:
      return "bg-red-500 text-white";
    default:
      return "bg-gray-500 text-gray-200";
  }
};

export const TicketPriority = ({
  priority,
}: {
  priority?: ETicketPriority;
}) => {
  if (!priority) return null;

  let className = getTicketPriorityStyle(priority);
  return (
    <Badge className={cn(className, "rounded-full")}>
      {convertSnakeCaseToTitleCase(priority)}
    </Badge>
  );
};

export const getTicketTypeStyle = (type: ETicketType) => {
  switch (type) {
    case ETicketType.BUG:
      return "bg-red-500 text-white";
    case ETicketType.FEATURE:
      return "bg-green-600 text-gray-100";
    case ETicketType.TASK:
      return "bg-blue-500 text-white";
    case ETicketType.EPIC:
      return "bg-indigo-500 text-white";
    case ETicketType.SPIKE:
      return "bg-pink-600 text-white";
    case ETicketType.TECH_DEBT:
      return "bg-teal-600 text-white";
    case ETicketType.ENHANCEMENT:
      return "bg-green-800 text-white";
    case ETicketType.TEST:
      return "bg-yellow-600 text-white";
    case ETicketType.STORY:
      return "bg-purple-800 text-white";
    default:
      return "bg-gray-500 text-gray-200";
  }
};

export const TicketType = ({ type }: { type?: ETicketType }) => {
  if (!type) return null;

  let className = getTicketTypeStyle(type);
  return (
    <Badge className={cn(className, "rounded-full")}>
      {convertSnakeCaseToTitleCase(type)}
    </Badge>
  );
};
