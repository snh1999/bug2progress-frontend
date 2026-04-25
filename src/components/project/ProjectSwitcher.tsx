"use client";

import { useRouter } from "next/navigation";
import { RiAddCircleFill } from "react-icons/ri";
import { useGetProjects } from "@/api/projects/projects";
import { OPEN_CREATE_PROJECT_MODAL_KEY, PROJECTS_PATH } from "@/app.constants";
import { ImageOrAvatar } from "@/components/common/ImageOrAvatar";
import LoadingComponent from "@/components/common/LoadingComponent";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOpenModal } from "@/hooks/useModalHook";
import { useProjectId } from "@/hooks/useProjectId";
import { getStringToColor } from "@/lib/utils";
import { SidebarGroupLabel } from "../ui/sidebar";

export const ProjectSwitcher = () => {
  const router = useRouter();
  const { data: projects } = useGetProjects();
  const projectId = useProjectId();
  const { openModal } = useOpenModal(OPEN_CREATE_PROJECT_MODAL_KEY);

  const onSelect = (id: string) => {
    router.push(`${PROJECTS_PATH}/${id}`);
  };

  if (!projects) {
    return <LoadingComponent />;
  }

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center pt-3 pb-1 justify-between">
        <SidebarGroupLabel className="font-semibold uppercase tracking-wider">
          Project
        </SidebarGroupLabel>

        <Button
          onClick={openModal}
          className="text-muted-foreground"
          size="icon-lg"
          variant="ghost"
        >
          <RiAddCircleFill />
        </Button>
      </div>
      <Select onValueChange={onSelect} value={projectId}>
        <SelectTrigger className="w-full font-medium p-1">
          <SelectValue placeholder="No project selected" />
        </SelectTrigger>
        <SelectContent>
          {projects.map((project) => (
            <SelectItem key={project.id} value={project.id}>
              <div className="flex justify-start items-center gap-3 font-medium">
                <ImageOrAvatar
                  name={project.title}
                  bgColor={getStringToColor(project.title)}
                  size={7}
                />
                <span className="truncate">{project.title}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
