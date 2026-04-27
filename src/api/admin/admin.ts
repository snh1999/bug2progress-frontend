import { useQuery } from "@tanstack/react-query";
import { GetRequest } from "@/api/axios";
import type {
  AdminStats,
  AdminUser,
  AdminOrganization,
  AdminProject,
  AdminTicket,
  AdminFeature,
  AdminPost,
} from "./admin.types";

export const useGetAdminStats = () =>
  useQuery<AdminStats>({
    queryKey: ["admin", "stats"],
    queryFn: async () => GetRequest("/admin/stats"),
    staleTime: 5 * 60 * 1000,
  });

export const useGetAdminUsers = () =>
  useQuery<AdminUser[]>({
    queryKey: ["admin", "users"],
    queryFn: async () => GetRequest("/admin/users"),
    staleTime: 5 * 60 * 1000,
  });

export const useGetAdminOrganizations = () =>
  useQuery<AdminOrganization[]>({
    queryKey: ["admin", "organizations"],
    queryFn: async () => GetRequest("/admin/organizations"),
    staleTime: 5 * 60 * 1000,
  });

export const useGetAdminProjects = () =>
  useQuery<AdminProject[]>({
    queryKey: ["admin", "projects"],
    queryFn: async () => GetRequest("/admin/projects"),
    staleTime: 5 * 60 * 1000,
  });

export const useGetAdminTickets = () =>
  useQuery<AdminTicket[]>({
    queryKey: ["admin", "tickets"],
    queryFn: async () => GetRequest("/admin/tickets"),
    staleTime: 5 * 60 * 1000,
  });

export const useGetAdminFeatures = () =>
  useQuery<AdminFeature[]>({
    queryKey: ["admin", "features"],
    queryFn: async () => GetRequest("/admin/features"),
    staleTime: 5 * 60 * 1000,
  });

export const useGetAdminPosts = () =>
  useQuery<AdminPost[]>({
    queryKey: ["admin", "posts"],
    queryFn: async () => GetRequest("/admin/posts"),
    staleTime: 5 * 60 * 1000,
  });
