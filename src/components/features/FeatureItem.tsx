import { TFeature } from "@/api/features/features.types";
import { PROJECTS_PATH } from "@/app.constants";
import { useFeatureId } from "@/hooks/useFeatureId";
import { useProjectId } from "@/hooks/useProjectId";
import { SidebarMenuButton } from "../ui/sidebar";
import { useRouter } from "next/navigation";
import { getStringToColor } from "@/lib/utils";

export function FeatureItem({ feature }: { feature: TFeature }) {
  const featureId = useFeatureId();
  const projectId = useProjectId();
  const router = useRouter();

  const fullHref = `${PROJECTS_PATH}/${projectId}/features/${feature.id}`;
  const color = getStringToColor(feature.title);

  return (
    <SidebarMenuButton
      key={feature.id}
      onClick={() => router.push(fullHref)}
      isActive={featureId === feature.id}
      className="px-1 pb-2 space-y-0.5"
    >
      <div className="flex w-full items-center gap-2 px-3 py-2.5 text-sm rounded-md cursor-pointer group">
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
        />
        <span className="flex-1 truncate">{feature.title}</span>
      </div>
    </SidebarMenuButton>
  );
}
