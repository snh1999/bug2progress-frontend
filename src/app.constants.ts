export const AUTH_TOKEN_KEY = "token";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
export const BASE_URL = API_URL + (process.env.NEXT_PUBLIC_VERSION_PATH ?? "");
export const HOME_PATH = "/";
export const LOGIN_PATH = "/login";
export const REGISTER_PATH = "/register";
export const PROJECTS_PATH = "/projects";

export const OPEN_CREATE_PROJECT_MODAL_KEY = "create-project";
export const OPEN_JOIN_PROJECT_MODAL_KEY = "join-project";
export const OPEN_CREATE_FEATURE_MODAL_KEY = "create-feature";
export const OPEN_UPDATE_FEATURE_MODAL_KEY = "update-feature";
export const OPEN_CREATE_TICKET_MODAL_KEY = "create-ticket";
export const OPEN_UPDATE_TICKET_MODAL_KEY = "update-ticket";

export const SOCKET_CONNECT_EVENT = "connect";
export const SOCKET_DISCONNECT_EVENT = "disconnect";
export const SOCKET_CONNECT_ERROR_EVENT = "connect_error";
export const SOCKET_RECONNECT_EVENT = "reconnect_attempt";

export const TICKET_EVENTS = {
  CREATED: "ticket.created",
  UPDATED: "ticket.updated",
  DELETED: "ticket.deleted",
  REARRANGED: "ticket.rearranged",
} as const;

export const PROJECT_EVENTS = {
  UPDATED: "project.updated",
  DELETED: "project.deleted",
} as const;

export const FEATURE_EVENTS = {
  CREATED: "feature.created",
  UPDATED: "feature.updated",
  DELETED: "feature.deleted",
} as const;
