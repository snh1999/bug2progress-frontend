"use client";

import { useRouter } from "next/navigation";
import { RiAddCircleFill } from "react-icons/ri";

// import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
// import { WorkspaceAvatar } from "@/features/workspaces/components/workspace-avatar";
// import { useCreateWorkspaceModal } from "@/features/workspaces/hooks/use-create-workspace-modal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { useGetProjects } from "@/api/projects/projects";
import { ImageOrAvatar } from "@/components/common/ImageOrAvatar";
import { getRandomColor } from "@/lib/utils";
import { PROJECTS_PATH } from "@/app.constants";
import { useProjectId } from "@/hooks/useProjectId";
import LoadingComponent from "@/components/common/LoadingComponent";
import React from "react";


export const ProjectSwitcher = () => {
  const router = useRouter();
  const {data: projects} = useGetProjects();
  const projectId = useProjectId();
  // const { open } = useCreateWorkspaceModal();

  const onSelect = (id: string) => {
    router.push(`${PROJECTS_PATH}/${id}`);
  };

  if (!projects) {
    return <LoadingComponent/>;
  }

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Projects</p>
        <RiAddCircleFill
          // onClick={open}
          className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"/>
      </div>
      <Select onValueChange={onSelect} value={projectId}>
        <SelectTrigger className="w-full  font-medium p-1">
          <SelectValue placeholder="No workspace selected"/>
        </SelectTrigger>
        <SelectContent>
          {projects.map((project) => (
            <SelectItem key={project.id} value={project.id}>
              <div className="flex justify-start items-center gap-3 font-medium">
                <ImageOrAvatar name={project.title} bgColor={getRandomColor()}/>
                <span className="truncate">{project.title}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};


