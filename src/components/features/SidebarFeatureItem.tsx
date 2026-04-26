import { TFeature } from "@/api/features/features.types";
import { PROJECTS_PATH } from "@/app.constants";
import { useFeatureId } from "@/hooks/useFeatureId";
import { useProjectId } from "@/hooks/useProjectId";
import { SidebarMenuButton } from "../ui/sidebar";
import { useRouter } from "next/navigation";
import { FeatureItem } from "@/components/features/FeatureItem";

export function SidebarFeatureItem({ feature }: { feature: TFeature }) {
  const featureId = useFeatureId();
  const projectId = useProjectId();
  const router = useRouter();

  const fullHref = `${PROJECTS_PATH}/${projectId}/features/${feature.id}`;

  return (
    <SidebarMenuButton
      key={feature.id}
      onClick={() => router.push(fullHref)}
      isActive={featureId === feature.id}
      className="px-1 pb-2 space-y-0.5"
    >
      <FeatureItem feature={feature} />
    </SidebarMenuButton>
  );
}
