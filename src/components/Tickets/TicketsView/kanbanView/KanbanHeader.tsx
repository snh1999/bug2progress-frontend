import { cn, convertSnakeCaseToTitleCase } from "@/lib/utils";
import { IoIosArchive } from "react-icons/io";
import { FaCheckCircle, FaClipboardList } from "react-icons/fa";
import { GoCodeReview } from "react-icons/go";
import { GiProgression } from "react-icons/gi";
import { FaStopwatch } from "react-icons/fa6";
import { ImBlocked } from "react-icons/im";
import { TbLock } from "react-icons/tb";
import { GrDeploy } from "react-icons/gr";

import { ETicketStatus } from "@/api/tickets/tickets.types";
import { getTicketStatusStyle } from "@/components/Tickets/TicketsView/DataTable/enums/TicketViewEnums";
import { LuTestTubeDiagonal } from "react-icons/lu";
import CreateTicketButton from "@/components/Tickets/CreateTicketButton";
import { ReactNode } from "react";

interface KanbanColumnHeaderProps {
  board: ETicketStatus;
  ticketCount: number;
}

const commonStyle = "size-[25px] p-1 rounded-2xl";
const statusIconMap: Record<ETicketStatus, ReactNode> = {
  [ETicketStatus.BACKLOG]: (
    <FaClipboardList
      className={cn(commonStyle, getTicketStatusStyle(ETicketStatus.BACKLOG))}
    />
  ),
  [ETicketStatus.TODO]: (
    <FaStopwatch
      className={cn(commonStyle, getTicketStatusStyle(ETicketStatus.TODO))}
    />
  ),
  [ETicketStatus.IN_PROGRESS]: (
    <GiProgression
      className={cn(
        commonStyle,
        getTicketStatusStyle(ETicketStatus.IN_PROGRESS)
      )}
    />
  ),
  [ETicketStatus.IN_REVIEW]: (
    <GoCodeReview
      className={cn(commonStyle, getTicketStatusStyle(ETicketStatus.IN_REVIEW))}
    />
  ),
  [ETicketStatus.DONE]: (
    <FaCheckCircle
      className={cn(commonStyle, getTicketStatusStyle(ETicketStatus.DONE))}
    />
  ),
  [ETicketStatus.ARCHIVED]: (
    <IoIosArchive
      className={cn(commonStyle, getTicketStatusStyle(ETicketStatus.ARCHIVED))}
    />
  ),
  [ETicketStatus.CANCELED]: (
    <ImBlocked
      className={cn(commonStyle, getTicketStatusStyle(ETicketStatus.CANCELED))}
    />
  ),
  [ETicketStatus.BLOCKED]: (
    <TbLock
      className={cn(commonStyle, getTicketStatusStyle(ETicketStatus.BLOCKED))}
    />
  ),
  [ETicketStatus.DEPLOYED]: (
    <GrDeploy
      className={cn(commonStyle, getTicketStatusStyle(ETicketStatus.DEPLOYED))}
    />
  ),
  [ETicketStatus.IN_QA]: (
    <LuTestTubeDiagonal
      className={cn(commonStyle, getTicketStatusStyle(ETicketStatus.IN_QA))}
    />
  ),
};

export const KanbanHeader = ({
  board,
  ticketCount,
}: KanbanColumnHeaderProps) => {
  const icon = statusIconMap[board];

  return (
    <div className="px-2 py-1.5 flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        {icon}
        <h2 className="text-sm font-medium">
          {convertSnakeCaseToTitleCase(board)}
        </h2>
        <div className="size-5 flex items-center justify-center rounded-md bg-neutral-200 text-xs text-neutral-700 font-medium">
          {ticketCount}
        </div>
      </div>
      <CreateTicketButton isCompact={true} defaultStatus={board} />
    </div>
  );
};
