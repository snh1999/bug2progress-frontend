export enum ETicketType {
  BUG = "BUG",
  FEATURE = "FEATURE",
  TECH_DEBT = "TECH_DEBT",
  ENHANCEMENT = "ENHANCEMENT",
  SPIKE = "SPIKE",
  STORY = "STORY",
  TASK = "TASK",
  EPIC = "EPIC",
  SUPPORT = "SUPPORT",
  TEST = "TEST",
}

export enum ETicketStatus {
  BACKLOG = "BACKLOG",
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  DONE = "DONE",
  BLOCKED = "BLOCKED",
  IN_QA = "IN_QA",
  DEPLOYED = "DEPLOYED",
  ARCHIVED = "ARCHIVED",
  CANCELED = "CANCELED",
}

export enum ETicketPriority {
  CRITICAL = "CRITICAL",
  URGENT = "URGENT",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  OPTIONAL = "OPTIONAL",
}

export type TCreateTicketDto = {
  title: string;
  description: string;
  projectId: string;
  featureId: string;
  ticketType?: ETicketType;
  ticketPriority?: ETicketPriority;
  ticketStatus: ETicketStatus;
  position: number;
  assignedContributorId?: string;
  dueAt?: string;
}

export type TUpdateTicketDto = Partial<TCreateTicketDto> & TGetTicket & {
  verifierId?: string;
}

export type TGetTickets = {
  featureId: string;
  projectId: string;
}

export type TGetTicket = TGetTickets & {
  id: string;
}

export type TTicket = {
  id: string;
  title: string;
  description: string;
  projectId: string;
  featureId: string;
  creatorId: string;
  position: number;
  ticketType: ETicketType;
  ticketPriority?: ETicketPriority;
  assignedContributorId?: string;
  verifierId?: string;
  ticketStatus: ETicketStatus;
}