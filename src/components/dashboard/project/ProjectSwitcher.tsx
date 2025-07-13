"use client";

import { useRouter } from "next/navigation";
import { RiAddCircleFill } from "react-icons/ri";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { useGetProjects } from "@/api/projects/projects";
import { ImageOrAvatar } from "@/components/common/ImageOrAvatar";
import { getRandomColor } from "@/lib/utils";
import { OPEN_CREATE_PROJECT_MODAL_KEY, PROJECTS_PATH } from "@/app.constants";
import { useProjectId } from "@/hooks/useProjectId";
import LoadingComponent from "@/components/common/LoadingComponent";
import React from "react";
import { useOpenModal } from "@/hooks/useModalHook";
import { Button } from "@/components/ui/button";

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
      <div className="flex items-center py-3 justify-between">
        <p className="text-md font-semibold uppercase text-neutral-600 dark:text-neutral-300">
          Projects
        </p>
        <Button onClick={openModal} size="sm" variant="primary">
          New
          <RiAddCircleFill className="size-5  cursor-pointer hover:opacity-75 transition" />
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
                  bgColor={getRandomColor()}
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
