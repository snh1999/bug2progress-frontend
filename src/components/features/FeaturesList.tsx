import { useGetFeatures } from "@/api/features/features";
import LoadingComponent from "@/components/common/LoadingComponent";
import { useProjectId } from "@/hooks/useProjectId";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "../ui/sidebar";
import { OPEN_CREATE_FEATURE_MODAL_KEY } from "@/app.constants";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ChevronDown } from "lucide-react";
import { FeatureItem } from "./FeatureItem";
import { Button } from "../ui/button";
import { RiAddCircleFill } from "react-icons/ri";
import { useOpenModal } from "@/hooks/useModalHook";

export default function FeaturesList() {
  const projectId = useProjectId();
  const { data: features } = useGetFeatures(projectId);
  const { openModal: openFeatureModal } = useOpenModal(
    OPEN_CREATE_FEATURE_MODAL_KEY,
  );

  if (!features) {
    return <LoadingComponent />;
  }

  return (
    <div className="flex flex-col justify-between">
      <Collapsible defaultOpen className="group/collapsible">
        <SidebarGroup className="px-0">
          <SidebarGroupLabel
            asChild
            className="font-semibold px-3 uppercase tracking-wider"
          >
            <CollapsibleTrigger>
              Features
              <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu className="px-1 pt-2 pb-2 space-y-0.5">
                {features.map((feature) => (
                  <FeatureItem feature={feature} key={feature.id} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
      <Button
        className="w-full rounded-none text-muted-foreground"
        onClick={openFeatureModal}
        size="sm"
        variant="ghost"
      >
        New Feature
        <RiAddCircleFill />
      </Button>
    </div>
  );
}
