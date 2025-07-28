import { Button } from "@/components/ui/button";
import { RiAddCircleFill } from "react-icons/ri";
import React from "react";
import { useGetFeatures } from "@/api/features/features";
import { useProjectId } from "@/hooks/useProjectId";
import { useOpenModal } from "@/hooks/useModalHook";
import { OPEN_CREATE_FEATURE_MODAL_KEY, PROJECTS_PATH } from "@/app.constants";
import Link from "next/link";
import { cn, getRandomColor } from "@/lib/utils";
import LoadingComponent from "@/components/common/LoadingComponent";
import { usePathname } from "next/navigation";
import { ImageOrAvatar } from "@/components/common/ImageOrAvatar";

const FeaturesList = () => {
  const projectId = useProjectId();
  const {data: features} = useGetFeatures(projectId);
  const { openModal: openFeatureModal } = useOpenModal(OPEN_CREATE_FEATURE_MODAL_KEY);

  const pathname = usePathname();

  if (!features) {
    return <LoadingComponent />;
  }

  return <div className="flex flex-col gap-y-2">
    <div className="flex items-center py-3 justify-between">
      <p className="text-md font-semibold uppercase text-neutral-600 dark:text-neutral-300">
        Features
      </p>
      <Button onClick={openFeatureModal} size="sm" variant="primary">
        New
        <RiAddCircleFill className="size-5  cursor-pointer hover:opacity-75 transition" />
      </Button>
    </div>

    <ul className="flex flex-col">
      {features.map((feature) => {
        const fullHref = `${PROJECTS_PATH}/${projectId}/features/${feature.id}`;
        const isActive = pathname === fullHref;

        return (
          <Link key={feature.id} href={fullHref}>
            <div
              className={cn(
                "flex items-center gap-3 p-3 rounded-md font-medium hover:font-semibold transition text-neutral-600 dark:text-neutral-400",
                isActive &&
                "bg-neutral-200 dark:bg-neutral-700 font-bold shadow-sm hover:opacity-100 text-primary"
              )}
            >
                <ImageOrAvatar
                  name={feature.title}
                  bgColor={getRandomColor()}
                />
                <span className="truncate">{feature.title}</span>
            </div>
          </Link>
        );
      })}
    </ul>
  </div>;
};

export default FeaturesList;