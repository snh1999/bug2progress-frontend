import { TFeature } from "@/api/features/features.types";
import { TProject } from "@/api/projects/projects.types";
import { ETicketStatus, TTicket } from "@/api/tickets/tickets.types";

export interface TCursorPayload {
  x: number;
  y: number;
  userId: string;
  userName: string;
  color: string;
  projectId: string;
}

export interface TicketMovePayload {
  cardId: string;
  sourceStatus: ETicketStatus;
  destinationStatus: ETicketStatus;
  position: number;
  projectId: string;
}

type TCreationPayload = {
  projectId: string;
  createdBy: string;
};

type TUpdatePayload = {
  projectId: string;
  updatedBy: string;
};

type TDeletePayload = {
  projectId: string;
  deletedBy: string;
};

export type TTicketCreationPayload = TCreationPayload & {
  ticket: TTicket;
};

export type TTicketUpdatePayload = TUpdatePayload & {
  ticket: TTicket;
};

export type TTicketDeletionPayload = TDeletePayload & {
  ticketId: string;
};

export type TTicketRearrangementPayload = {
  projectId: string;
  movedBy: string;
  tickets: TTicket[];
};

export type TFeatureCreationPayload = TCreationPayload & {
  feature: TFeature;
};

export type TFeatureDeletionPayload = TCreationPayload & {
  featureId: string;
};

export type TFeatureUpdatePayload = TUpdatePayload & {
  feature: TFeature;
};

export type TProjectUpdatePayload = TUpdatePayload & {
  project: TProject;
};

export type TProjectDeletionPayload = TDeletePayload;
