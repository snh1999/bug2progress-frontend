import { TFeature } from "../features/features.types";
import { TUserWithProfile } from "@/api/users/users.types";

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
  dueAt?: Date;
}

export type TUpdateTicketDto = Partial<TCreateTicketDto> & TGetTicket & {
  verifierId?: string;
}

export type TGetTickets = {
  featureId: string;
  projectId: string;
  assignedContributorId?: string | null;
  dueAt?: string | null;
  ticketType?: ETicketType | null;
  ticketPriority?: ETicketPriority | null;
  ticketStatus?: ETicketStatus | null;
  verifierId?: string | null;
  creatorId?: string | null;
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
  feature: TFeature;
  creatorId: string;
  creator: TUserWithProfile;
  position: number;
  ticketType: ETicketType;
  ticketPriority?: ETicketPriority;
  assignedContributorId?: string;
  assignedContributor?: TUserWithProfile;
  dueAt?: string;
  createdAt: string;
  verifierId?: string;
  verifiedBy?: TUserWithProfile
  ticketStatus: ETicketStatus;
}