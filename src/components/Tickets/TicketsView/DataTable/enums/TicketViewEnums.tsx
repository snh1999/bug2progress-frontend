import { Badge } from "@/components/ui/badge";
import { cn, convertSnakeCaseToTitleCase } from "@/lib/utils";
import { ETicketPriority, ETicketStatus, ETicketType } from "@/api/tickets/tickets.types";

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
}

export const TicketStatus = ({status}: {
  status: ETicketStatus;
}) => {

  const className = getTicketStatusStyle(status);
  return <Badge className={cn(className, "rounded-full")}>{convertSnakeCaseToTitleCase(status)}</Badge>;
};

export const TicketPriority = ({priority}: { priority?: ETicketPriority }) => {
  if(!priority) return null;

  let className = "";
  switch (priority) {
    case ETicketPriority.LOW:
      className = "bg-blue-500 text-white";
      break;
    case ETicketPriority.MEDIUM:
      className = "bg-yellow-500 text-gray-700";
      break;
    case ETicketPriority.HIGH:
      className = "bg-red-800 text-white";
      break;
    case ETicketPriority.URGENT:
      className = "bg-orange-500 text-white";
      break;
    case ETicketPriority.CRITICAL:
      className = "bg-red-500 text-white";
      break;
    default:
      className = "bg-gray-500 text-gray-200";
      break;
  }
  return <Badge className={cn(className, "rounded-full")}>{convertSnakeCaseToTitleCase(priority)}</Badge>;
};

export const TicketType = ({type}: { type?: ETicketType }) => {
  if(!type) return null;

  let className = "";
  switch (type) {
    case ETicketType.BUG:
      className = "bg-red-500 text-white";
      break;
    case ETicketType.FEATURE:
      className = "bg-green-600 text-gray-100";
      break;
    case ETicketType.TASK:
      className = "bg-blue-500 text-white";
      break;
    case ETicketType.EPIC:
      className = "bg-indigo-500 text-white";
      break;
    case ETicketType.SPIKE:
      className = "bg-pink-600 text-white";
      break;
    case ETicketType.TECH_DEBT:
      className = "bg-teal-600 text-white";
      break;
    case ETicketType.ENHANCEMENT:
      className = "bg-green-800 text-white";
      break;
    case ETicketType.TEST:
      className = "bg-yellow-600 text-white";
      break;
    case ETicketType.STORY:
      className = "bg-purple-800 text-white";
      break;
    default:
      className = "bg-gray-500 text-gray-200";
      break;
  }
  return <Badge className={cn(className, "rounded-full")}>{convertSnakeCaseToTitleCase(type)}</Badge>;
};