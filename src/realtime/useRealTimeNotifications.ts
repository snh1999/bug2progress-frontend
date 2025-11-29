import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FEATURE_EVENTS, HOME_PATH, PROJECT_EVENTS } from "@/app.constants";
import { toast } from "sonner";
import { useSocket } from "./provider/websocket-provider";
import { useQueryClient } from "@tanstack/react-query";
import { TFeature } from "@/api/features/features.types";
import {
  TFeatureCreationPayload,
  TFeatureDeletionPayload,
  TFeatureUpdatePayload,
  TProjectDeletionPayload,
  TProjectUpdatePayload,
} from "./websocket.types";
import { TProject } from "@/api/projects/projects.types";

export function useRealtimeNotifications() {
  const { socket, connected } = useSocket();
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    if (!socket || !connected) return;

    const handleProjectUpdated = ({
      projectId,
      project,
    }: TProjectUpdatePayload) => {
      queryClient.cancelQueries({ queryKey: ["projects"] });

      queryClient.setQueryData<TProject[]>(["projects"], (oldProjects = []) =>
        oldProjects.map((p) => (p.id === project.id ? project : p)),
      );

      queryClient.setQueryData<TProject>(["project", projectId], project);
      toast.info("Project Updated");
    };

    const handleProjectDeleted = ({ projectId }: TProjectDeletionPayload) => {
      queryClient.setQueryData<TProject[]>(["projects"], (oldProjects = []) =>
        oldProjects.filter((project) => project.id !== projectId),
      );
      toast.warning("Project deleted");
      router.push(HOME_PATH);
    };

    const handleFeatureCreated = ({
      projectId,
      feature,
    }: TFeatureCreationPayload) => {
      queryClient.setQueryData<TFeature[]>(
        ["features", projectId],
        (oldFeatures = []) => [...oldFeatures, feature],
      );
    };

    const handleFeatureUpdated = ({
      projectId,
      feature,
    }: TFeatureUpdatePayload) => {
      queryClient.cancelQueries({ queryKey: ["features", projectId] });

      queryClient.setQueryData<TFeature[]>(
        ["features", projectId],
        (oldFeatures = []) =>
          oldFeatures.map((f) => (f.id === feature.id ? feature : f)),
      );

      queryClient.setQueryData<TFeature>(
        ["features", projectId, feature.id],
        feature,
      );
    };

    const handleFeatureDeleted = ({
      projectId,
      featureId,
    }: TFeatureDeletionPayload) => {
      queryClient.setQueryData<TFeature[]>(
        ["features", projectId],
        (oldFeatures = []) =>
          oldFeatures.filter((feature) => feature.id !== featureId),
      );
      toast.warning("Feature deleted");
    };

    socket.on(PROJECT_EVENTS.UPDATED, handleProjectUpdated);
    socket.on(PROJECT_EVENTS.DELETED, handleProjectDeleted);
    socket.on(FEATURE_EVENTS.CREATED, handleFeatureCreated);
    socket.on(FEATURE_EVENTS.UPDATED, handleFeatureUpdated);
    socket.on(FEATURE_EVENTS.DELETED, handleFeatureDeleted);

    return () => {
      socket.off(PROJECT_EVENTS.UPDATED, handleProjectUpdated);
      socket.off(PROJECT_EVENTS.DELETED, handleProjectDeleted);
      socket.off(FEATURE_EVENTS.CREATED, handleFeatureCreated);
      socket.off(FEATURE_EVENTS.UPDATED, handleFeatureUpdated);
      socket.off(FEATURE_EVENTS.DELETED, handleFeatureDeleted);
    };
  }, [socket, connected, toast, router]);
}
